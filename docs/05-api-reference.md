# API reference

All paths are relative to `/api`. Validation failures return 400; errors use
`{ error: { code, message } }`. Protected routes require the HTTP-only admin session cookie.

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| GET | /health | Public | Process health; does not probe MongoDB |
| GET | /content/home | Public | Heading, subtitle, aboutHeading, aboutBody, optional introVideoUrl |
| GET | /members, /events, /sponsors, /gallery, /faqs | Public | List saved collection records with stable id fields |
| POST | /admin/auth/login | Public | Validate account password and set session cookie |
| GET | /admin/auth/me | Admin | Read the current account email |
| POST | /admin/auth/logout | Public | Clear session cookie |
| PUT | /admin/content/home | Admin | Save validated homepage fields |
| POST | /admin/members, /admin/events, /admin/sponsors, /admin/gallery, /admin/faqs | Admin | Create a validated record |
| PUT | /admin/{collection}/{id} | Admin | Replace a record's editable fields |
| DELETE | /admin/{collection}/{id} | Admin | Delete a record |
| POST | /admin/uploads/signature | Admin | Sign upload to an allowed Cloudinary folder |
| POST | /contact | Public | Save name, email and message |
| POST | /membership | Public | Save name, email and university year for committee review |
| GET | /admin/submissions | Admin | Latest 200 contact/membership requests |

Collection schemas are in `server/src/schemas/collections.ts`. Member committee values:
presidents, executives, marketing, publicRelations, social, cultural, sports, other.
Older records without a committee remain visible under Other. Homepage video URLs must
be HTTPS YouTube embed URLs, and an empty URL hides the video.

Public submissions are limited to 10 per 15 minutes per IP; all API routes also share
the upstream global rate limit. No email is sent by submission endpoints.
