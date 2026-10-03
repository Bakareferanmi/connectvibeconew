import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main className="flex min-h-[72vh] flex-col items-center justify-center bg-paper px-6 py-32 text-center text-ink">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ocean">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-deep">
        This page isn’t built yet.
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The path you followed doesn’t exist. Head home, or talk to us if you were expecting
        something here.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">Contact</Link>
        </Button>
      </div>
    </main>
  );
}
