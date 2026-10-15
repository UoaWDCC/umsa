# UMSA website

React, TypeScript, Express and MongoDB.

## Setup

Use Node 22 and pnpm. Copy `server/.env.example` to `server/.env` and fill in the values.

```sh
pnpm install
pnpm dev
```

Vite prints the frontend URL. The local API runs on port 5051.

```sh
pnpm build
pnpm lint
```


## Content management

Open `/admin` directly to sign in and edit homepage text, team members, events,
sponsors, gallery photos and FAQs. Image uploads use Cloudinary.

Contact sends email through Resend to `umsa@projects.wdcc.co.nz`.
Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` using a verified sender.
Membership is managed through the linked Google Form.

See [setup](docs/01-setup.md), [API reference](docs/05-api-reference.md)
and [contributors](docs/contributors.md).
