/** Tag do Google: só em produção e só com ID configurado (variáveis PUBLIC_*). */
export const tagId = (import.meta.env.PUBLIC_GOOGLE_TAG_ID || "").trim();
export const conversaoWhats = (import.meta.env.PUBLIC_GADS_CONVERSION_WHATSAPP || "").trim();
/** "AW-123456789/abcDEF" → "AW-123456789" */
export const adsId = conversaoWhats.split("/")[0];
export const tagAtiva = import.meta.env.PROD && Boolean(tagId);
