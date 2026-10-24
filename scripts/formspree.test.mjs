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
