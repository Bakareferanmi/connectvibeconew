-- Editable website content + form submissions.
-- content_items : events / projects / jobs edited in the /admin area (one JSON document each)
-- content_meta  : a row means "this content type is managed in the database";
--                 without a row the site keeps using the built-in content from the code.
-- submissions   : newsletter sign-ups, event registrations and (later) contact enquiries.

create table if not exists content_items (
  type text not null check (type in ('event', 'project', 'job')),
  slug text not null,
  data jsonb not null,
  position integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (type, slug)
);

create table if not exists content_meta (
  type text primary key check (type in ('event', 'project', 'job')),
  managed_at timestamptz not null default now()
);

create table if not exists submissions (
  id bigserial primary key,
  kind text not null check (kind in ('newsletter', 'event', 'contact')),
  name text,
  email text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists submissions_kind_created_idx on submissions (kind, created_at desc);
create index if not exists submissions_email_idx on submissions (lower(email));
