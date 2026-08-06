## Taken from the bottom of 06-admin-accounts.md

## Definition of done

**Part A + B:**
- [ ] An admin can add a second admin who can then log in.
Current way of how I want to implement it:
1. new admin user wants to sign up for an admin account
2. they enter their info
3. it sends an email to the official umsa account with a link or just as a notifcation
4. then the umsa execs can go onto their admin accounts and then decide to approve or deny the request
5. if they approve then the new admin user account can be created, otherwise it won't be created and the info will be deleted

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
