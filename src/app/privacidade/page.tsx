import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@/components/Logo";
import { CNPJ, EMAIL_CONTATO } from "@/lib/empresa";

// Política de privacidade do site (linkada nas landings de anúncio).
// Rascunho escrito a partir do que o site faz hoje: formulário → administrativo
// (banco no Supabase), e-mail de contingência (Resend), Meta Pixel e WhatsApp.
// Revise com quem cuida do jurídico antes de publicar e ao mudar esses fluxos.

const ATUALIZADA_EM = "28 de outubro de 2026";

export const metadata: Metadata = {
  title: { absolute: "Política de privacidade | Slick" },
  description: "Como a Slick coleta, usa e protege os dados enviados pelo site.",
  alternates: { canonical: "/privacidade" },
};

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-black text-nevoa sm:text-2xl">{titulo}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-nevoa/75">{children}</div>
    </section>
  );
}

export default function Privacidade() {
  const email = (
    <a href={`mailto:${EMAIL_CONTATO}`} className="text-lima underline underline-offset-2">
      {EMAIL_CONTATO}
    </a>
  );

  return (
    <>
      <header className="border-b border-white/10 bg-roxo-noite">
        <div className="mx-auto flex max-w-3xl items-center px-5 py-4 sm:px-8">
          <Link href="/" aria-label="Slick — página inicial">
            <Wordmark className="h-7 w-auto" />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-14 sm:px-8 sm:py-20">
        <p className="eyebrow mb-4 text-lima">Privacidade</p>
        <h1 className="text-3xl leading-[1.08] font-black tracking-tight text-nevoa sm:text-5xl">Política de privacidade</h1>
        <p className="mt-4 text-sm text-nevoa/55">Última atualização: {ATUALIZADA_EM}</p>

        <Secao titulo="Quem somos">
          <p>
            Esta política explica como a Slick{CNPJ && <> (CNPJ {CNPJ})</>} trata os dados pessoais de quem visita este site e
            preenche nossos formulários, de acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018). Para qualquer
            assunto sobre seus dados, fale com a gente em {email}.
          </p>
        </Secao>

        <Secao titulo="Quais dados coletamos">
          <p>
            <strong className="text-nevoa">Dados que você informa no formulário:</strong> nome, número de WhatsApp e as
            respostas às perguntas (por exemplo, se já tem site e quando pretende colocá-lo no ar).
          </p>
          <p>
            <strong className="text-nevoa">Dados de navegação:</strong> a página em que você preencheu o formulário e os
            parâmetros do link que te trouxe até aqui (como a campanha de anúncio), além de cookies e identificadores do
            Meta Pixel, explicados abaixo.
          </p>
        </Secao>

        <Secao titulo="Para que usamos">
          <ul className="list-disc space-y-2 pl-5">
            <li>Entrar em contato com você pelo WhatsApp sobre o serviço que você pediu e enviar orçamento.</li>
            <li>Organizar o atendimento comercial e entender quais anúncios e campanhas trazem contatos.</li>
            <li>Medir e melhorar nossos anúncios no Facebook e no Instagram.</li>
          </ul>
          <p>
            Não vendemos seus dados e não usamos o seu contato para nada além do atendimento sobre o serviço que você
            procurou. A base legal é o procedimento preliminar a um contrato que você solicitou e, para a medição de
            anúncios, o nosso legítimo interesse.
          </p>
        </Secao>

        <Secao titulo="Cookies e Meta Pixel">
          <p>
            Usamos o Meta Pixel, uma ferramenta da Meta (Facebook e Instagram), para saber quantas pessoas visitaram a
            página e enviaram o formulário depois de ver um anúncio. O Pixel usa cookies e envia à Meta informações sobre
            essas visitas. Os dados que você digita no formulário não são enviados à Meta. Você pode bloquear cookies nas
            configurações do navegador e ajustar suas preferências de anúncios na sua conta da Meta.
          </p>
        </Secao>

        <Secao titulo="Com quem compartilhamos">
          <p>
            Seus dados ficam guardados no nosso sistema interno de atendimento e são acessados apenas pela equipe da
            Slick. Para funcionar, contamos com fornecedores que processam dados em nosso nome: hospedagem do site, banco
            de dados (Supabase), envio de e-mails (Resend), Meta (Pixel) e WhatsApp, por onde conversamos com você. Alguns
            desses fornecedores podem armazenar dados fora do Brasil, sempre com proteções compatíveis com a LGPD.
          </p>
        </Secao>

        <Secao titulo="Por quanto tempo guardamos">
          <p>
            Pelo tempo necessário para o atendimento e, se você virar cliente, durante a relação comercial e pelos prazos
            exigidos por lei. Se não fecharmos negócio, você pode pedir a exclusão a qualquer momento.
          </p>
        </Secao>

        <Secao titulo="Seus direitos">
          <p>
            Você pode, a qualquer momento, pedir para confirmar se tratamos seus dados, acessar, corrigir, excluir ou
            pedir a portabilidade deles, além de revogar consentimentos e se opor a algum uso. Basta escrever para{" "}
            {email}. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
          </p>
        </Secao>

        <Secao titulo="Mudanças nesta política">
          <p>
            Podemos atualizar esta política quando mudarmos a forma de tratar dados. A data da última atualização fica
            sempre no topo da página.
          </p>
        </Secao>
      </main>

      <footer className="border-t border-white/10 bg-preto px-5 py-8 text-center text-sm text-nevoa/60">
        <p>Slick — Agência criativa{CNPJ && <> · CNPJ {CNPJ}</>}</p>
      </footer>
    </>
  );
}
