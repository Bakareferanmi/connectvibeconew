# connectvibeco

Website for Connect eVibe Trust. Built with TanStack Start (React), Tailwind, and Postgres (Neon),
deployed on Vercel.

## Run it locally

```
npm install
npm run dev
```

Open http://localhost:8080. With no `DATABASE_URL`, a local in-memory database is used, so
everything works but changes are lost when the server restarts. In development the admin
password is `admin`.

## Admin

`/admin` lets the client edit events (free or paid), projects, jobs, FAQs, social links and page
text, upload pictures, and see newsletter and event sign-ups. Log in with `ADMIN_PASSWORD`.

## Environment variables (Vercel, Settings, Environment Variables)

| Name | What it is for |
|---|---|
| `DATABASE_URL` | Neon Postgres (set by the Neon integration). Tables are created on each build. |
| `ADMIN_PASSWORD` | Password for `/admin`. |
| `ADMIN_SESSION_SECRET` | Optional. Secret used to sign the admin login cookie. |
| `VITE_SITE_URL` | The live address, e.g. `https://connectvibeco.com`. Used for share previews. |
| `VITE_GA_MEASUREMENT_ID` | Optional. Google Analytics 4 ID (loads only after cookie consent). |
| `RESEND_API_KEY`, `FORMS_TO_EMAIL`, `FORMS_FROM_EMAIL` | Email delivery of sign-ups to the client. |
| `PAYMENT_PROVIDER` | Optional. Defaults to `demo`. See `src/lib/payments.server.ts` to add a real provider. |

## Useful commands

- `npm run build`: production build, then applies database migrations.
- `npm run typecheck`: TypeScript check.
- `npm test`: unit tests.
