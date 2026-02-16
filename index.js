import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ========================================
// DATABASE COMPLETO BMW + AUDI (invariato)
// ========================================

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
            coppia_nm: 160,
            alimentazione: "Iniezione diretta"
          },
          prestazioni: {
            velocita_max_kmh: 195,
            accelerazione_0_100_kmh: 10.9,
            consumo_medio_l100km: 5.2,
            emissioni_co2_g_km: 118
          },
          trasmissione: "Manuale 6 marce",
          trazione: "Anteriore",
          allestimenti: [
            {
              nome: "Base",
              prezzo_aggiuntivo: 0,
              dotazioni: [
                "Cerchi in lega 17\"",
                "Fari LED",
                "Climatizzatore automatico",
                "Sistema multimediale BMW iDrive",
                "Sensori parcheggio posteriori"
              ]
            },
            {
              nome: "Sport",
              prezzo_aggiuntivo: 2500,
              dotazioni: [
                "Cerchi in lega 18\" M Sport",
                "Fari LED adattivi",
                "Climatizzatore bi-zona",
                "Sedili sportivi",
                "Volante M Sport",
                "Assetto sportivo"
              ]
            }
          ],
          optional: [
            { nome: "Tetto panoramico apribile", prezzo: 1200 },
            { nome: "Pack assistenza alla guida", prezzo: 850 },
            { nome: "Navigatore Professional", prezzo: 650 }
          ]
        }
      ],
      colori: [
        { nome: "Nero metallizzato", codice: "Black Sapphire", prezzo: 900 },
        { nome: "Bianco alpino", codice: "Alpine White", prezzo: 0 },
        { nome: "Blu Portimao", codice: "Portimao Blue", prezzo: 900 }
      ]
    },
    {
      id: "audi-a3-2025",
      marca: "Audi",
      modello: "A3 Sportback",
      anno: 2025,
      categoria: "Compatta premium",
      descrizione: "Compatta premium con design elegante e tecnologia MMI",
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
          prestazioni: {
            velocita_max_kmh: 220,
            accelerazione_0_100_kmh: 8.4,
            consumo_medio_l100km: 5.3,
            emissioni_co2_g_km: 120
          },
          trasmissione: "Automatica S tronic 7 rapporti",
          trazione: "Anteriore",
          allestimenti: [
            {
              nome: "Business",
              prezzo_aggiuntivo: 0,
              dotazioni: ["Cerchi 17\"", "MMI Plus", "Virtual Cockpit", "LED"]
            },
            {
              nome: "S line",
              prezzo_aggiuntivo: 4900,
              dotazioni: ["Cerchi S line 19\"", "Matrix LED", "Sedili S sport", "Sospensioni sport"]
            }
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
  ],
  campagne: [
    {
      id: "promo-bmw-118i",
      modello_id: "bmw-serie1-2025",
      versione_id: "118i-140cv",
      titolo: "Promozione BMW Serie 1 118i",
      descrizione: "Sconto di €2.500 + finanziamento TAN 3.99%",
      sconto_euro: 2500,
      tan_finanziamento: 3.99,
      validita_fino: "2025-03-31"
    }
  ]
};

// ========================================
// MCP TOOLS DEFINITIONS
// ========================================

const mcpTools = [
  {
    name: "get_modelli_disponibili",
    description: "Restituisce l'elenco completo di tutti i modelli BMW e Audi disponibili con informazioni di base",
    inputSchema: {
      type: "object",
      properties: {
        marca: {
          type: "string",
          enum: ["BMW", "Audi", "Tutti"],
          description: "Filtra per marca specifica o visualizza tutti"
        }
      }
    }
  },
  {
    name: "get_versioni_modello",
    description: "Restituisce tutte le versioni disponibili per un modello specifico con prezzi e caratteristiche motore",
    inputSchema: {
      type: "object",
      properties: {
        modello_id: {
          type: "string",
          description: "ID del modello (es: bmw-serie1-2025, audi-a3-2025)"
        }
      },
      required: ["modello_id"]
    }
  },
  {
    name: "get_configurazione_completa",
    description: "Calcola il prezzo totale di una configurazione completa includendo versione, allestimento, optional e colore",
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

// ========================================
// TOOL EXECUTION LOGIC
// ========================================

function executeTool(toolName, toolParams) {
  let result;

  switch (toolName) {
    case 'get_modelli_disponibili':
      result = mcpData.modelli
        .filter(m => !toolParams.marca || toolParams.marca === "Tutti" || m.marca === toolParams.marca)
        .map(m => ({
          id: m.id,
          marca: m.marca,
          modello: m.modello,
          anno: m.anno,
          categoria: m.categoria,
          descrizione: m.descrizione,
          num_versioni: m.versioni.length
        }));
      break;

    case 'get_versioni_modello':
      const modello = mcpData.modelli.find(m => m.id === toolParams.modello_id);
      if (!modello) throw new Error("Modello non trovato");
      result = modello.versioni.map(v => ({
        id: v.id,
        nome: v.nome,
        prezzo_base: v.prezzo_base,
        motore: v.motore,
        trasmissione: v.trasmissione,
        trazione: v.trazione
      }));
      break;

    case 'get_configurazione_completa':
      const mod = mcpData.modelli.find(m => m.id === toolParams.modello_id);
      if (!mod) throw new Error("Modello non trovato");
      const ver = mod.versioni.find(v => v.id === toolParams.versione_id);
      if (!ver) throw new Error("Versione non trovata");

      let prezzoTotale = ver.prezzo_base;
      let dettagli = {
        prezzo_base: ver.prezzo_base,
        allestimento: null,
        optional: [],
        colore: null
      };

      if (toolParams.allestimento_nome) {
        const all = ver.allestimenti.find(a => a.nome === toolParams.allestimento_nome);
        if (all) {
          prezzoTotale += all.prezzo_aggiuntivo;
          dettagli.allestimento = {
            nome: all.nome,
            prezzo: all.prezzo_aggiuntivo,
            dotazioni: all.dotazioni
          };
        }
      }

      if (toolParams.optional_nomi && Array.isArray(toolParams.optional_nomi)) {
        toolParams.optional_nomi.forEach(optNome => {
          const opt = ver.optional.find(o => o.nome === optNome);
          if (opt) {
            prezzoTotale += opt.prezzo;
            dettagli.optional.push({ nome: opt.nome, prezzo: opt.prezzo });
          }
        });
      }

      if (toolParams.colore_nome) {
        const col = mod.colori.find(c => c.nome === toolParams.colore_nome);
        if (col) {
          prezzoTotale += col.prezzo;
          dettagli.colore = { nome: col.nome, prezzo: col.prezzo };
        }
      }

      result = {
        modello: `${mod.marca} ${mod.modello}`,
        versione: ver.nome,
        dettagli: dettagli,
        prezzo_totale_ivato: Math.round(prezzoTotale * 1.22),
        prezzo_totale: prezzoTotale
      };
      break;

    default:
      throw new Error(`Tool ${toolName} non implementato`);
  }

  return result;
}

// ========================================
// SSE ENDPOINT (per n8n MCP Client)
// ========================================

app.get('/sse', (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Send initial connection message
  res.write(`data: ${JSON.stringify({
    jsonrpc: "2.0",
    method: "notifications/initialized"
  })}\n\n`);

  // Handle client disconnect
  req.on('close', () => {
    res.end();
  });
});

// POST endpoint for SSE messages
app.post('/sse', (req, res) => {
  const { method, params, id } = req.body;

  try {
    if (method === 'tools/list') {
      res.json({
        jsonrpc: "2.0",
        id: id || 1,
        result: {
          tools: mcpTools
        }
      });
    } else if (method === 'tools/call') {
      const toolName = params?.name;
      const toolParams = params?.arguments || {};
      
      const result = executeTool(toolName, toolParams);

      res.json({
        jsonrpc: "2.0",
        id: id || 1,
        result: {
          content: [{
            type: "text",
            text: JSON.stringify(result, null, 2)
          }]
        }
      });
    } else {
      res.status(400).json({
        jsonrpc: "2.0",
        id: id || 1,
        error: {
          code: -32601,
          message: `Method not found: ${method}`
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      jsonrpc: "2.0",
      id: req.body.id || 1,
      error: {
        code: -32603,
        message: error.message
      }
    });
  }
});

// ========================================
// STANDARD MCP ENDPOINTS (compatibilità)
// ========================================

app.get('/', (req, res) => {
  res.json({
    name: "Valentina MCP Server",
    version: "1.0.0",
    description: "Server MCP per consulenza BMW e Audi - Database completo",
    protocol: "MCP v1.0 + SSE",
    endpoints: {
      sse: "/sse (GET per stream, POST per messaggi)",
      tools_list: "/mcp/v1/tools/list",
      tools_call: "/mcp/v1/tools/call"
    },
    tools_count: mcpTools.length,
    modelli_count: mcpData.modelli.length,
    status: "online"
  });
});

app.get('/mcp/v1/tools/list', (req, res) => {
  res.json({
    jsonrpc: "2.0",
    id: req.query.id || 1,
    result: {
      tools: mcpTools
    }
  });
});

app.post('/mcp/v1/tools/list', (req, res) => {
  res.json({
    jsonrpc: "2.0",
    id: req.body.id || 1,
    result: {
      tools: mcpTools
    }
  });
});

app.post('/mcp/v1/tools/call', (req, res) => {
  const { method, params, id } = req.body;
  const toolName = params?.name || method;
  const toolParams = params?.arguments || params || {};

  try {
    const result = executeTool(toolName, toolParams);

    res.json({
      jsonrpc: "2.0",
      id: id || 1,
      result: {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      }
    });
  } catch (error) {
    res.status(400).json({
      jsonrpc: "2.0",
      id: id || 1,
      error: {
        code: -32603,
        message: error.message
      }
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Avvio server
app.listen(PORT, () => {
  console.log(`✅ Valentina MCP Server in ascolto sulla porta ${PORT}`);
  console.log(`📊 Database: ${mcpData.modelli.length} modelli, ${mcpTools.length} tool MCP`);
  console.log(`🌍 Endpoint SSE: /sse`);
  console.log(`🔧 Server pronto - Protocollo MCP v1.0 + SSE`);
});
