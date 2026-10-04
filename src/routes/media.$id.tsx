import { createFileRoute } from "@tanstack/react-router";

/** /media/<id>: pictures uploaded from the admin. The id is a content hash, so they cache forever. */
export const Route = createFileRoute("/media/$id")({
  server: {
    handlers: {
      GET: async ({ params }: { params: { id: string } }) => {
        try {
          const { readImage } = await import("@/lib/images.server");
          const img = await readImage(params.id);
          if (!img) return new Response("Not found", { status: 404 });
          return new Response(new Uint8Array(img.data), {
            headers: {
              "Content-Type": img.mime,
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        } catch (err) {
          console.error("[media] could not read image:", err);
          return new Response("Not found", { status: 404 });
        }
      },
    },
  },
});
