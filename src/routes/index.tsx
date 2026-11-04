import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JoJo's Bizarre Adventure: Eternal Destiny" },
      { name: "description", content: "Jogo de luta com todas as nove partes de JoJo. Escolha seu JoJo e enfrente os chefes." },
      { property: "og:title", content: "JoJo's Bizarre Adventure: Eternal Destiny" },
      { property: "og:description", content: "Uma jornada através das nove partes de JoJo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/game/index.html"
      title="Eternal Destiny"
      className="fixed inset-0 h-screen w-screen border-0"
      allow="autoplay; fullscreen"
    />
  );
}
