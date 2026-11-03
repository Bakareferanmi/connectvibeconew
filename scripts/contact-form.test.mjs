import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

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
