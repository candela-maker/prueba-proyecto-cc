import { useState, useRef } from "react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const MODEL = "claude-sonnet-4-6";

// ─── FIELD DEFINITIONS ───────────────────────────────────────────────────────
const FIELDS = {
  kaizen: [
    { id:"nombre_programa",     label:"Nombre del programa/curso/producto",    req:true,  sec:"1. Contexto" },
    { id:"explica_que_vendes",  label:"Explica qué vendés",                    req:true,  sec:"1. Contexto" },
    { id:"precio",              label:"Precio",                                req:true,  sec:"1. Contexto" },
    { id:"moneda",              label:"Moneda",                                req:true,  sec:"1. Contexto" },
    { id:"fecha_lanzamiento",   label:"Fecha de lanzamiento",                  req:true,  sec:"1. Contexto" },
    { id:"dolor_cliente",       label:"Qué le duele hoy a tu cliente",         req:true,  sec:"2. Mensaje" },
    { id:"resultado_prometido", label:"Resultado final que prometés",           req:true,  sec:"2. Mensaje" },
    { id:"audiencia",           label:"Audiencia objetivo",                    req:true,  sec:"3. Hero" },
    { id:"titulo_programa",     label:"Título de Programa",                    req:true,  sec:"3. Hero" },
    { id:"subtitulo",           label:"Subtítulo",                             req:true,  sec:"3. Hero" },
    { id:"texto_boton",         label:"Texto de botón",                        req:true,  sec:"3. Hero" },
    { id:"trata_titulo",        label:"Título",                                req:true,  sec:"4. De qué se trata" },
    { id:"trata_subtitulo",     label:"Subtítulo",                             req:true,  sec:"4. De qué se trata" },
    { id:"trata_texto",         label:"Texto",                                 req:true,  sec:"4. De qué se trata" },
    { id:"testimonios_titulo",  label:"Título",                                req:false, sec:"5. Testimonios" },
    { id:"testimonios",         label:"Testimonios",                           req:false, sec:"5. Testimonios" },
    { id:"oferta_titulo",       label:"Título de la oferta",                   req:true,  sec:"6. Order Recap" },
    { id:"oferta_subtitulo",    label:"Subtítulo",                             req:true,  sec:"6. Order Recap" },
    { id:"entregables_titulo",  label:'Título "qué se incluye"',               req:true,  sec:"6. Order Recap" },
    { id:"entregables",         label:'Contenido "qué se incluye"',            req:true,  sec:"6. Order Recap" },
    { id:"precio_tachado",      label:"Precio tachado",                        req:false, sec:"6. Order Recap" },
    { id:"faq_titulo",          label:"Título",                                req:true,  sec:"7. FAQ" },
    { id:"faq_subtitulo",       label:"Subtítulo",                             req:false, sec:"7. FAQ" },
    { id:"faqs",                label:"Preguntas frecuentes",                  req:true,  sec:"7. FAQ" },
    { id:"email_asunto",        label:"Asunto",                                req:true,  sec:"8. Mails" },
    { id:"email_contenido",     label:"Contenido",                             req:true,  sec:"8. Mails" },
    { id:"color_principal",     label:"Principal",                             req:false, sec:"Estilo" },
    { id:"color_secundario",    label:"Secundario",                            req:false, sec:"Estilo" },
    { id:"color_destaque",      label:"Destaque",                              req:false, sec:"Estilo" },
    { id:"color_fondo",         label:"Fondo",                                 req:false, sec:"Estilo" },
    { id:"tipografia_headings", label:"Headings",                              req:false, sec:"Estilo" },
    { id:"tipografia_body",     label:"Body",                                  req:false, sec:"Estilo" },
  ],
  booking: [
    { id:"nombre_programa",     label:"Nombre del programa/curso/producto",    req:true,  sec:"1. Contexto" },
    { id:"explica_que_vendes",  label:"Explica qué vendés",                    req:true,  sec:"1. Contexto" },
    { id:"precio",              label:"Precio",                                req:true,  sec:"1. Contexto" },
    { id:"moneda",              label:"Moneda",                                req:true,  sec:"1. Contexto" },
    { id:"fecha_lanzamiento",   label:"Fecha de lanzamiento",                  req:true,  sec:"1. Contexto" },
    { id:"dolor_cliente",       label:"Qué le duele hoy a tu cliente",         req:true,  sec:"2. Mensaje" },
    { id:"resultado_prometido", label:"Resultado final que prometés",           req:true,  sec:"2. Mensaje" },
    { id:"audiencia",           label:"Audiencia objetivo",                    req:true,  sec:"3. Hero" },
    { id:"titulo_programa",     label:"Título de Programa",                    req:true,  sec:"3. Hero" },
    { id:"subtitulo",           label:"Subtítulo",                             req:true,  sec:"3. Hero" },
    { id:"texto_boton",         label:"Texto de botón",                        req:true,  sec:"3. Hero" },
    { id:"trata_titulo",        label:"Título",                                req:true,  sec:"4. De qué se trata" },
    { id:"trata_subtitulo",     label:"Subtítulo",                             req:true,  sec:"4. De qué se trata" },
    { id:"trata_texto",         label:"Texto",                                 req:true,  sec:"4. De qué se trata" },
    { id:"testimonios_titulo",  label:"Título",                                req:false, sec:"5. Testimonios" },
    { id:"oferta_titulo",       label:"Título de la oferta",                   req:true,  sec:"6. Order Recap" },
    { id:"oferta_subtitulo",    label:"Subtítulo",                             req:true,  sec:"6. Order Recap" },
    { id:"entregables_titulo",  label:'Título "qué se incluye"',               req:true,  sec:"6. Order Recap" },
    { id:"entregables",         label:'Contenido "qué se incluye"',            req:true,  sec:"6. Order Recap" },
    { id:"faq_titulo",          label:"Título",                                req:true,  sec:"7. FAQ" },
    { id:"faqs",                label:"Preguntas frecuentes",                  req:true,  sec:"7. FAQ" },
    { id:"email_asunto",        label:"Asunto",                                req:true,  sec:"8. Mails" },
    { id:"email_contenido",     label:"Contenido",                             req:true,  sec:"8. Mails" },
    { id:"calendario_url",      label:"URL del calendario GHL",                req:true,  sec:"Configuración Booking" },
    { id:"whatsapp_url",        label:"Link de WhatsApp",                      req:false, sec:"Configuración Booking" },
    { id:"etapas_crm",          label:"Etapas del CRM",                        req:false, sec:"Configuración Booking" },
    { id:"color_principal",     label:"Principal",                             req:false, sec:"Estilo" },
    { id:"color_secundario",    label:"Secundario",                            req:false, sec:"Estilo" },
    { id:"color_destaque",      label:"Destaque",                              req:false, sec:"Estilo" },
    { id:"color_fondo",         label:"Fondo",                                 req:false, sec:"Estilo" },
    { id:"tipografia_headings", label:"Headings",                              req:false, sec:"Estilo" },
    { id:"tipografia_body",     label:"Body",                                  req:false, sec:"Estilo" },
  ],
  kaizen_large: [
    { id:"nombre_programa",     label:"Nombre del programa/curso/producto",    req:true,  sec:"1. Contexto" },
    { id:"explica_que_vendes",  label:"Explica qué vendés",                    req:true,  sec:"1. Contexto" },
    { id:"precio",              label:"Precio",                                req:true,  sec:"1. Contexto" },
    { id:"moneda",              label:"Moneda",                                req:true,  sec:"1. Contexto" },
    { id:"fecha_lanzamiento",   label:"Fecha de lanzamiento",                  req:true,  sec:"1. Contexto" },
    { id:"dolor_cliente",       label:"Qué le duele hoy a tu cliente",         req:true,  sec:"2. Mensaje" },
    { id:"resultado_prometido", label:"Resultado final que prometés",           req:true,  sec:"2. Mensaje" },
    { id:"audiencia",           label:"Audiencia objetivo",                    req:true,  sec:"3. Hero" },
    { id:"titulo_programa",     label:"Título de Programa",                    req:true,  sec:"3. Hero" },
    { id:"subtitulo",           label:"Subtítulo",                             req:true,  sec:"3. Hero" },
    { id:"texto_boton",         label:"Texto de botón",                        req:true,  sec:"3. Hero" },
    { id:"trata_titulo",        label:"Título",                                req:true,  sec:"4. De qué se trata" },
    { id:"trata_subtitulo",     label:"Subtítulo",                             req:true,  sec:"4. De qué se trata" },
    { id:"trata_texto",         label:"Texto",                                 req:true,  sec:"4. De qué se trata" },
    { id:"dif_titulo",          label:"Título",                                req:true,  sec:"5. Diferenciadores" },
    { id:"sin_programa",        label:"Sin el programa",                       req:true,  sec:"5. Diferenciadores" },
    { id:"con_programa",        label:"Con el programa",                       req:true,  sec:"5. Diferenciadores" },
    { id:"titulo_ideal",        label:"Título Persona Ideal",                  req:true,  sec:"6. Para quién" },
    { id:"titulo_no_ideal",     label:"Título Persona NO Ideal",               req:true,  sec:"6. Para quién" },
    { id:"lista_ideal",         label:"Lista Personas Ideales",                req:true,  sec:"6. Para quién" },
    { id:"lista_no_ideal",      label:"Lista Personas NO Ideales",             req:true,  sec:"6. Para quién" },
    { id:"entregables_titulo",  label:"Título",                                req:true,  sec:"7. Lo que recibís" },
    { id:"entregables",         label:"Entregables",                           req:true,  sec:"7. Lo que recibís" },
    { id:"oferta_titulo",       label:"Título de la oferta",                   req:true,  sec:"8. Order Recap" },
    { id:"oferta_subtitulo",    label:"Subtítulo",                             req:true,  sec:"8. Order Recap" },
    { id:"recap_titulo",        label:'Título "qué se incluye"',               req:true,  sec:"8. Order Recap" },
    { id:"recap_entregables",   label:'Contenido "qué se incluye"',            req:true,  sec:"8. Order Recap" },
    { id:"razones_titulo",      label:"Título",                                req:true,  sec:"9. Razones" },
    { id:"razones",             label:"Razones",                               req:true,  sec:"9. Razones" },
    { id:"testimonios_titulo",  label:"Título",                                req:false, sec:"10. Testimonios" },
    { id:"sobre_mi_nombre",     label:"Nombre y Apellido",                     req:true,  sec:"12. Sobre mí" },
    { id:"sobre_mi_parrafo",    label:"Párrafo",                               req:true,  sec:"12. Sobre mí" },
    { id:"faq_titulo",          label:"Título",                                req:true,  sec:"13. FAQ" },
    { id:"faqs",                label:"Preguntas frecuentes",                  req:true,  sec:"13. FAQ" },
    { id:"cta_titulo",          label:"Título",                                req:true,  sec:"15. Llamado a la acción" },
    { id:"cta_descripcion",     label:"Descripción",                           req:true,  sec:"15. Llamado a la acción" },
    { id:"email_asunto",        label:"Asunto",                                req:true,  sec:"16. Mails" },
    { id:"email_contenido",     label:"Contenido",                             req:true,  sec:"16. Mails" },
    { id:"color_principal",     label:"Principal",                             req:false, sec:"Estilo" },
    { id:"color_secundario",    label:"Secundario",                            req:false, sec:"Estilo" },
    { id:"tipografia_headings", label:"Headings",                              req:false, sec:"Estilo" },
    { id:"tipografia_body",     label:"Body",                                  req:false, sec:"Estilo" },
  ],
  whatsapp: [
    { id:"explica_que_vendes",  label:"Explica qué vendés",                    req:true,  sec:"1. Contexto" },
    { id:"texto_boton_wa",      label:"Texto botón contactar por WhatsApp",    req:true,  sec:"2. Enlace Social" },
    { id:"parrafo_bio",         label:"Párrafo",                               req:false, sec:"2. Enlace Social" },
    { id:"llamados_accion",     label:"Llamados a la acción",                  req:true,  sec:"2. Enlace Social" },
    { id:"flujo_conversacional",label:"Flujo conversacional",                  req:true,  sec:"3. Flujo" },
    { id:"horario_atencion",    label:"Horario de atención",                   req:false, sec:"3. Variables" },
    { id:"color_texto",         label:"Texto",                                 req:false, sec:"Estilo" },
    { id:"color_botones",       label:"Botones",                               req:false, sec:"Estilo" },
  ],
};

const FUNNEL_TYPES = [
  { id:"kaizen",       label:"⚡ Kaizen Funnel",       color:"#f59e0b" },
  { id:"kaizen_large", label:"⚡ Kaizen Funnel Large",  color:"#f59e0b" },
  { id:"booking",      label:"📞 Booking Funnel",       color:"#7c3aed" },
  { id:"whatsapp",     label:"💬 WhatsApp Funnel",      color:"#10b981" },
];

const SECTIONS_BY_TYPE = {
  kaizen:       ["HERO","DE_QUE_TRATA","TESTIMONIOS","ORDER_RECAP","FAQ","EMAIL_BIENVENIDA"],
  kaizen_large: ["HERO","DE_QUE_TRATA","DIFERENCIADORES","PARA_QUIEN","LO_QUE_RECIBES","ORDER_RECAP","RAZONES","TESTIMONIOS","SOBRE_MI","FAQ","CTA_FINAL","EMAIL_BIENVENIDA"],
  booking:      ["HERO","DE_QUE_TRATA","TESTIMONIOS","ORDER_RECAP","FAQ","CALENDARIO_Y_CTA","EMAIL_BIENVENIDA"],
  whatsapp:     ["ENLACE_SOCIAL","FLUJO_MENSAJES","DOCUMENTACION_CRM"],
};

// ─── STYLES ──────────────────────────────────────────────────────────────────
const C = {
  bg:"#0a0a14", card:"#11111e", card2:"#191928", border:"#252538",
  purple:"#7c3aed", purpleL:"#a855f7", text:"#e8e8f0", muted:"#6060a0",
  gold:"#f59e0b", green:"#10b981", red:"#ef4444",
};

const sty = {
  app:  { fontFamily:"'Inter',system-ui,sans-serif", minHeight:"100vh", background:C.bg, color:C.text },
  hdr:  { background:C.card2, borderBottom:`1px solid ${C.border}`, padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 },
  main: { maxWidth:860, margin:"0 auto", padding:"24px 16px 60px" },
  h1:   { fontSize:24, fontWeight:800, color:"#fff", margin:"0 0 6px" },
  sub:  { color:C.muted, fontSize:13, margin:"0 0 24px" },
  lbl:  { display:"block", fontSize:11, fontWeight:700, color:"#9090b8", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em" },
  warn: { background:"#1e1200", border:`1px solid ${C.gold}44`, borderRadius:9, padding:"12px 16px", color:C.gold, fontSize:13 },
  ok:   { background:"#081510", border:`1px solid ${C.green}44`, borderRadius:9, padding:"12px 16px", color:C.green, fontSize:13 },
  err:  { background:"#150808", border:`1px solid ${C.red}44`, borderRadius:9, padding:"12px 16px", color:"#f87171", fontSize:13 },
  code: { background:"#050510", border:`1px solid ${C.border}`, borderRadius:9, padding:14, fontFamily:"monospace", fontSize:12, color:"#a0c8f0", whiteSpace:"pre-wrap", overflowX:"auto", maxHeight:260, overflowY:"auto", lineHeight:1.6 },
  tag:  (c) => ({ display:"inline-block", padding:"2px 7px", borderRadius:4, fontSize:11, fontWeight:700, background:c+"22", color:c, border:`1px solid ${c}44` }),
  btn:  (v="primary", sm) => {
    const b = { padding:sm?"7px 14px":"10px 20px", borderRadius:9, border:"none", cursor:"pointer", fontWeight:700, fontSize:sm?12:14, display:"inline-flex", alignItems:"center", gap:6, transition:"all .15s", whiteSpace:"nowrap" };
    if (v === "primary")  return { ...b, background:`linear-gradient(135deg,${C.purple},${C.purpleL})`, color:"#fff" };
    if (v === "success")  return { ...b, background:"linear-gradient(135deg,#059669,#10b981)", color:"#fff" };
    if (v === "warning")  return { ...b, background:"linear-gradient(135deg,#b45309,#d97706)", color:"#fff" };
    return { ...b, background:C.card, color:C.muted, border:`1px solid ${C.border}` };
  },
  inp: (warn) => ({ width:"100%", background:"#0a0a14", border:`1px solid ${warn ? C.gold+"88" : C.border}`, borderRadius:7, padding:"8px 12px", color:C.text, fontSize:13, outline:"none", boxSizing:"border-box", transition:"border .15s" }),
  ta:  (warn) => ({ width:"100%", background:"#0a0a14", border:`1px solid ${warn ? C.gold+"88" : C.border}`, borderRadius:7, padding:"8px 12px", color:C.text, fontSize:13, outline:"none", boxSizing:"border-box", minHeight:80, resize:"vertical", lineHeight:1.6 }),
};

const LONG_FIELDS = new Set(["explica_que_vendes","trata_texto","testimonios","entregables","faqs","email_contenido","etapas_crm","flujo_conversacional","llamados_accion","sin_programa","con_programa","lista_ideal","lista_no_ideal","razones","sobre_mi_parrafo","cta_descripcion","subtitulo","resultado_prometido","dolor_cliente","recap_entregables"]);

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function parseSections(text) {
  const blocks = text.split(/===SECCION:([^=]+)===/);
  if (blocks.length < 3) return [{ name:"Código generado", html:"", css:"", js:"", notes:"", raw:text }];
  const res = [];
  for (let i = 1; i < blocks.length; i += 2) {
    const name = blocks[i].trim(), body = blocks[i+1] || "";
    res.push({
      name,
      html:  (body.match(/===HTML===\n([\s\S]*?)(?====|$)/) || [])[1]?.trim() || "",
      css:   (body.match(/===CSS===\n([\s\S]*?)(?====|$)/)  || [])[1]?.trim() || "",
      js:    (body.match(/===JS===\n([\s\S]*?)(?====|$)/)   || [])[1]?.trim() || "",
      notes: (body.match(/===NOTAS===\n([\s\S]*?)(?====FIN===|$)/) || [])[1]?.trim() || "",
      raw: body,
    });
  }
  return res.length ? res : [{ name:"Código generado", html:"", css:"", js:"", notes:"", raw:text }];
}

function getSectionData(secName, f) {
  const map = {
    HERO:            `Audiencia: ${f.audiencia}\nTítulo: ${f.titulo_programa}\nSubtítulo: ${f.subtitulo}\nBotones CTA: ${f.texto_boton}\nVideo: [placeholder — el cliente sube el archivo a GHL]`,
    DE_QUE_TRATA:    `Título: ${f.trata_titulo}\nSubtítulo: ${f.trata_subtitulo}\nTexto: ${f.trata_texto}`,
    DIFERENCIADORES: `Título: ${f.dif_titulo}\nSin el programa: ${f.sin_programa}\nCon el programa: ${f.con_programa}`,
    PARA_QUIEN:      `Persona ideal — Título: ${f.titulo_ideal}\nLista: ${f.lista_ideal}\nPersona NO ideal — Título: ${f.titulo_no_ideal}\nLista: ${f.lista_no_ideal}`,
    LO_QUE_RECIBES:  `Título: ${f.entregables_titulo}\nEntregables: ${f.entregables}`,
    ORDER_RECAP:     `Título oferta: ${f.oferta_titulo}\nSubtítulo: ${f.oferta_subtitulo||""}\nTítulo incluye: ${f.entregables_titulo||f.recap_titulo}\nEntregables: ${f.entregables||f.recap_entregables}\nPrecio: ${f.precio} ${f.moneda}\nPrecio tachado: ${f.precio_tachado||""}`,
    RAZONES:         `Título: ${f.razones_titulo}\nRazones: ${f.razones}`,
    TESTIMONIOS:     `Título: ${f.testimonios_titulo||"Lo que dicen"}\nTestimonios: ${f.testimonios}`,
    SOBRE_MI:        `Nombre: ${f.sobre_mi_nombre}\nPárrafo: ${f.sobre_mi_parrafo}`,
    FAQ:             `Título: ${f.faq_titulo}\nSubtítulo: ${f.faq_subtitulo||""}\nPreguntas: ${f.faqs}`,
    CTA_FINAL:       `Título: ${f.cta_titulo}\nDescripción: ${f.cta_descripcion}`,
    EMAIL_BIENVENIDA:`Asunto: ${f.email_asunto}\nContenido: ${f.email_contenido}`,
    CALENDARIO_Y_CTA:`URL Calendario GHL: ${f.calendario_url||"[INSERTAR URL CALENDARIO GHL]"}\nURL WhatsApp: ${f.whatsapp_url||""}\nInstruir a usar iframe embed del widget nativo de GHL. Generar placeholder visible con instrucciones de integración.`,
    ENLACE_SOCIAL:   `Descripción: ${f.explica_que_vendes}\nBotón WA: ${f.texto_boton_wa}\nPárrafo: ${f.parrafo_bio||""}\nAcciones: ${f.llamados_accion}`,
    FLUJO_MENSAJES:  `Flujo: ${f.flujo_conversacional}\nHorario: ${f.horario_atencion||""}`,
    DOCUMENTACION_CRM:`Etapas: ${f.etapas_crm}`,
  };
  return map[secName] || "";
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function App() {
  const [step,       setStep]       = useState("select");
  const [type,       setType]       = useState(null);
  const [apiKey,     setApiKey]     = useState(() => localStorage.getItem("tf_api_key") || "");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [docErr,     setDocErr]     = useState("");
  const [fields,     setFields]     = useState({});
  const [missing,    setMissing]    = useState([]);
  const [genProgress,setGenProgress]= useState([]);
  const [sections,   setSections]   = useState([]);
  const [activeSec,  setActiveSec]  = useState(0);
  const [activeTab,  setTab]        = useState("html");
  const [copied,     setCopied]     = useState("");
  const [iterText,   setIterText]   = useState("");
  const [genErr,     setGenErr]     = useState("");
  const [parseInfo,  setParseInfo]  = useState(null);
  const [showMissingModal, setShowMissingModal] = useState(false);
  const fileRef = useRef();

  const defs     = type ? FIELDS[type] : [];
  const required = defs.filter(f => f.req);

  const checkMissing = (data) => {
    const m = required.filter(f => !data[f.id]?.trim());
    setMissing(m);
    return m;
  };

  const setField = (id, val) => setFields(prev => {
    const next = { ...prev, [id]: val };
    checkMissing(next);
    return next;
  });

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem("tf_api_key", key);
  };

  // ── API call helper ────────────────────────────────────────────────────────
  const claudeFetch = (body) => fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-calls": "true",
    },
    body: JSON.stringify(body),
  });

  // ── Parse PDF / TXT ────────────────────────────────────────────────────────
  const readFileAsBase64 = (file) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload  = () => res(r.result.split(",")[1]);
    r.onerror = () => rej(new Error("Error al leer el archivo"));
    r.readAsDataURL(file);
  });

  const handleFileUpload = async (file) => {
    if (!file) return;
    if (!apiKey.trim()) { setDocErr("Primero configurá tu API Key de Anthropic (botón ⚙️ arriba a la derecha)."); return; }
    setLoading(true); setDocErr(""); setParseInfo(null);

    const funnelLabel = {
      kaizen:       "KAIZEN FUNNEL (no Large)",
      kaizen_large: "KAIZEN FUNNEL LARGE",
      booking:      "BOOKING FUNNEL",
      whatsapp:     "WHATSAPP FUNNEL",
    }[type];
    const copyLabel   = { kaizen:"Kaizen", kaizen_large:"Kaizen Large", booking:"Booking", whatsapp:"WhatsApp" }[type];
    const onbLabel    = `Onboarding ${copyLabel}`;
    const fieldList   = defs.map(f => `"${f.id}": "${f.label}"`).join(", ");

    const extractPrompt = `Este es un documento de implementación de funnels de Top Funnels para el tipo "${funnelLabel}".

Secciones relevantes del documento:
1. COPY (sección "Copy ${copyLabel}"): secciones numeradas 1-16 con tablas. El valor de cada campo está en la TERCERA fila de la tabla, después de la fila | :-: |.
2. ONBOARDING (sección "${onbLabel}"): contiene ESTILO (colores y tipografías como "- Principal: #valor") y MAIL (Asunto/Contenido en tablas).

Campos a extraer (id → etiqueta):
${fieldList}

Reglas:
- Omití campos vacíos, "Subir a archivos", "Ingresado al inicio", "1.    "
- email_asunto y email_contenido: búscalos en la sección MAIL del ONBOARDING
- color_* y tipografia_*: búscalos en ESTILO del ONBOARDING
- El resto: en la sección COPY

Devolvé SOLO un JSON válido con esas claves exactas. Sin texto extra ni markdown.`;

    try {
      let messages;
      if (file.type === "application/pdf") {
        const b64 = await readFileAsBase64(file);
        messages = [{
          role: "user",
          content: [
            { type: "document", source: { type: "base64", media_type: "application/pdf", data: b64 } },
            { type: "text", text: extractPrompt },
          ],
        }];
      } else {
        const text = await file.text();
        messages = [{ role: "user", content: `${extractPrompt}\n\nTexto del documento:\n${text.substring(0, 18000)}` }];
      }

      const res  = await claudeFetch({ model: MODEL, max_tokens: 2000, system: "Sos un extractor de campos de documentos de requerimientos. Devolvés SOLO JSON válido, sin explicaciones ni markdown.", messages });
      const data = await res.json();

      if (!res.ok) {
        const msg = data?.error?.message || "Error de API";
        setDocErr(`Error API (${res.status}): ${msg}`);
        setLoading(false);
        return;
      }

      const txt = data.content?.map(b => b.text || "").join("") || "{}";
      let parsed = {};
      try {
        const m = txt.replace(/```json|```/g, "").trim().match(/\{[\s\S]*\}/);
        if (m) parsed = JSON.parse(m[0]);
      } catch (_) {}

      const found = Object.keys(parsed).filter(k => parsed[k]?.trim()).length;
      setParseInfo({ found, total: defs.length, filename: file.name });
      setFields(parsed);
      checkMissing(parsed);
      setStep("review");
    } catch (e) {
      setDocErr("Error al procesar el archivo. Verificá tu API Key y que el archivo sea PDF o .txt.");
    } finally {
      setLoading(false);
    }
  };

  // ── Generate ───────────────────────────────────────────────────────────────
  const callClaude = async (prompt) => {
    const res = await claudeFetch({
      model: MODEL,
      max_tokens: 4096,
      system: `Sos experto en GoHighLevel/Top Funnels. Generás HTML+CSS+JS limpio, mobile-first, listo para pegar en GHL.
Reglas de diseño: máx 4 colores (70/20/10%), máx 2 tipografías, espaciado 80px entre bloques, border-radius 12px, botones con CTA descriptivo, contraste obligatorio, sin sombras en textos.
Formato de respuesta OBLIGATORIO (sin texto fuera de este formato):
===SECCION:[nombre]===
===HTML===
[html completo de la sección]
===CSS===
[css para CSS Personalizado de GHL — sin <style> tags]
===JS===
[js si aplica, sino dejarlo vacío]
===NOTAS===
[instrucciones breves de implementación en GHL]
===FIN===`,
      messages: [{ role: "user", content: prompt }],
    });
    const d = await res.json();
    if (!res.ok) throw new Error(d?.error?.message || `Error ${res.status}`);
    return d.content?.map(b => b.text || "").join("") || "";
  };

  const generate = async (custom) => {
    if (!apiKey.trim()) { setGenErr("Configurá tu API Key primero (⚙️ arriba a la derecha)."); return; }
    setGenErr(""); setSections([]); setStep("generating");

    const ft       = FUNNEL_TYPES.find(f => f.id === type);
    const secList  = SECTIONS_BY_TYPE[type] || [];
    const palette  = `Principal:${fields.color_principal||"#1a1a2e"} Secundario:${fields.color_secundario||"#f4d27a"} Destaque:${fields.color_destaque||""} Fondo:${fields.color_fondo||""}`;
    const typo     = `Headings:${fields.tipografia_headings||"Inter 700"} Body:${fields.tipografia_body||"Inter 400"}`;
    const context  = `Funnel: ${ft?.label}\nColores: ${palette}\nTipografía: ${typo}\nPrograma: ${fields.nombre_programa||""}\nPrecio: ${fields.precio||""} ${fields.moneda||""}\nAudiencia: ${fields.audiencia||""}\nDolor: ${fields.dolor_cliente||""}\nResultado prometido: ${fields.resultado_prometido||""}`;

    const skipIfEmpty = {
      TESTIMONIOS:     !fields.testimonios?.trim(),
      DOCUMENTACION_CRM: !fields.etapas_crm?.trim(),
    };

    const progress = secList.map(n => ({ name: n, status: "pending" }));
    setGenProgress([...progress]);

    const allSections = [];
    for (let i = 0; i < secList.length; i++) {
      const secName = secList[i];

      if (skipIfEmpty[secName]) {
        progress[i] = { name: secName, status: "skipped" };
        setGenProgress([...progress]);
        continue;
      }

      progress[i] = { name: secName, status: "loading" };
      setGenProgress([...progress]);

      const secData  = getSectionData(secName, fields);
      const prompt   = `${custom ? `Instrucción especial: ${custom}\n\n` : ""}Generá SOLO la sección "${secName}" del funnel.\n\nContexto general:\n${context}\n\nDatos específicos:\n${secData}\n\nReglas: mobile-first, sin Lorem ipsum, sin URLs vacías.`;

      try {
        const raw    = await callClaude(prompt);
        const parsed = parseSections(raw);
        if (parsed[0]?.name === "Código generado") parsed[0].name = secName;
        allSections.push(...parsed);
        setSections([...allSections]);
        progress[i] = { name: secName, status: "done" };
      } catch (e) {
        progress[i] = { name: secName, status: "error", err: e.message };
      }
      setGenProgress([...progress]);
    }

    setActiveSec(0); setTab("html");
    setStep("result");
  };

  const cp = (txt, id) => {
    navigator.clipboard.writeText(txt);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const reset = () => {
    setStep("select"); setType(null); setFields({}); setMissing([]);
    setSections([]); setGenErr(""); setDocErr(""); setParseInfo(null);
    setGenProgress([]);
  };

  // ── Grouped fields for review screen ──────────────────────────────────────
  const groupedFields = {};
  defs.forEach(f => {
    if (!groupedFields[f.sec]) groupedFields[f.sec] = [];
    groupedFields[f.sec].push(f);
  });

  const sec        = sections[activeSec] || {};
  const tabContent = { html: sec.html, css: sec.css, js: sec.js, notas: sec.notes, raw: sec.raw }[activeTab] || "";

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={sty.app}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        input:focus, textarea:focus { border-color: ${C.purple} !important; outline: none; }
        ::placeholder { color: #2a2a4a; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: ${C.card}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
      `}</style>

      {/* HEADER */}
      <div style={sty.hdr}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, background:`linear-gradient(135deg,${C.purple},${C.purpleL})`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🚀</div>
          <span style={{ fontSize:16, fontWeight:800, color:"#fff" }}>Top Funnels Builder</span>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {type && <span style={sty.tag(FUNNEL_TYPES.find(f => f.id === type)?.color || C.purple)}>{FUNNEL_TYPES.find(f => f.id === type)?.label}</span>}
          {step !== "select" && <button style={sty.btn("secondary", true)} onClick={reset}>✕ Nuevo</button>}
          <button style={{ ...sty.btn("secondary", true), position:"relative" }} onClick={() => setShowKeyInput(v => !v)}>
            ⚙️ API Key {apiKey ? <span style={sty.tag(C.green)}>✓</span> : <span style={sty.tag(C.red)}>!</span>}
          </button>
        </div>
      </div>

      {/* API KEY PANEL */}
      {showKeyInput && (
        <div style={{ background:C.card2, borderBottom:`1px solid ${C.border}`, padding:"14px 20px" }}>
          <div style={{ maxWidth:860, margin:"0 auto", display:"flex", gap:10, alignItems:"center" }}>
            <input
              type="password"
              style={{ ...sty.inp(false), maxWidth:400 }}
              value={apiKey}
              onChange={e => saveApiKey(e.target.value)}
              placeholder="sk-ant-api03-..."
            />
            <span style={{ fontSize:12, color:C.muted }}>Se guarda en localStorage. Nunca se envía a ningún servidor propio.</span>
            <button style={sty.btn("success", true)} onClick={() => setShowKeyInput(false)}>✓ Listo</button>
          </div>
        </div>
      )}

      <div style={sty.main}>

        {/* ── STEP: SELECT ── */}
        {step === "select" && (
          <>
            <h1 style={sty.h1}>¿Qué funnel vas a desarrollar?</h1>
            <p style={sty.sub}>Seleccioná el tipo y cargá el documento del cliente.</p>

            {!apiKey && (
              <div style={{ ...sty.warn, marginBottom:16 }}>
                ⚠️ Configurá tu <strong>API Key de Anthropic</strong> antes de continuar. Hacé click en ⚙️ API Key arriba a la derecha.
              </div>
            )}

            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12, marginBottom:24 }}>
              {FUNNEL_TYPES.map(f => (
                <div
                  key={f.id}
                  style={{ background: type === f.id ? "linear-gradient(135deg,#1a0f40,#2a1060)" : C.card, border:`2px solid ${type === f.id ? C.purple : C.border}`, borderRadius:14, padding:18, cursor:"pointer" }}
                  onClick={() => setType(f.id)}
                >
                  <div style={{ fontWeight:700, fontSize:15, color:"#fff" }}>{f.label}</div>
                  {type === f.id && <div style={{ marginTop:8, ...sty.tag(f.color) }}>✓ Seleccionado</div>}
                </div>
              ))}
            </div>

            {type && (
              <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
                <div style={{ fontWeight:700, color:"#fff", marginBottom:4, fontSize:15 }}>📄 Documento del cliente</div>
                <p style={{ fontSize:13, color:C.muted, marginBottom:16, lineHeight:1.6 }}>
                  Subí el documento de implementación como <strong style={{ color:"#fff" }}>PDF</strong> o <strong style={{ color:"#fff" }}>.txt</strong>.<br/>
                  <span style={{ fontSize:12, color:"#4a5a6a" }}>En Google Docs: Archivo → Descargar → PDF o Texto sin formato</span>
                </p>

                <div
                  style={{ border:`2px dashed ${loading ? C.purple : C.border}`, borderRadius:10, padding:"28px 20px", textAlign:"center", cursor:loading ? "default" : "pointer", transition:"all .15s", background:"#080810" }}
                  onClick={() => !loading && fileRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); if (!loading) e.currentTarget.style.borderColor = C.purple; }}
                  onDragLeave={e => { if (!loading) e.currentTarget.style.borderColor = C.border; }}
                  onDrop={e => { e.preventDefault(); if (!loading) { e.currentTarget.style.borderColor = C.border; const f = e.dataTransfer.files[0]; if (f) handleFileUpload(f); } }}
                >
                  {loading ? (
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
                      <div style={{ width:36, height:36, border:`3px solid ${C.border}`, borderTop:`3px solid ${C.purple}`, borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
                      <div style={{ color:C.purpleL, fontWeight:600, fontSize:14 }}>Procesando documento...</div>
                      <div style={{ fontSize:12, color:C.muted }}>Claude está extrayendo los campos</div>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize:32, marginBottom:8 }}>📁</div>
                      <div style={{ color:C.text, fontWeight:600, marginBottom:4 }}>Arrastrá el archivo o hacé click para seleccionar</div>
                      <div style={{ fontSize:12, color:C.muted }}>PDF o .txt — máx 10 MB</div>
                    </>
                  )}
                  <input ref={fileRef} type="file" accept=".pdf,.txt,text/plain,application/pdf" style={{ display:"none" }} onChange={e => { const f = e.target.files[0]; if (f) handleFileUpload(f); e.target.value = ""; }}/>
                </div>

                {docErr && <div style={{ ...sty.err, marginTop:10 }}>⚠️ {docErr}</div>}

                <button style={{ ...sty.btn("secondary", true), marginTop:14 }} onClick={() => { checkMissing({}); setStep("review"); }}>
                  ✏️ Completar manualmente →
                </button>
              </div>
            )}
          </>
        )}

        {/* ── STEP: REVIEW ── */}
        {step === "review" && (
          <>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
              <h1 style={sty.h1}>Revisá los datos del cliente</h1>
              <button style={sty.btn("secondary", true)} onClick={() => setStep("select")}>← Volver</button>
            </div>
            <p style={sty.sub}>Verificá y completá los campos antes de generar.</p>

            {parseInfo && (
              <div style={{ ...sty.ok, marginBottom:12 }}>
                ✅ <strong>{parseInfo.filename}</strong> — {parseInfo.found} campo{parseInfo.found !== 1 ? "s" : ""} detectado{parseInfo.found !== 1 ? "s" : ""} de {parseInfo.total} posibles.
              </div>
            )}

            {missing.length > 0 ? (
              <div style={{ ...sty.warn, marginBottom:14 }}>
                <div style={{ fontWeight:700, marginBottom:8 }}>⚠️ {missing.length} campo{missing.length > 1 ? "s" : ""} obligatorio{missing.length > 1 ? "s" : ""} sin completar:</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{missing.map(f => <span key={f.id} style={sty.tag(C.gold)}>{f.label}</span>)}</div>
              </div>
            ) : (
              <div style={{ ...sty.ok, marginBottom:14 }}>✅ Todos los campos obligatorios completos.</div>
            )}

            {genErr && <div style={{ ...sty.err, marginBottom:14 }}>⚠️ {genErr}</div>}

            {/* Missing fields modal */}
            {showMissingModal && (
              <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
                <div style={{ background:C.card2, border:`1px solid ${C.gold}55`, borderRadius:16, padding:28, maxWidth:480, width:"100%", boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}>
                  <div style={{ fontSize:28, marginBottom:12, textAlign:"center" }}>⚠️</div>
                  <div style={{ fontWeight:800, fontSize:17, color:"#fff", marginBottom:10, textAlign:"center" }}>Campos obligatorios sin completar</div>
                  <p style={{ fontSize:13, color:C.muted, marginBottom:16, textAlign:"center", lineHeight:1.6 }}>
                    El funnel se generará de todas formas, pero puede quedar incompleto.
                  </p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20, justifyContent:"center" }}>
                    {missing.map(f => <span key={f.id} style={sty.tag(C.gold)}>{f.label}</span>)}
                  </div>
                  <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
                    <button style={sty.btn("secondary")} onClick={() => setShowMissingModal(false)}>← Volver a completar</button>
                    <button style={sty.btn("warning")} onClick={() => { setShowMissingModal(false); generate(); }}>Generar de todas formas →</button>
                  </div>
                </div>
              </div>
            )}

            {Object.entries(groupedFields).map(([secName, secFields]) => (
              <div key={secName} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:C.purple, marginBottom:14 }}>{secName}</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
                  {secFields.map(f => {
                    const isMiss = f.req && !fields[f.id]?.trim();
                    const hasVal = !!fields[f.id]?.trim();
                    return (
                      <div key={f.id} style={{ gridColumn: LONG_FIELDS.has(f.id) ? "1/-1" : "auto" }}>
                        <label style={{ ...sty.lbl, color: isMiss ? C.gold : sty.lbl.color, display:"flex", alignItems:"center", gap:6 }}>
                          {f.label} {f.req && <span style={{ color:C.gold }}>*</span>}
                          {hasVal && <span style={{ ...sty.tag(C.green), fontSize:10 }}>✓</span>}
                        </label>
                        {LONG_FIELDS.has(f.id)
                          ? <textarea style={sty.ta(isMiss)} value={fields[f.id] || ""} onChange={e => setField(f.id, e.target.value)} placeholder={f.label}/>
                          : <input   style={sty.inp(isMiss)} value={fields[f.id] || ""} onChange={e => setField(f.id, e.target.value)} placeholder={f.label}/>
                        }
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:8 }}>
              <button style={sty.btn("primary")} onClick={() => { missing.length > 0 ? setShowMissingModal(true) : generate(); }}>
                🚀 Generar funnel
              </button>
              {missing.length > 0 && <span style={{ fontSize:13, color:C.gold, alignSelf:"center" }}>⚠️ {missing.length} campo{missing.length > 1 ? "s" : ""} sin completar</span>}
            </div>
          </>
        )}

        {/* ── STEP: GENERATING ── */}
        {step === "generating" && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"55vh", gap:24 }}>
            <div style={{ width:52, height:52, border:`4px solid ${C.border}`, borderTop:`4px solid ${C.purple}`, borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:800, color:"#fff", marginBottom:6 }}>Generando {FUNNEL_TYPES.find(f => f.id === type)?.label}</div>
              <div style={{ color:C.muted, fontSize:13 }}>Sección por sección con el copy del cliente</div>
            </div>
            <div style={{ width:"100%", maxWidth:420, display:"flex", flexDirection:"column", gap:8 }}>
              {genProgress.map((p, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, background:C.card, borderRadius:10, padding:"10px 16px", border:`1px solid ${p.status==="done"?C.green+"44":p.status==="loading"?C.purple+"44":p.status==="error"?C.red+"44":C.border}` }}>
                  <div style={{ width:22, height:22, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {p.status === "loading" && <div style={{ width:16, height:16, border:`2px solid ${C.border}`, borderTop:`2px solid ${C.purple}`, borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>}
                    {p.status === "done"    && <span style={{ color:C.green, fontSize:16 }}>✓</span>}
                    {p.status === "error"   && <span style={{ color:C.red,   fontSize:16 }}>✗</span>}
                    {p.status === "skipped" && <span style={{ color:C.muted, fontSize:14 }}>—</span>}
                    {p.status === "pending" && <div style={{ width:8, height:8, borderRadius:"50%", background:C.border }}/>}
                  </div>
                  <span style={{ fontSize:13, fontWeight: p.status === "loading" ? 700 : 400, color: p.status === "done" ? C.text : p.status === "loading" ? C.purpleL : C.muted }}>
                    {p.name.replace(/_/g, " ")}
                    {p.status === "skipped" && <span style={{ fontSize:11, marginLeft:6, color:C.muted }}>(sin datos)</span>}
                    {p.status === "error"   && <span style={{ fontSize:11, marginLeft:6, color:C.red }}>{p.err}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP: RESULT ── */}
        {step === "result" && (
          <>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6, flexWrap:"wrap", gap:8 }}>
              <h1 style={sty.h1}>✅ Funnel generado</h1>
              <div style={{ display:"flex", gap:8 }}>
                <button style={sty.btn("secondary", true)} onClick={() => setStep("review")}>← Editar datos</button>
                <button style={sty.btn("secondary", true)} onClick={reset}>🔄 Nuevo</button>
              </div>
            </div>

            {genErr && <div style={{ ...sty.err, marginBottom:12 }}>⚠️ {genErr}</div>}

            {/* Section pills */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
              {sections.map((s, i) => (
                <button key={i} onClick={() => { setActiveSec(i); setTab("html"); }}
                  style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${activeSec===i?C.purple:C.border}`, background:activeSec===i?C.purple+"22":"transparent", color:activeSec===i?C.purpleL:C.muted, cursor:"pointer", fontSize:13, fontWeight:activeSec===i?700:400 }}>
                  {s.name.replace(/_/g, " ")}
                </button>
              ))}
            </div>

            {/* Code viewer */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", marginBottom:16 }}>
              <div style={{ background:C.card2, padding:"10px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontWeight:700, color:C.purpleL }}>📦 {sec.name?.replace(/_/g, " ")}</span>
                <button style={sty.btn("success", true)} onClick={() => cp(tabContent, `${activeSec}-${activeTab}`)}>
                  {copied === `${activeSec}-${activeTab}` ? "✅ Copiado" : "📋 Copiar"}
                </button>
              </div>

              <div style={{ display:"flex", borderBottom:`1px solid ${C.border}`, overflowX:"auto" }}>
                {[["html","📄 HTML"],["css","🎨 CSS"],["js","⚡ JS"],["notas","📌 Notas"],["raw","🗂 Raw"]].map(([t, label]) => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ padding:"9px 14px", background:activeTab===t?"#050510":"transparent", color:activeTab===t?C.text:C.muted, border:"none", cursor:"pointer", fontSize:12, fontWeight:activeTab===t?700:400, borderBottom:`2px solid ${activeTab===t?C.purple:"transparent"}`, whiteSpace:"nowrap" }}>
                    {label}
                  </button>
                ))}
              </div>

              {["html","css","js"].includes(activeTab) && (
                <div style={{ padding:"5px 14px", background:"#06060f", fontSize:11, color:C.gold, borderBottom:`1px solid ${C.border}` }}>
                  {activeTab === "html" && "→ GoHighLevel → Funnel → Sección → Código HTML personalizado"}
                  {activeTab === "css"  && "→ GoHighLevel → Funnel → Configuración → CSS Personalizado"}
                  {activeTab === "js"   && "→ GoHighLevel → Funnel → Tracking Codes → Footer"}
                </div>
              )}

              <div style={{ padding:14 }}>
                {tabContent
                  ? <div style={sty.code}>{tabContent}</div>
                  : <div style={{ color:C.muted, fontSize:13, padding:8 }}>Sin contenido para esta pestaña.</div>}
              </div>
            </div>

            {/* Iterate */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginBottom:16 }}>
              <div style={{ fontWeight:700, color:"#fff", marginBottom:10, fontSize:15 }}>✏️ Indicaciones para iterar</div>
              <textarea
                style={{ ...sty.ta(false), minHeight:70, marginBottom:10 }}
                value={iterText}
                onChange={e => setIterText(e.target.value)}
                placeholder="Ej: Cambiar el fondo del hero a oscuro. Hacer el CTA más urgente. Quitar la sección de testimonios..."
              />
              <div style={{ display:"flex", gap:8 }}>
                <button style={sty.btn("warning")} onClick={() => { if (iterText.trim()) generate(iterText); }} disabled={!iterText.trim()}>🔁 Aplicar cambios</button>
                <button style={sty.btn("secondary")} onClick={() => generate()}>🔄 Regenerar todo</button>
              </div>
            </div>

            {/* Copy all */}
            <div style={{ background:"linear-gradient(135deg,#0f0820,#1a0f40)", border:`1px solid ${C.purple}44`, borderRadius:12, padding:20, marginBottom:16 }}>
              <div style={{ fontWeight:700, color:"#fff", marginBottom:8, fontSize:15 }}>📋 Copiar código completo para Top Funnels</div>
              <button style={{ ...sty.btn("success"), fontSize:15, padding:"12px 24px" }} onClick={() => {
                const all = sections.map(s => `/* ═══ ${s.name} ═══ */\n\n${s.html}\n\n/* CSS */\n${s.css}\n\n/* JS */\n${s.js}`).join("\n\n");
                cp(all, "final");
              }}>
                {copied === "final" ? "✅ ¡Copiado!" : "📋 Copiar todo el código"}
              </button>
              {copied === "final" && (
                <div style={{ ...sty.ok, marginTop:14, fontSize:13, lineHeight:1.9 }}>
                  <strong>Para llevar el código a Top Funnels:</strong><br/>
                  1. <strong>HTML</strong> de cada sección → Funnel → Sección → Código HTML personalizado<br/>
                  2. <strong>CSS</strong> → Funnel → Configuración → CSS Personalizado (una sola vez, unificado)<br/>
                  3. <strong>JS</strong> → Tracking Codes → Footer<br/>
                  4. Subí logo, imágenes y videos a Archivos de GHL y reemplazá los placeholders<br/>
                  5. Si hay calendario: insertá el widget nativo de GHL en la sección CALENDARIO_Y_CTA<br/>
                  6. Revisá en mobile antes de publicar (Chrome DevTools → Toggle device)
                </div>
              )}
            </div>

            {/* Checklist */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18 }}>
              <div style={{ fontWeight:700, color:"#fff", marginBottom:12, fontSize:15 }}>☑️ Checklist pre-entrega</div>
              {[
                "Dominio asociado en cada página del funnel",
                "Favicon y logo visibles",
                "Método de pago activo y probado (si aplica)",
                "Todos los botones tienen URL real",
                "Versión mobile revisada en dispositivo real",
                "SEO: title, description, social image completos",
                "Prueba del recorrido completo: lead → gracias",
                "Borrar métricas de testing antes de entregar al cliente",
              ].map((item, i) => (
                <label key={i} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8, cursor:"pointer", fontSize:13, color:C.muted }}>
                  <input type="checkbox" style={{ accentColor:C.purple, width:14, height:14 }}/>{item}
                </label>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
