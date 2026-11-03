import assert from "node:assert/strict";
import { test, mock } from "node:test";
import { readFile } from "node:fs/promises";
import ts from "typescript";
const source = await readFile(new URL("../src/lib/pentreeform.ts", import.meta.url), "utf8");
const js = ts.transpile(source, { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 });
const { sendToPentreeform } = await import(`data:text/javascript,${encodeURIComponent(js)}`);
const endpoint = "https://pentreeform.vercel.app/f/5e7a0402a4524d10890777d7c21405c0";
const ticket = "a".repeat(64);
const verification_url = endpoint + "/verify/" + ticket;
const ok = data => new Response(JSON.stringify(data), {status:200, headers:{"content-type":"application/json"}});
test("submits fields and accepts only a confirmed saved id", async () => {
  const stub = mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, endpoint);
    assert.deepEqual(JSON.parse(options.body), { email:"person@example.com", form_type:"newsletter" });
    return ok({ok:true,id:"saved"});
  });
  try { await sendToPentreeform({email:"person@example.com",form_type:"newsletter"}); }
  finally { stub.mock.restore(); }
});
test("rejects failed responses and invalid success", async () => {
  const stub=mock.method(globalThis,"fetch",async()=>new Response("{}",{status:403}));
  try { await assert.rejects(sendToPentreeform({email:"a@b.com"})); }
  finally { stub.mock.restore(); }
  const stub2=mock.method(globalThis,"fetch",async()=>ok({ok:true}));
  try { await assert.rejects(sendToPentreeform({email:"a@b.com"})); }
  finally { stub2.mock.restore(); }
});
test("rejects a verification URL from a different origin", async () => {
  const stub=mock.method(globalThis,"fetch",async()=>new Response(JSON.stringify({verification_required:true,verification_url:"https://example.com/f/x/verify/"+ticket}),{status:202}));
  try { await assert.rejects(sendToPentreeform({email:"a@b.com"})); }
  finally { stub.mock.restore(); }
});
test("pending submissions require a matching iframe, origin and ticket", async () => {
  const elements=[]; const listeners={}; const frameWindow={};
  function element(tag){const el={tag,style:{cssText:""},open:false,contentWindow:tag==="iframe"?frameWindow:undefined,events:{},setAttribute(){},append(...children){this.children=children},addEventListener(k,fn){this.events[k]=fn},showModal(){this.open=true},close(){this.open=false},remove(){this.removed=true}};elements.push(el);return el}
  globalThis.document={createElement:element,body:{append(){}}};
  globalThis.window={setTimeout,clearTimeout,addEventListener(k,fn){listeners[k]=fn},removeEventListener(k){delete listeners[k]}};
  const stub=mock.method(globalThis,"fetch",async()=>new Response(JSON.stringify({verification_required:true,verification_url}),{status:202}));
  try {
    let done=false;
    const p=sendToPentreeform({email:"a@b.com"}).then(()=>{done=true});
    await new Promise(resolve=>setImmediate(resolve));
    listeners.message({origin:"https://evil.test",source:frameWindow,data:{type:"pentreeform:verified",ticket,id:"x"}});
    listeners.message({origin:"https://pentreeform.vercel.app",source:{},data:{type:"pentreeform:verified",ticket,id:"x"}});
    listeners.message({origin:"https://pentreeform.vercel.app",source:frameWindow,data:{type:"pentreeform:verified",ticket:"wrong",id:"x"}});
    await Promise.resolve(); assert.equal(done,false);
    listeners.message({origin:"https://pentreeform.vercel.app",source:frameWindow,data:{type:"pentreeform:verified",ticket,id:"x"}});
    await p; assert.equal(done,true); assert.equal(elements.find(e=>e.tag==="dialog").removed,true);
  } finally {stub.mock.restore(); delete globalThis.document; delete globalThis.window;}
});
test("cancelled verification does not report success", async () => {
  const elements=[];const listeners={};
  function element(tag){const el={tag,style:{},open:false,events:{},setAttribute(){},append(){},addEventListener(k,fn){this.events[k]=fn},showModal(){this.open=true},close(){this.open=false},remove(){}};elements.push(el);return el}
  globalThis.document={createElement:element,body:{append(){}}};
  globalThis.window={setTimeout,clearTimeout,addEventListener(k,fn){listeners[k]=fn},removeEventListener(k){delete listeners[k]}};
  const stub=mock.method(globalThis,"fetch",async()=>new Response(JSON.stringify({verification_required:true,verification_url}),{status:202}));
  try {const p=sendToPentreeform({email:"a@b.com"}); await new Promise(resolve=>setImmediate(resolve));elements.find(e=>e.tag==="button").events.click();await assert.rejects(p,/cancelled/);}
  finally {stub.mock.restore();delete globalThis.document;delete globalThis.window;}
});

