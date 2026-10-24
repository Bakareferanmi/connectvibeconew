import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/forms.server.ts', import.meta.url), 'utf8');
const helper = source.slice(source.indexOf('export async function sendToFormspree'), source.indexOf('type Mail ='));
const js = ts.transpile(helper, { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 });
const { sendToFormspree } = await import(`data:text/javascript,${encodeURIComponent(js)}`);

test('Formspree receives labelled submission fields as JSON', async (t) => {
  const fields = { email: 'visitor@example.com', form_type: 'contact', pathway: 'volunteer', message: 'I can help.' };
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://formspree.io/f/mwllkgqk');
    assert.equal(options.method, 'POST');
    assert.equal(options.headers.Accept, 'application/json');
    assert.deepEqual(JSON.parse(options.body), fields);
    assert.ok(options.signal instanceof AbortSignal);
    return new Response('{}', { status: 200 });
  });
  await sendToFormspree(fields);
});

test('Formspree rejection cannot become a success', async (t) => {
  t.mock.method(console, 'error', () => {});
  t.mock.method(globalThis, 'fetch', async () => new Response('{}', { status: 422 }));
  await assert.rejects(sendToFormspree({ email: 'visitor@example.com' }), /Could not deliver/);
});

test('Network failures propagate for the form to offer a retry', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('Network unavailable'); });
  await assert.rejects(sendToFormspree({}), /Network unavailable/);
});

const formsSource = await readFile(new URL('../src/lib/forms.ts', import.meta.url), 'utf8');
const contactSource = formsSource.slice(formsSource.indexOf('const contactSchema'), formsSource.indexOf('export const subscribeNewsletter'));
const { z } = await import('zod');
const compiledContact = ts.transpile(contactSource.replace('export const submitContact', 'const submitContact'), { target: ts.ScriptTarget.ES2022 }) + '\nreturn submitContact;';
function contactHandler(record) {
  const createServerFn = () => ({ inputValidator(validate) { return { handler(handle) { return ({ data }) => handle({ data: validate(data) }); } }; } });
  return new Function('z', 'honeypot', 'createServerFn', 'record', compiledContact)(z, z.string().max(200).optional(), createServerFn, record);
}

test('Every Get Involved and contact pathway delivers the selected details', async () => {
  for (const pathway of ['partner', 'support', 'volunteer', 'project', 'career', 'general']) {
    const calls = [];
    const submit = contactHandler(async (data) => calls.push(data));
    const result = await submit({ data: { pathway, name: 'Visitor', email: 'visitor@example.com', organisation: 'Community group', message: 'I would like to help.', website: '' } });
    assert.equal(result.ok, true);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].details.pathway, pathway);
    assert.equal(calls[0].details.message, 'I would like to help.');
  }
});

test('A filled contact spam field never returns a false delivery confirmation', async () => {
  let delivered = false;
  const submit = contactHandler(async () => { delivered = true; });
  await assert.rejects(submit({ data: { pathway: 'volunteer', name: 'Visitor', email: 'visitor@example.com', organisation: '', message: 'Hello', website: 'autofilled value' } }), /leave the website field empty/);
  assert.equal(delivered, false);
});

test('An autofilled company field from an older page does not silently discard enquiries', async () => {
  let delivered = false;
  const submit = contactHandler(async () => { delivered = true; });
  await submit({ data: { pathway: 'volunteer', name: 'Visitor', email: 'visitor@example.com', organisation: 'Organisation', message: 'Hello', company: 'Autofilled organisation' } });
  assert.equal(delivered, true);
});
