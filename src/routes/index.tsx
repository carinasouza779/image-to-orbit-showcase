import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Upload, Star, ShoppingBag, MapPin, Home, FileText, Gift, Menu, X } from "lucide-react";
import { Screen3D, useReveal } from "@/components/Screen3D";
import student from "@/assets/student3d.png";
import cap from "@/assets/cap3d.png";
import travel from "@/assets/travel3d.png";
import docs from "@/assets/docs3d.png";
import shirt from "@/assets/shirt.png";
import mug from "@/assets/mug.png";
import kit from "@/assets/kit.png";
import landing from "@/assets/landing.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AAPM — Alunos, oportunidades e benefícios" },
      { name: "description", content: "A AAPM reúne benefícios, serviços, loja, documentos e viagens para alunos do SENAI em um só lugar." },
      { property: "og:title", content: "AAPM — Alunos, oportunidades e benefícios" },
      { property: "og:description", content: "Benefícios, serviços e conexões para sua jornada no SENAI." },
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

const NAV = [
  { href: "#associacao", label: "A AAPM" },
  { href: "#beneficios", label: "Serviços" },
  { href: "#etapas", label: "Como participar" },
  { href: "#duvidas", label: "Dúvidas" },
];

/* ---------- Site chrome ---------- */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || open ? "bg-background/85 backdrop-blur-xl" : ""}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5" aria-label="Principal">
        <a href="#topo" className="font-display text-2xl font-extrabold tracking-tight">AAPM<span className="text-primary">.</span></a>
        <ul className="hidden gap-10 text-sm md:flex">
          {NAV.map((n) => (
            <li key={n.href}><a href={n.href} className="text-foreground/70 transition-colors hover:text-foreground">{n.label}</a></li>
          ))}
        </ul>
        <a href="#contato" className="hidden rounded-full border border-foreground/20 px-5 py-2.5 text-sm transition-colors hover:border-primary hover:bg-primary md:inline-flex">Fale conosco</a>
        <button className="grid size-11 place-items-center md:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <div className={`grid overflow-hidden transition-[grid-template-rows] duration-500 md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <ul className="min-h-0 px-6">
          {[...NAV, { href: "#contato", label: "Fale conosco" }].map((n) => (
            <li key={n.href} className="border-t border-border">
              <a href={n.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-4 font-display text-2xl font-bold">
                {n.label} <ArrowUpRight className="size-5 text-primary" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function Hero() {
  const [p, setP] = useState({ x: 0, y: 0 });
  return (
    <section
      id="topo"
      onPointerMove={(e) => e.pointerType === "mouse" && setP({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })}
      className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-red-scene"
    >
      {/* oversized ghost word behind the subject */}
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-[18%] -z-10 -translate-x-1/2 select-none font-display text-[28vw] font-extrabold leading-none tracking-tighter text-foreground/[0.06]">
        AAPM
      </span>
      <img
        src={student}
        alt="Estudante segurando um notebook"
        width={1024}
        height={1024}
        className="absolute bottom-0 right-[-18%] -z-10 h-[78svh] w-auto max-w-none object-contain transition-transform duration-700 ease-out sm:right-[-6%] md:right-[2%] md:h-[92svh] animate-[rise_1.4s_cubic-bezier(.2,.8,.2,1)_both]"
        style={{ transform: `translate3d(${p.x * -24}px, ${p.y * -12}px, 0)` }}
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-background via-background/40 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:pb-24">
        <p className="animate-rise text-xs uppercase tracking-[0.35em] text-accent">Associação de pais e mestres · SENAI</p>
        <h1 className="mt-6 max-w-4xl animate-rise font-display text-hero font-extrabold [animation-delay:120ms]">
          Alunos,<br />oportunidades<br />e benefícios.
          <span className="block font-serif font-normal italic tracking-tight text-accent">No mesmo lugar.</span>
        </h1>
        <div className="mt-10 flex animate-rise flex-wrap items-center gap-4 [animation-delay:260ms]">
          <a href="#beneficios" className="group inline-flex h-14 items-center gap-3 rounded-full bg-foreground px-7 font-semibold text-ink transition-transform hover:-translate-y-0.5">
            Conheça a AAPM <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#beneficios" className="inline-flex h-14 items-center px-2 text-foreground/80 underline-offset-8 hover:text-foreground hover:underline">
            Ver possibilidades
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Mini screens (mocks of the real AAPM screens) ---------- */

const fs = "text-[clamp(6px,0.75vw,11px)]";

function MockNav() {
  return (
    <div className={`flex items-center justify-between px-[4%] py-[2.5%] ${fs}`}>
      <span className="font-display text-[1.6em] font-extrabold tracking-tight">AAPM<span className="text-primary">.</span></span>
      <div className="hidden gap-[3em] opacity-70 sm:flex"><span>Início</span><span>Benefícios</span><span>Serviços</span><span>Contato</span></div>
      <span className="rounded-full bg-primary px-[1.2em] py-[0.5em] font-semibold text-primary-foreground">Fale conosco</span>
    </div>
  );
}

function MockSide() {
  const items = [Home, Gift, ShoppingBag, FileText, MapPin];
  return (
    <div className="flex w-[9%] flex-col items-center gap-[10%] border-r border-border bg-sidebar py-[4%]">
      <span className="font-display text-[clamp(6px,0.8vw,12px)] font-extrabold">AAPM</span>
      {items.map((I, i) => <I key={i} className={`size-[clamp(9px,1.2vw,18px)] ${i === 2 ? "text-primary" : "text-muted-foreground"}`} />)}
    </div>
  );
}

function BenefitsScreen() {
  return (
    <div className="h-full bg-ink-scene">
      <MockNav />
      <div className="grid grid-cols-3 gap-[2.5%] px-[5%] pt-[4%]">
        {[["01", "Benefícios"], ["02", "Serviços"], ["03", "Oportunidades"]].map(([n, t]) => (
          <div key={n} className="rounded-xl bg-card p-[8%]">
            <p className={`${fs} text-primary`}>{n}</p>
            <p className="mt-[20%] font-display text-[clamp(9px,1.3vw,20px)] font-bold">{t}</p>
            <div className="mt-[8%] space-y-1">
              <div className="h-[3px] w-full rounded bg-muted" /><div className="h-[3px] w-2/3 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoreScreen() {
  return (
    <div className="flex h-full bg-ink-scene">
      <MockSide />
      <div className="flex-1 p-[4%]">
        <h3 className="font-display text-[clamp(12px,2vw,30px)] font-extrabold">Produtos <span className="font-serif font-normal italic text-primary">disponíveis</span></h3>
        <div className={`mt-[3%] flex gap-[2%] ${fs}`}>
          {["Todos", "Camisetas", "Canecas", "Kits"].map((c, i) => (
            <span key={c} className={`rounded-full px-[1em] py-[0.4em] ${i === 0 ? "bg-primary" : "bg-muted text-muted-foreground"}`}>{c}</span>
          ))}
        </div>
        <div className="mt-[4%] grid grid-cols-3 gap-[3%]">
          {[["Camiseta", "49,90", shirt], ["Caneca", "29,90", mug], ["Kit aluno", "89,90", kit]].map(([n, p, img]) => (
            <div key={n} className="rounded-xl bg-card p-[7%]">
              <div className="grid aspect-square place-items-center rounded-lg bg-cream-scene p-[10%]">
                <img src={img} alt={n} loading="lazy" width={1024} height={1024} className="h-full w-full object-contain" />
              </div>
              <p className={`mt-[8%] font-semibold ${fs}`}>{n}</p>
              <div className={`flex items-center justify-between ${fs}`}>
                <span className="text-primary">R$ {p}</span>
                <span className="flex items-center text-accent"><Star className="size-2 fill-current" />4.9</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocsScreen() {
  return (
    <div className="h-full bg-cream-scene p-[5%] text-ink">
      <p className={`${fs} uppercase tracking-widest text-primary`}>Área do aluno</p>
      <h3 className="font-display text-[clamp(12px,2.2vw,32px)] font-extrabold leading-none">Envie seus<br /><span className="font-serif font-normal italic text-primary">documentos.</span></h3>
      <div className="mt-[5%] flex max-w-[55%] flex-col items-center rounded-2xl border-2 border-dashed border-primary/40 py-[6%]">
        <Upload className="size-[clamp(10px,1.6vw,24px)] text-primary" />
        <p className={`mt-1 font-semibold ${fs}`}>Arraste ou clique</p>
        <span className={`mt-2 rounded-full bg-primary px-[1.2em] py-[0.4em] text-primary-foreground ${fs}`}>Selecionar</span>
      </div>
      <div className={`mt-[4%] max-w-[55%] space-y-[3%] ${fs}`}>
        {[["RG", "Aprovado"], ["Comprovante", "Em análise"]].map(([d, s]) => (
          <div key={d} className="flex justify-between rounded-lg px-[4%] py-[2%] ring-1 ring-ink/10"><span>{d}</span><span className="font-semibold text-primary">{s}</span></div>
        ))}
      </div>
    </div>
  );
}

function TravelScreen() {
  return (
    <div className="h-full bg-ink-scene">
      <MockNav />
      <div className="px-[6%] pt-[3%]">
        <h3 className="font-display text-[clamp(14px,3vw,44px)] font-extrabold leading-[0.9]">Sua conquista<br />merece um dia<br /><span className="font-serif font-normal italic text-primary">inesquecível.</span></h3>
        <div className="mt-[5%] flex gap-[3%]">
          {["Parques", "Excursões", "Formatura"].map((x) => <span key={x} className={`rounded-lg bg-muted px-[1em] py-[0.6em] ${fs}`}>{x}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ---------- Feature rows (zigzag, minimal) ---------- */

function Feature({ id, index, kicker, title, accent, text, screen, flip, light }: {
  id: string; index: string; kicker: string; title: string; accent: string; text: string; screen: ReactNode; flip?: boolean; light?: boolean;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id={id} className={`scroll-mt-20 py-24 md:py-36 ${light ? "bg-cream text-ink" : ""}`}>
      <div className={`mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-12 md:gap-10`}>
        <div ref={ref} data-visible={visible} className={`reveal md:col-span-4 ${flip ? "md:order-2 md:col-start-9" : ""}`}>
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
            <span className="font-display text-base tracking-normal">{index}</span><span className="h-px w-8 bg-primary" />{kicker}
          </p>
          <h2 className="mt-6 font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
            {title} <span className="font-serif font-normal italic text-primary">{accent}</span>
          </h2>
          <p className={`mt-6 max-w-sm leading-relaxed ${light ? "text-ink/65" : "text-muted-foreground"}`}>{text}</p>
        </div>
        <div className={`md:col-span-8 ${flip ? "md:order-1 md:col-start-1" : ""}`}>{screen}</div>
      </div>
    </section>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return <div ref={ref} data-visible={visible} className={`reveal ${className}`}>{children}</div>;
}

function Kicker({ children }: { children: ReactNode }) {
  return <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary"><span className="h-px w-8 bg-primary" />{children}</p>;
}

const FAQ = [
  ["O que é a AAPM?", "A AAPM é a associação que reúne alunos, famílias e a escola para ampliar benefícios, serviços e oportunidades durante a formação no SENAI."],
  ["Quais benefícios e serviços estão disponíveis?", "Loja com produtos da AAPM, envio de documentos, viagens, excursões e apoio em eventos como a formatura."],
  ["Quem pode participar da AAPM?", "Alunos do SENAI e suas famílias."],
  ["Como faço para solicitar algum serviço?", "Entre em contato com a AAPM pelo botão Fale conosco."],
  ["Como acompanhar as oportunidades?", "As novidades são divulgadas pela AAPM nos canais oficiais da escola."],
];

function Index() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip bg-background">
        <Hero />

        <section id="associacao" className="scroll-mt-20 bg-cream py-24 text-ink md:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2">
            <Reveal>
              <Kicker>A associação</Kicker>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">Uma associação. <span className="font-serif font-normal italic text-primary">Muitas conexões.</span></h2>
              <p className="mt-6 max-w-sm text-ink/65">AAPM — aproximando alunos, oportunidades e benefícios.</p>
            </Reveal>
            <div className="grid gap-4 [perspective:1200px]">
              {[[Gift, "Apoio aos alunos", "Benefícios, serviços e oportunidades em um só lugar."], [Home, "Parceria total", "Escola, alunos e famílias juntos na mesma jornada."], [Star, "Desenvolvimento", "Facilitar o acesso e apoiar o desenvolvimento de cada aluno."], [ArrowUpRight, "Experiência conectada", "Uma experiência mais conectada e acessível."]].map(([I, t, d], i) => {
                const Icon = I as typeof Gift;
                return (
                  <Reveal key={t as string} className="[transition-delay:var(--d)]">
                    <div style={{ ["--d" as string]: `${i * 90}ms` }} className="flex gap-4 rounded-2xl bg-background/[0.03] p-5 ring-1 ring-ink/10 transition-transform duration-500 hover:[transform:rotateX(6deg)_translateY(-4px)] hover:shadow-screen">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" /></span>
                      <div><p className="font-display font-bold">{t as string}</p><p className="text-sm text-ink/60">{d as string}</p></div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="beneficios" className="scroll-mt-20 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <Kicker>Nossas possibilidades</Kicker>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">Possibilidades para <span className="font-serif font-normal italic text-primary">cada momento.</span></h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[["Benefícios", "Vantagens pensadas para a sua jornada no SENAI.", cap], ["Serviços", "Loja, documentos e apoio no dia a dia do aluno.", docs], ["Oportunidades", "Viagens, excursões e experiências para celebrar.", travel]].map(([t, d, m]) => (
                <Screen3D key={t} model={m as string} modelAlt="" modelClass="right-[-8%] top-[-18%] w-[42%]">
                  <div className="flex h-full flex-col justify-end bg-ink-scene p-6">
                    <p className="font-display text-2xl font-extrabold">{t}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                    <a href="#contato" className="mt-4 inline-flex items-center gap-2 text-sm text-primary">Saiba mais <ArrowRight className="size-4" /></a>
                  </div>
                </Screen3D>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream py-24 text-ink md:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2">
            <Screen3D model={cap} modelAlt="Capelo" modelClass="right-[-6%] top-[-20%] w-[30%]">
              <div className="h-full bg-red-scene"><img src={student} alt="Estudante do SENAI" loading="lazy" className="mx-auto h-full w-auto object-contain object-bottom" /></div>
            </Screen3D>
            <Reveal>
              <Kicker>Formação</Kicker>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">Sua formação é feita <span className="font-serif font-normal italic text-primary">de encontros.</span></h2>
              <p className="mt-6 max-w-md text-ink/65">A AAPM aproxima pessoas, cria experiências e fortalece a comunidade escolar.</p>
            </Reveal>
          </div>
        </section>

        <section id="etapas" className="scroll-mt-20 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal>
                <Kicker>Como participar</Kicker>
                <h2 className="mt-6 font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">O próximo passo começa <span className="font-serif font-normal italic text-primary">com uma conversa.</span></h2>
              </Reveal>
              <a href="#contato" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground">Fale conosco <ArrowRight className="size-4" /></a>
            </div>
            <ol className="mt-14 grid gap-6 md:grid-cols-3">
              {[["Conheça as possibilidades", "Veja benefícios, serviços e oportunidades da AAPM."], ["Converse com a AAPM", "Tire dúvidas e entenda como participar."], ["Entenda o próximo passo", "Receba as orientações para seguir."]].map(([t, d], i) => (
                <Reveal key={t}>
                  <li className="h-full rounded-2xl bg-card p-7 transition-transform duration-500 hover:-translate-y-1 hover:shadow-glow">
                    <span className="font-display text-4xl font-extrabold text-primary">0{i + 1}</span>
                    <p className="mt-6 font-display text-xl font-bold">{t}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section id="duvidas" className="scroll-mt-20 bg-cream py-24 text-ink md:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <Kicker>Perguntas frequentes</Kicker>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-5xl">Vamos esclarecer <span className="font-serif font-normal italic text-primary">suas dúvidas.</span></h2>
            </Reveal>
            <div className="md:col-span-8">
              {FAQ.map(([q, a]) => (
                <details key={q} className="group border-b border-ink/15 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-bold">
                    {q}<span className="text-2xl text-primary transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-xl text-ink/65">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="grain relative overflow-hidden bg-red-scene py-28 md:py-36">
          <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-10 px-6">
            <h2 className="max-w-3xl font-display text-5xl font-extrabold leading-[0.9] tracking-tight md:text-7xl">Conecte-se ao que pode fazer <span className="font-serif font-normal italic text-accent">a diferença.</span></h2>
            <a href="#topo" className="group inline-flex h-14 items-center gap-3 rounded-full bg-foreground px-7 font-semibold text-ink">Fale com a AAPM <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-4xl font-extrabold">AAPM<span className="text-primary">.</span></p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">Conexões para sua jornada no SENAI.</p>
          </div>
          <nav aria-label="Rodapé">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Navegação</p>
            <ul className="mt-4 space-y-2 text-sm">{NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-primary">{n.label}</a></li>)}</ul>
          </nav>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Contato</p>
            <a href="#contato" className="mt-4 inline-block text-sm hover:text-primary">Fale com a AAPM →</a>
          </div>
        </div>
        <p className="mx-auto max-w-7xl px-6 pb-8 text-xs text-muted-foreground">© AAPM</p>
      </footer>
    </>
  );
}
