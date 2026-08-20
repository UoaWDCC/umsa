# 6. Client contract

Enough of the frontend to wire your endpoint to a page. This is not a React guide — it's the
four conventions the client uses, so your feature looks like the rest of the codebase.

## One axios instance

`client/src/lib/api.ts` is the entire transport layer:

```ts
export const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // send/receive the umsa_admin session cookie
});

export function apiErrorMessage(err: unknown): string {
  if (isAxiosError(err)) {
    // our server wraps errors as { error: { code, message } }
    return err.response?.data?.error?.message ?? err.message;
  }
  return "Something went wrong";
}
```

Three rules:

- **Never call `fetch` or create a second axios instance.** You'd lose `withCredentials` and
  every admin request would 401.
- `baseURL: "/api"` is relative, so paths you pass are relative too: `api.get("/content/home")`,
  not `api.get("/api/content/home")`.
- **There are no interceptors.** No token attaching (the cookie is automatic), no redirect on
  401 (see below). Don't add any — the alternative is described in [04-auth.md](04-auth.md) and
  it's deliberate.

Use `apiErrorMessage(err)` to surface failures. It unwraps the server's error envelope, so the
message your zod schema produced on the server is the message the admin reads.

## One hooks file per feature

`client/src/hooks/useHomeContent.ts` is the file you'll copy most. The whole convention:

```ts
export const HOME_CONTENT_KEY = ["content", "home"] as const;

export function useHomeContent() {
  return useQuery({
    queryKey: HOME_CONTENT_KEY,
    queryFn: () => api.get<HomeContentValues>("/content/home").then((res) => res.data),
  });
}

export function useSaveHomeContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: HomeContentValues) =>
      api.put<HomeContentValues>("/admin/content/home", values).then((res) => res.data),
    // forces refetch so every render sees the new values
    onSuccess: () => queryClient.invalidateQueries({ queryKey: HOME_CONTENT_KEY }),
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status === 401) {
        // session died mid-edit -> nulls auth cache and AdminLayout redirects
        queryClient.setQueryData(ME_KEY, null);
      }
    },
  });
}
```

Four things, every time: **an exported query key constant**, a `useQuery` read hook, `useMutation`
write hooks, and `invalidateQueries` on success so every reader refetches.

The key constant matters — the public page and the admin editor must invalidate the *same* key
or saving won't update the site. Export it, don't inline the array twice.

Query keys in use today: `["auth", "me"]`, `["content", "home"]`. For list features use
`["events"]`, `["team"]`, `["gallery"]` — flat and predictable.

**Why react-query rather than `useEffect` + `useState` + `fetch`?** Caching, request
de-duplication (StrictMode's double-mount fires *one* network request), automatic
`isPending`/`isError` states, and cross-component updates — save in the editor and the homepage
refetches by itself. You'd otherwise hand-roll all four, badly.

## Public pages: always have a fallback

From `client/src/App.tsx`:

```tsx
const { data } = useHomeContent();
const content = data ?? DEFAULTS;
```

`?? DEFAULTS` covers *both* the loading moment and the API-being-down case in one line — the
public site never looks broken because the CMS is unreachable. Do this on every public page you
convert.

(We don't use react-query's `initialData`, because that writes the fallback into the cache as if
it were real server data.)

Admin pages are the opposite: they should show explicit `isPending` / `isError` states, because
an admin needs to know whether they're editing real data. `HomeContentEditor.tsx` does exactly
that before rendering the form.

## Forms: react-hook-form + zod

Both existing forms use the same shape:

```tsx
const { register, handleSubmit, formState: { errors } } = useForm<HomeContentValues>({
  resolver: zodResolver(homeContentSchema),
  values: data,                              // editor only: prefills when the query resolves
  resetOptions: { keepDirtyValues: true },
});
```

- **One zod schema drives everything**: the validation rules, the error messages, *and* the
  TypeScript type via `z.infer`. Change a max length in one place and the form, the types and
  (after copying to the server schema) the API all agree.
- **`values: data`** is react-hook-form's built-in answer to "prefill a form from an async
  fetch" — no `useEffect` + `reset()` dance. Pair it with `resetOptions: { keepDirtyValues: true }`
  so a background refetch (window refocus, post-save invalidation) can't wipe what the admin is
  currently typing.
- Disable the submit button on `mutation.isPending`, and render `apiErrorMessage(mutation.error)`
  on failure. `HomeContentEditor.tsx` shows both.

**The client schemas in `client/src/schemas/` are hand-copied duplicates of the server ones in
`server/src/schemas/`.** Keep them in sync manually. The server always re-validates, so a drifted
copy is a UX bug, never a security hole — *client validation is UX, server validation is
security*. (Upgrade path: a shared workspace package so both import one file.)

## Routing and the admin shell

Public routes are children of `RootLayout` (navbar + footer). Admin routes are **siblings** of
it in `client/src/main.tsx`, which is why the admin panel has no public chrome:

```tsx
{ path: "/admin/login", element: <AdminLogin /> },      // outside the guard by design
{
  path: "/admin",
  element: <AdminLayout />,                              // the guard lives here
  children: [
    { index: true, element: <Navigate to="/admin/home-content" replace /> },
    { path: "home-content", element: <HomeContentEditor /> },
  ],
},
```

Adding an admin page is two edits: a route here, and an entry in the `MENU` array at the top of
`client/src/layouts/AdminLayout.tsx`.

## Where the data currently comes from

Only the homepage reads from the API. Everything else is literals in `.tsx`, which is the work
the blueprints describe.

| Page | File | Source today |
|---|---|---|
| `/` | `client/src/App.tsx` | **API** — `GET /api/content/home` |
| `/events` | `client/src/pages/Events.tsx` | Hardcoded 15-item array; has working tag filter + pagination to preserve |
| `/team` | `client/src/pages/Team.tsx` | Hardcoded, with placeholder stock photo URLs |
| `/gallery` | `client/src/pages/Gallery.tsx` | Two placeholder PNGs repeated ten times |
| `/sponsors` | `client/src/pages/Sponsors.tsx` | Hardcoded array, imported JPEGs |
| `/about`, `/faq` | `client/src/pages/About.tsx`, `Frequent-Asked-Question.tsx` | Hardcoded copy |
| `/contact` | `client/src/pages/Contact.tsx` | Third-party — POSTs to Formspree, not our API |
| `/sign-up` | `client/src/pages/SignUp.tsx` | An iframed Google Form |

Note the last two: contact and sign-up don't go through our backend at all. Leave them alone
unless someone explicitly asks for them to be moved.
