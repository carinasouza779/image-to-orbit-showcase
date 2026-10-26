import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Upload, Star, ShoppingBag, MapPin, Home, FileText, Gift } from "lucide-react";
import { Screen3D } from "@/components/Screen3D";
import student from "@/assets/student3d.png";
import cap from "@/assets/cap3d.png";
import travel from "@/assets/travel3d.png";
import docs from "@/assets/docs3d.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AAPM 3D — Telas interativas" },
      { name: "description", content: "Showcase 3D interativo das telas da AAPM: benefícios, loja, documentos e viagens." },
      { property: "og:title", content: "AAPM 3D — Telas interativas" },
      { property: "og:description", content: "Telas da AAPM em um design 3D interativo e animado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Nav({ dark = true }: { dark?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-[4%] py-[2.5%] text-[clamp(7px,0.8vw,11px)] ${dark ? "text-foreground" : "text-ink"}`}>
      <span className="font-display text-[1.6em] font-extrabold tracking-tight">AAPM<span className="text-primary">.</span></span>
      <div className="hidden gap-[3em] opacity-70 sm:flex"><span>Início</span><span>Benefícios</span><span>Serviços</span><span>Contato</span></div>
      <span className="rounded-full bg-primary px-[1.2em] py-[0.5em] font-semibold text-primary-foreground">Fale conosco</span>
    </div>
  );
}

function Side() {
  const items = [Home, Gift, ShoppingBag, FileText, MapPin];
  return (
    <div className="flex w-[9%] flex-col items-center gap-[10%] border-r border-border bg-sidebar py-[4%]">
      <span className="font-display text-[clamp(7px,0.8vw,12px)] font-extrabold">AAPM</span>
      {items.map((I, i) => (
        <I key={i} className={`size-[clamp(10px,1.2vw,18px)] ${i === 2 ? "text-primary" : "text-muted-foreground"}`} />
      ))}
    </div>
  );
}

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <header className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">AAPM — Conexões para sua jornada</p>
        <h1 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
          Telas que ganham <span className="font-serif font-normal italic text-primary">profundidade.</span>
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">Passe o mouse sobre cada tela para girá-la em 3D e ver os modelos flutuarem.</p>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 md:grid-cols-2">
        {/* 1. Landing */}
        <Screen3D model={student} modelClass="right-[2%] bottom-0 w-[48%]" delay={0}>
          <div className="relative h-full bg-red-scene">
            <Nav />
            <div className="px-[6%] pt-[4%]">
              <p className="text-[clamp(6px,0.7vw,10px)] uppercase tracking-widest text-accent">Associação de alunos</p>
              <h2 className="mt-[2%] font-display text-[clamp(18px,3vw,44px)] font-extrabold leading-[0.9] text-primary-foreground">
                ALUNOS.<br />OPORTUNIDADES.<br /><span className="font-serif font-normal italic text-accent">mesmo lugar.</span>
              </h2>
              <p className="mt-[3%] max-w-[45%] text-[clamp(6px,0.75vw,11px)] text-primary-foreground/80">Benefícios, serviços e conexões para sua jornada no SENAI.</p>
              <span className="mt-[4%] inline-flex items-center gap-1 rounded-full bg-ink px-[1.4em] py-[0.7em] text-[clamp(6px,0.75vw,11px)] font-semibold">Conheça a AAPM <ArrowRight className="size-3" /></span>
            </div>
          </div>
        </Screen3D>

        {/* 2. Loja */}
        <Screen3D model={cap} modelClass="right-[-4%] top-[-14%] w-[40%]" delay={150}>
          <div className="flex h-full bg-ink-scene">
            <Side />
            <div className="flex-1 p-[4%]">
              <h2 className="font-display text-[clamp(14px,2vw,30px)] font-extrabold">Produtos <span className="font-serif font-normal italic text-primary">disponíveis</span></h2>
              <div className="mt-[3%] flex gap-[2%] text-[clamp(6px,0.7vw,10px)]">
                {["Todos", "Camisetas", "Canecas", "Kits"].map((c, i) => (
                  <span key={c} className={`rounded-full px-[1em] py-[0.4em] ${i === 0 ? "bg-primary" : "bg-muted text-muted-foreground"}`}>{c}</span>
                ))}
              </div>
              <div className="mt-[4%] grid grid-cols-3 gap-[3%]">
                {[["Camiseta", "49,90"], ["Caneca", "29,90"], ["Kit aluno", "89,90"]].map(([n, p]) => (
                  <div key={n} className="rounded-xl bg-card p-[8%]">
                    <div className="aspect-square rounded-lg bg-cream-scene" />
                    <p className="mt-[8%] text-[clamp(6px,0.75vw,11px)] font-semibold">{n}</p>
                    <div className="flex items-center justify-between text-[clamp(6px,0.7vw,10px)]">
                      <span className="text-primary">R$ {p}</span>
                      <span className="flex text-accent"><Star className="size-2 fill-current" />4.9</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Screen3D>

        {/* 3. Documentos */}
        <Screen3D model={docs} modelClass="right-[4%] top-[8%] w-[34%]" delay={300}>
          <div className="flex h-full bg-cream-scene text-ink">
            <div className="flex-1 p-[5%]">
              <p className="text-[clamp(6px,0.7vw,10px)] uppercase tracking-widest text-primary">Área do aluno</p>
              <h2 className="font-display text-[clamp(14px,2.2vw,32px)] font-extrabold leading-none">Envie seus<br /><span className="font-serif font-normal italic text-primary">documentos.</span></h2>
              <div className="mt-[5%] flex max-w-[55%] flex-col items-center rounded-2xl border-2 border-dashed border-primary/40 py-[6%]">
                <Upload className="size-[clamp(12px,1.6vw,24px)] text-primary" />
                <p className="mt-1 text-[clamp(6px,0.75vw,11px)] font-semibold">Arraste ou clique</p>
                <span className="mt-2 rounded-full bg-primary px-[1.2em] py-[0.4em] text-[clamp(6px,0.7vw,10px)] text-primary-foreground">Selecionar</span>
              </div>
              <div className="mt-[4%] max-w-[55%] space-y-[3%] text-[clamp(6px,0.7vw,10px)]">
                {[["RG", "Aprovado"], ["Comprovante", "Em análise"]].map(([d, s]) => (
                  <div key={d} className="flex justify-between rounded-lg bg-background/5 px-[4%] py-[2%] ring-1 ring-ink/10">
                    <span>{d}</span><span className="font-semibold text-primary">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Screen3D>

        {/* 4. Viagem */}
        <Screen3D model={travel} modelClass="right-[0%] bottom-[-6%] w-[40%]" delay={450}>
          <div className="relative h-full bg-ink-scene">
            <Nav />
            <div className="px-[6%] pt-[3%]">
              <h2 className="font-display text-[clamp(18px,3vw,44px)] font-extrabold leading-[0.9]">
                Sua conquista<br />merece um dia<br /><span className="font-serif font-normal italic text-primary">inesquecível.</span>
              </h2>
              <p className="mt-[3%] max-w-[45%] text-[clamp(6px,0.75vw,11px)] text-muted-foreground">Viagens e passeios exclusivos para associados.</p>
              <div className="mt-[5%] flex gap-[3%]">
                {["Parques", "Excursões", "Formatura"].map((x) => (
                  <span key={x} className="rounded-lg bg-muted px-[1em] py-[0.6em] text-[clamp(6px,0.7vw,10px)]">{x}</span>
                ))}
              </div>
            </div>
          </div>
        </Screen3D>
      </section>

      <div className="border-y border-border py-6">
        <div className="flex w-max animate-marquee gap-12 font-display text-3xl font-extrabold text-muted-foreground/40">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Benefícios", "Serviços", "Oportunidades", "Loja", "Documentos", "Viagens"].map((w) => (
              <span key={k + w}>{w} <span className="text-primary">✦</span></span>
            )),
          )}
        </div>
      </div>
    </main>
  );
}
