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
| `VITE_SITE_URL` | Optional canonical site origin. Defaults to `https://www.connectvibeco.com` and drives SEO URLs and share previews. |
| `VITE_GA_MEASUREMENT_ID` | Optional. Google Analytics 4 ID (loads only after cookie consent). |
| `RESEND_API_KEY`, `FORMS_TO_EMAIL`, `FORMS_FROM_EMAIL` | Resend settings for paid-ticket notifications. Public form notifications are configured separately in Pentreeform. |
| `PAYMENT_PROVIDER` | Optional. Defaults to `demo`. See `src/lib/payments.server.ts` to add a real provider. |

## Useful commands

- `npm run build`: production build, then applies database migrations.
- `npm run typecheck`: TypeScript check.
- `npm test`: unit tests.

## Website forms

Contact enquiries (including Get Involved and career pathways), newsletter sign-ups and free
event registrations go to the ConnectVibeCo form in Pentreeform. Use the `form_type` and subject
fields to distinguish them in the Pentreeform inbox. Configure the notification recipient in
Pentreeform and confirm that the messages reach that mailbox.

Public forms show success after Pentreeform confirms the submission. The site also tries to
save a copy for the ConnectVibeCo admin dashboard when a persistent database is configured.
Paid tickets use the checkout flow and its Resend settings. Newsletter sign-ups collect
addresses for a separate mailing workflow.

After deployment, submit one labelled test for each public form. Check that each entry appears
in Pentreeform and that its notification reaches the configured inbox.
