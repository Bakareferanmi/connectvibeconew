-- Allow FAQs, social links and edited page text to be stored alongside events, projects and jobs.
alter table content_items drop constraint if exists content_items_type_check;
alter table content_items
  add constraint content_items_type_check
  check (type in ('event', 'project', 'job', 'faq', 'social', 'copy'));

alter table content_meta drop constraint if exists content_meta_type_check;
alter table content_meta
  add constraint content_meta_type_check
  check (type in ('event', 'project', 'job', 'faq', 'social', 'copy'));
