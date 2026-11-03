const ENDPOINT = "https://pentreeform.vercel.app/f/5e7a0402a4524d10890777d7c21405c0";

type Fields = Record<string, string>;

/** A 202 is pending verification, not a saved submission. */
export async function sendToPentreeform(fields: Fields): Promise<void> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(fields),
    signal: AbortSignal.timeout(15000),
  });
  const result: unknown = await response.json().catch(() => null);
  if (!response.ok || !result || typeof result !== "object") {
    throw new Error("Could not send your details. Please try again.");
  }
  const data = result as { ok?: unknown; id?: unknown; verification_required?: unknown; verification_url?: unknown };
  if (data.ok === true && typeof data.id === "string" && data.id) return;
  if (response.status !== 202 || data.verification_required !== true || typeof data.verification_url !== "string") {
    throw new Error("Could not confirm your submission. Please try again.");
  }

  let url: URL;
  try { url = new URL(data.verification_url); } catch { throw new Error("Could not start verification."); }
  const endpoint = new URL(ENDPOINT);
  const prefix = endpoint.pathname + "/verify/";
  const ticket = url.pathname.slice(prefix.length);
  if (url.origin !== endpoint.origin || !url.pathname.startsWith(prefix) || !/^[a-f0-9]{64}$/.test(ticket) || url.search || url.hash) {
    throw new Error("Could not start verification.");
  }
  url.searchParams.set("mode", "embed");

  await new Promise<void>((resolve, reject) => {
    const dialog = document.createElement("dialog");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const frame = document.createElement("iframe");
    const cancel = document.createElement("button");
    title.textContent = "Sending your details";
    title.id = "pentreeform-verification-title";
    description.textContent = "Please wait while we complete a quick security check.";
    frame.title = "Secure submission verification";
    frame.src = url.href;
    cancel.type = "button";
    cancel.textContent = "Cancel";
    dialog.setAttribute("aria-labelledby", title.id);
    dialog.style.cssText = "border:1px solid #ddd;border-radius:16px;padding:24px;width:min(95vw,540px);max-width:540px;box-shadow:0 12px 48px #0003;color:#172c31;background:white";
    title.style.cssText = "font-size:1.25rem;font-weight:700;margin:0 0 8px";
    description.style.cssText = "margin:0 0 12px";
    frame.style.cssText = "display:block;width:100%;height:270px;border:0";
    cancel.style.cssText = "margin-top:12px;padding:10px 18px;border:1px solid #777;border-radius:8px;background:white;color:#172c31;cursor:pointer";
    dialog.append(title, description, frame, cancel);
    let settled = false;
    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      window.removeEventListener("message", receive);
      if (dialog.open) dialog.close();
      dialog.remove();
      if (error) reject(error); else resolve();
    };
    const receive = (event: MessageEvent) => {
      if (event.origin !== url.origin || event.source !== frame.contentWindow) return;
      const message = event.data;
      if (!message || message.type !== "pentreeform:verified" || message.ticket !== ticket || typeof message.id !== "string" || !message.id) return;
      finish();
    };
    const timer = window.setTimeout(() => finish(new Error("Verification timed out. Please try again.")), 600000);
    window.addEventListener("message", receive);
    cancel.addEventListener("click", () => finish(new Error("Verification cancelled.")));
    dialog.addEventListener("cancel", (event) => { event.preventDefault(); finish(new Error("Verification cancelled.")); });
    document.body.append(dialog);
    try { dialog.showModal(); } catch { finish(new Error("Could not open verification. Please try again.")); }
  });
}
