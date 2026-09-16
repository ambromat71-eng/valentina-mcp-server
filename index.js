import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const mcpData = {
  modelli: [
    {
      id: "bmw-serie1-2025",
      marca: "BMW",
      modello: "Serie 1",
      anno: 2025,
      categoria: "Berlina compatta",
      descrizione: "Berlina sportiva premium con trazione anteriore",
      versioni: [
        {
          id: "116-90cv",
          nome: "116 (90 CV)",
          prezzo_base: 27680,
          motore: {
            tipo: "Benzina",
            cilindrata: "1.5 L",
            cilindri: 3,
            potenza_cv: 90,
            potenza_kw: 66,
            coppia_nm: 160
          },
          trasmissione: "Manuale 6 marce",
          trazione: "Anteriore",
          allestimenti: [
            { nome: "Base", prezzo_aggiuntivo: 0, dotazioni: ["Cerchi in lega 17\"", "Fari LED", "Climatizzatore automatico"] },
            { nome: "Sport", prezzo_aggiuntivo: 2500, dotazioni: ["Cerchi in lega 18\" M Sport", "Fari LED adattivi", "Sedili sportivi"] }
          ],
          optional: [
            { nome: "Tetto panoramico apribile", prezzo: 1200 },
            { nome: "Pack assistenza alla guida", prezzo: 850 },
            { nome: "Navigatore Professional", prezzo: 650 }
          ]
        }
      ],
      colori: [
        { nome: "Nero metallizzato", prezzo: 900 },
        { nome: "Bianco alpino", prezzo: 0 },
        { nome: "Blu Portimao", prezzo: 900 }
      ]
    },
    {
      id: "audi-a3-2025",
      marca: "Audi",
      modello: "A3 Sportback",
      anno: 2025,
      categoria: "Compatta premium",
      descrizione: "Compatta premium con tecnologia MMI",
      versioni: [
        {
          id: "a3-35tfsi-150cv",
          nome: "35 TFSI (150 CV)",
          prezzo_base: 35250,
          motore: {
            tipo: "Benzina mild-hybrid",
            cilindrata: "1.5 L TFSI",
            cilindri: 4,
            potenza_cv: 150,
            potenza_kw: 110,
            coppia_nm: 250
          },
          trasmissione: "Automatica S tronic 7 rapporti",
          trazione: "Anteriore",
          allestimenti: [
            { nome: "Business", prezzo_aggiuntivo: 0, dotazioni: ["Cerchi 17\"", "MMI Plus", "Virtual Cockpit", "LED"] },
            { nome: "S line", prezzo_aggiuntivo: 4900, dotazioni: ["Cerchi S line 19\"", "Matrix LED", "Sedili S sport"] }
          ],
          optional: [
            { nome: "Tetto panoramico", prezzo: 1250 },
            { nome: "Assist pack Tour", prezzo: 1350 },
            { nome: "Bang & Olufsen", prezzo: 980 }
          ]
        }
      ],
      colori: [
        { nome: "Nero Mythos", prezzo: 900 },
        { nome: "Bianco Ghiaccio", prezzo: 0 },
        { nome: "Grigio Daytona", prezzo: 900 }
      ]
    }
  ]
};

const mcpTools = [
  {
    name: "get_modelli_disponibili",
    description: "Restituisce i modelli BMW e Audi disponibili",
    inputSchema: {
      type: "object",
      properties: {
        marca: {
          type: "string",
          enum: ["BMW", "Audi", "Tutti"]
        }
      }
    }
  },
  {
    name: "get_versioni_modello",
    description: "Restituisce le versioni disponibili di un modello",
    inputSchema: {
      type: "object",
      properties: {
        modello_id: { type: "string" }
      },
      required: ["modello_id"]
    }
  },
  {
    name: "get_configurazione_completa",
    description: "Calcola il prezzo completo di una configurazione",
    inputSchema: {
      type: "object",
      properties: {
        modello_id: { type: "string" },
        versione_id: { type: "string" },
        allestimento_nome: { type: "string" },
        optional_nomi: {
          type: "array",
          items: { type: "string" }
        },
        colore_nome: { type: "string" }
      },
      required: ["modello_id", "versione_id"]
    }
  }
];

function executeTool(name, args = {}) {
  if (name === "get_modelli_disponibili") {
    return mcpData.modelli
      .filter(m => !args.marca || args.marca === "Tutti" || m.marca === args.marca)
      .map(m => ({
        id: m.id,
        marca: m.marca,
        modello: m.modello,
        anno: m.anno,
        categoria: m.categoria,
        descrizione: m.descrizione,
        num_versioni: m.versioni.length
      }));
  }

  if (name === "get_versioni_modello") {
    const modello = mcpData.modelli.find(m => m.id === args.modello_id);
    if (!modello) throw new Error("Modello non trovato");

    return modello.versioni.map(v => ({
      id: v.id,
      nome: v.nome,
      prezzo_base: v.prezzo_base,
      motore: v.motore,
      trasmissione: v.trasmissione,
      trazione: v.trazione
    }));
  }

  if (name === "get_configurazione_completa") {
    const modello = mcpData.modelli.find(m => m.id === args.modello_id);
    if (!modello) throw new Error("Modello non trovato");

    const versione = modello.versioni.find(v => v.id === args.versione_id);
    if (!versione) throw new Error("Versione non trovata");

    let prezzo = versione.prezzo_base;
    const dettagli = {
      prezzo_base: versione.prezzo_base,
      allestimento: null,
      optional: [],
      colore: null
    };

    if (args.allestimento_nome) {
      const allestimento = versione.allestimenti.find(
        a => a.nome === args.allestimento_nome
      );

      if (allestimento) {
        prezzo += allestimento.prezzo_aggiuntivo;
        dettagli.allestimento = allestimento;
      }
    }

    if (Array.isArray(args.optional_nomi)) {
      for (const nome of args.optional_nomi) {
        const optional = versione.optional.find(o => o.nome === nome);
        if (optional) {
          prezzo += optional.prezzo;
          dettagli.optional.push(optional);
        }
      }
    }

    if (args.colore_nome) {
      const colore = modello.colori.find(c => c.nome === args.colore_nome);
      if (colore) {
        prezzo += colore.prezzo;
        dettagli.colore = colore;
      }
    }

    return {
      modello: `${modello.marca} ${modello.modello}`,
      versione: versione.nome,
      dettagli,
      prezzo_totale: prezzo,
      prezzo_totale_ivato: Math.round(prezzo * 1.22)
    };
  }

  throw new Error(`Tool ${name} non implementato`);
}

function jsonRpcError(res, id, code, message) {
  return res.status(400).json({
    jsonrpc: "2.0",
    id,
    error: { code, message }
  });
}

/*
 * MCP standard Streamable HTTP
 */
app.post("/mcp", (req, res) => {
  const { jsonrpc = "2.0", id, method, params = {} } = req.body || {};

  if (!Object.prototype.hasOwnProperty.call(req.body || {}, "id")) {
    if (
      method === "notifications/initialized" ||
      method === "notifications/cancelled"
    ) {
      return res.status(202).end();
    }
  }

  try {
    if (method === "initialize") {
      return res.json({
        jsonrpc,
        id,
        result: {
          protocolVersion: params.protocolVersion || "2025-03-26",
          capabilities: {
            tools: {}
          },
          serverInfo: {
            name: "valentina-mcp-server",
            version: "1.0.0"
          },
          instructions: "Server MCP per consulenza BMW e Audi"
        }
      });
    }

    if (method === "ping") {
      return res.json({
        jsonrpc,
        id,
        result: {}
      });
    }

    if (method === "tools/list") {
      return res.json({
        jsonrpc,
        id,
        result: {
          tools: mcpTools
        }
      });
    }

    if (method === "tools/call") {
      const result = executeTool(params.name, params.arguments || {});

      return res.json({
        jsonrpc,
        id,
        result: {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2)
            }
          ]
        }
      });
    }

    return jsonRpcError(res, id, -32601, `Method not found: ${method}`);
  } catch (error) {
    return jsonRpcError(res, id, -32603, error.message);
  }
});

app.get("/mcp", (req, res) => {
  res
    .status(405)
    .set("Allow", "POST")
    .json({ error: "Use POST /mcp" });
});

/*
 * SSE legacy
 */
app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.write(`data: ${JSON.stringify({
    jsonrpc: "2.0",
    method: "notifications/initialized"
  })}\n\n`);

  req.on("close", () => res.end());
});

app.post("/sse", (req, res) => {
  const { id, method, params = {} } = req.body || {};

  try {
    if (method === "tools/list") {
      return res.json({
        jsonrpc: "2.0",
        id: id || 1,
        result: { tools: mcpTools }
      });
    }

    if (method === "tools/call") {
      const result = executeTool(params.name, params.arguments || {});
      return res.json({
        jsonrpc: "2.0",
        id: id || 1,
        result: {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2)
            }
          ]
        }
      });
    }

    return jsonRpcError(res, id || 1, -32601, `Method not found: ${method}`);
  } catch (error) {
    return jsonRpcError(res, id || 1, -32603, error.message);
  }
});

app.get("/", (req, res) => {
  res.json({
    name: "Valentina MCP Server",
    version: "1.0.0",
    protocol: "MCP Streamable HTTP + SSE",
    endpoints: ["/mcp", "/sse", "/health"],
    tools_count: mcpTools.length,
    modelli_count: mcpData.modelli.length,
    status: "online"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Valentina MCP Server in ascolto sulla porta ${PORT}`);
});
