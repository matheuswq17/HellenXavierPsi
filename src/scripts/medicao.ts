/**
 * Medição (Google tag) — eventos por delegação, sem dado de saúde.
 *
 * - Cliques em links do WhatsApp da Hellen (wa.me/<número do site>): evento GA4 "clique_whatsapp"
 *   { origem, canal: "whatsapp" } + conversão do Google Ads PUBLIC_GADS_CONVERSION_WHATSAPP (se configurada).
 * - Links tel:: só o evento GA4 "clique_whatsapp" { origem, canal: "telefone" } — sem conversão do Ads.
 * - Botão "Quero um site assim" (data-evento="contato_desenvolvedor"): só o evento GA4
 *   "contato_desenvolvedor" — NÃO é conversão do Ads, para não confundir o lance.
 * - "origem" vem de data-origem no link (hero, flutuante, contato…). Nunca há texto do usuário,
 *   mensagem ou dado clínico nos parâmetros.
 * - Sem a tag carregada (desenvolvimento ou IDs vazios), os eventos são só registrados no console.
 * - utm_source da 1ª visita fica no sessionStorage e ajusta a mensagem pronta do WhatsApp
 *   ("Vim pelo Google…"). Padrão continua "Vim pelo site".
 */
declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

const CONVERSAO = (import.meta.env.PUBLIC_GADS_CONVERSION_WHATSAPP as string | undefined)?.trim() || "";
const numero = document.body.dataset.wa || "";

function enviar(nome: string, params: Record<string, string>) {
  const dados = { ...params, transport_type: "beacon" };
  if (typeof window.gtag === "function") window.gtag("event", nome, dados);
  else console.info("[medição]", nome, dados);
}

function origemDo(a: HTMLElement) {
  return a.dataset.origem || a.closest("section[id], footer[id], header")?.id || "outro";
}

document.addEventListener(
  "click",
  (e) => {
    const a = (e.target as Element | null)?.closest?.("a");
    if (!a) return;
    const href = a.getAttribute("href") || "";

    if (a.dataset.evento === "contato_desenvolvedor") {
      enviar("contato_desenvolvedor", { origem: origemDo(a) });
      return;
    }

    const ehWhats = numero !== "" && href.includes(`wa.me/${numero}`);
    const ehTel = href.startsWith("tel:");
    if (!ehWhats && !ehTel) return;

    const origem = origemDo(a);
    enviar("clique_whatsapp", { origem, canal: ehTel ? "telefone" : "whatsapp" });
    if (ehWhats && CONVERSAO) {   // a conversão do WhatsApp no Google Ads vale só para wa.me
      const dados = { send_to: CONVERSAO, transport_type: "beacon" };
      if (typeof window.gtag === "function") window.gtag("event", "conversion", dados);
      else console.info("[medição] conversion (Google Ads)", dados);
    }
  },
  { capture: true },
);

// ---------- utm_source da primeira visita → mensagem pronta do WhatsApp ----------
const ROTULOS: Record<string, string> = {
  google: "pelo Google", gads: "pelo Google", adwords: "pelo Google",
  instagram: "pelo Instagram", ig: "pelo Instagram",
  facebook: "pelo Facebook", fb: "pelo Facebook",
};

function origemDaVisita(): string {
  let salvo = "";
  try {
    salvo = sessionStorage.getItem("utm_source_1a") || "";
    if (!salvo) {
      const bruto = new URLSearchParams(location.search).get("utm_source") || "";
      const limpo = bruto.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 30);
      if (limpo) { sessionStorage.setItem("utm_source_1a", limpo); salvo = limpo; }
    }
  } catch { /* sessionStorage indisponível: segue com o padrão */ }
  return salvo;
}

const rotulo = ROTULOS[origemDaVisita()];
if (rotulo && numero) {
  const trocar = (t: string) => t.replace("Vim pelo site", `Vim ${rotulo}`);
  document.querySelectorAll<HTMLAnchorElement>(`a[href*="wa.me/${numero}"]`).forEach((a) => {
    try {
      const url = new URL(a.href);
      const texto = url.searchParams.get("text");
      if (texto && texto.includes("Vim pelo site")) a.href = `${url.origin}${url.pathname}?text=${encodeURIComponent(trocar(texto))}`;
    } catch { /* link inválido: mantém */ }
  });
  // prévia "Mensagem pronta" do botão flutuante
  document.querySelectorAll<HTMLElement>(".flutua__previa").forEach((p) => {
    p.childNodes.forEach((n) => { if (n.nodeType === 3 && n.textContent?.includes("Vim pelo site")) n.textContent = trocar(n.textContent); });
  });
}

export {};
