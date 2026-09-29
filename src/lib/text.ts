import { mostrarPendencias } from "../site.config";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Texto sem os marcadores [[ ]] — para meta tags, JSON-LD e atributos. */
export const plain = (s: string) => s.replace(/\[\[|\]\]/g, "");

/** HTML com os trechos provisórios destacados (se mostrarPendencias). */
export const rich = (s: string) =>
  esc(s).replace(/\[\[(.+?)\]\]/g, (_, x) =>
    mostrarPendencias ? `<mark class="pendente" title="Informação provisória — confirmar">${x}</mark>` : x,
  );

export const waLink = (numero: string, msg: string) =>
  `https://wa.me/${numero}?text=${encodeURIComponent(plain(msg))}`;
