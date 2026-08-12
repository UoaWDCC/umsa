## Taken from the bottom of 06-admin-accounts.md

## 

**adding new admin**
-> fills out a form 
-> sends email to you to create account
-> email has link with unique token (token valid for x amount of time)
-> sign-up page (email address alr filled out)
-> user fills out the password

## Definition of done
**Part A + B:**
- [ ] An admin can add a second admin who can then log in.
- [ ] The admin list never includes `passwordHash` — check the raw network response.
- [ ] Deleting the last admin returns `400` and does not delete.
- [ ] Changing your own password requires the current one; the new password works on next login.
- [ ] 11 rapid failed logins are rate limited while normal browsing is unaffected.
- [ ] An unknown email and a wrong password take a comparable amount of time.
- [ ] Endpoints added to [../05-api-reference.md](../05-api-reference.md), and the "Known gaps"
      section of [../04-auth.md](../04-auth.md) updated.

**Part C:**
- [ ] A reset link arrives, works once, and is rejected after expiry.
- [ ] `POST /forgot-password` returns `200` for an unknown email.
- [ ] `RESEND_API_KEY` documented in `server/.env.example`, with the dev console fallback working
      when it's unset.
- [ ] `pnpm lint` passes.

## Stretch goals

- Invite-by-email instead of setting an initial password by hand.
- An audit log of admin actions.
- Two-factor authentication (TOTP).
- Roles — but read the note at the top first.
- Session listing and "log out everywhere". Needs a token version field on `AdminUser`.
