-- Images uploaded from the admin. Stored as base64 text (already resized and compressed),
-- served at /media/<id>. The id is a hash of the content, so the same picture is stored once.
create table if not exists images (
  id          text primary key,
  name        text not null,
  mime        text not null default 'image/webp',
  width       integer,
  height      integer,
  bytes       integer not null,
  data_b64    text not null,
  created_at  timestamptz not null default now()
);
