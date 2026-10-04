-- Ticket orders for paid events. Money is always stored in minor units (kobo, pence, cents).
create table if not exists orders (
  id            text primary key,
  event_slug    text not null,
  event_title   text not null,
  name          text not null,
  email         text not null,
  tickets       integer not null check (tickets > 0),
  notes         text not null default '',
  currency      text not null,
  unit_amount   integer not null check (unit_amount > 0),
  total_amount  integer not null check (total_amount > 0),
  status        text not null default 'pending' check (status in ('pending', 'paid')),
  provider      text not null,
  provider_ref  text,
  created_at    timestamptz not null default now(),
  paid_at       timestamptz
);

create index if not exists orders_event_idx on orders (event_slug);
