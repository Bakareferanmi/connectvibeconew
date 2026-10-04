import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { loadContent } from "@/lib/content";
import { copy } from "@/lib/content-store";
import { shareMeta } from "@/lib/seo";
import { faqs } from "@/lib/site-data";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  loader: async () => {
    await loadContent(); // questions may have been edited in /admin
    return { faqs: faqs.map((f) => ({ q: f.title, a: f.body })) };
  },
  head: ({ loaderData }) => ({
    meta: shareMeta({
      title: "FAQs | connectvibeco",
      description:
        "Answers to common questions about our work, events, giving and getting involved.",
      path: "/faq",
    }),
    // Lets search engines show the questions directly in results.
    scripts: loaderData?.faqs.length
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: loaderData.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          },
        ]
      : [],
  }),
});

function FaqPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        kicker={copy("faq-kicker", "FAQs")}
        title={copy("faq-title", "Questions, answered.")}
        lede={copy(
          "faq-lede",
          "The things people ask us most. If yours isn’t here, we’d love to hear from you.",
        )}
        image="/images/hero.jpg"
        imageAlt="A sustainable neighbourhood at golden hour"
        compact
      />

      <Section>
        <div className="max-w-3xl">
          <FaqList />
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link to="/contact">Still have a question? Contact us</Link>
            </Button>
          </div>
        </div>
      </Section>
      <CtaBand />
    </main>
  );
}
