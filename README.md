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
| `RESEND_API_KEY`, `FORMS_TO_EMAIL`, `FORMS_FROM_EMAIL` | Optional Resend delivery for payment notifications. Website enquiry, newsletter and free event forms use Formspree. |
| `PAYMENT_PROVIDER` | Optional. Defaults to `demo`. See `src/lib/payments.server.ts` to add a real provider. |

## Useful commands

- `npm run build`: production build, then applies database migrations.
- `npm run typecheck`: TypeScript check.
- `npm test`: unit tests.

## Website forms

Contact enquiries (including Get Involved and career pathways), newsletter sign-ups and free
event registrations submit to `https://formspree.io/f/mwllkgqk`. Each includes `form_type`
and a subject so submissions can be identified in the Formspree dashboard. The contact form
also sends the selected pathway, organisation and message. Free events include the event
name, date, number of places and notes.

Success is shown only after Formspree accepts the submission. When a persistent database is
configured, a copy is also stored for admin. Paid ticket checkout keeps its existing payment
flow and Resend notification settings. Formspree collects newsletter requests; sending a
newsletter or managing an unsubscribe list requires a separate mailing workflow.

After deployment, submit one enquiry, newsletter request and free event registration and
confirm they appear in the Formspree dashboard and the configured notification inbox.
