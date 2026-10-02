import Logo from "./Logo";
import { whatsappUrl } from "@/lib/whatsapp";

const SERVICOS = [
  "Sites e landing pages",
  "Sistemas e plataformas web",
  "Aplicativos",
  "Identidade visual",
  "Integrações e automação",
];

const NAVEGACAO = [
  { href: "#servicos", label: "Serviços" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#catalogo-place", label: "Catálogo Place" },
  { href: "#processo", label: "Como trabalhamos" },
  { href: "#faq", label: "Dúvidas" },
];

const titulo = "mb-5 text-xs font-semibold tracking-[0.18em] text-nevoa/40 uppercase";
const link = "text-sm text-nevoa/65 transition-colors hover:text-lima";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#12022a] pt-20 pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-nevoa/50">
            Agência de design e tecnologia. Sites, sistemas, apps e identidades visuais para empresas de todo o Brasil.
          </p>
        </div>

        <div>
          <p className={titulo}>Serviços</p>
          <ul className="flex flex-col gap-3">
            {SERVICOS.map((s) => (
              <li key={s}>
                <a href="#servicos" className={link}>{s}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={titulo}>Navegação</p>
          <ul className="flex flex-col gap-3">
            {NAVEGACAO.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={link}>{n.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={titulo}>Contato</p>
          <ul className="flex flex-col gap-3">
            {whatsappUrl && (
              <li>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className={link}>WhatsApp</a>
              </li>
            )}
            <li>
              <a href="mailto:gestao@trasso.com.br" className={link}>gestao@trasso.com.br</a>
            </li>
            <li>
              <a href="https://instagram.com/_agenciatrasso" target="_blank" rel="noreferrer" className={link}>
                Instagram @_agenciatrasso
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] px-6 pt-8 text-xs text-nevoa/35 lg:px-10">
        <p>© {new Date().getFullYear()} Trasso. Criatividade e tecnologia no mesmo traço.</p>
        <a href="#topo" className="hover:text-nevoa">Voltar ao topo ↑</a>
      </div>
    </footer>
  );
}
