import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ========================================
// DATABASE COMPLETO BMW + AUDI
// ========================================

const mcpData = {
  modelli: [
    // ============ BMW ============
    {
      id: "bmw-serie1-2025",
      marca: "BMW",
      modello: "Serie 1",
      anno: 2025,
      categoria: "Berlina compatta",
      descrizione: "Berlina sportiva premium con trazione anteriore",
      immagine: "https://www.bmw.it/content/dam/bmw/marketIT/bmw_it/images/serie-1/2023/serie-1-5-porte.jpg",
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
        },
        {
          id: "118i-140cv",
          nome: "118i (140 CV)",
          prezzo_base: 30139,
          motore: {
            tipo: "Benzina",
            cilindrata: "1.5 L Turbo",
            cilindri: 3,
            potenza_cv: 140,
            potenza_kw: 103,
            coppia_nm: 220,
            alimentazione: "Turbo + iniezione diretta"
          },
          prestazioni: {
            velocita_max_kmh: 210,
            accelerazione_0_100_kmh: 8.5,
            consumo_medio_l100km: 5.4,
            emissioni_co2_g_km: 123
          },
          trasmissione: "Automatica 7 rapporti DCT",
          trazione: "Anteriore",
          allestimenti: [
            {
              nome: "Base",
              prezzo_aggiuntivo: 0,
              dotazioni: [
                "Cerchi in lega 17\"",
                "Fari LED",
                "Climatizzatore automatico bi-zona",
                "iDrive 8.5\" touchscreen",
                "Sensori parcheggio anteriori/posteriori"
              ]
            },
            {
              nome: "M Sport",
              prezzo_aggiuntivo: 4800,
              dotazioni: [
                "Cerchi M Sport 19\"",
                "Pacchetto estetico M Sport completo",
                "Sedili M Sport",
                "Strumentazione digitale 10.25\"",
                "Impianto audio Harman Kardon"
              ]
            }
          ],
          optional: [
            { nome: "Tetto panoramico apribile", prezzo: 1200 },
            { nome: "Pack Driving Assistant Professional", prezzo: 1450 },
            { nome: "Head-Up Display", prezzo: 980 }
          ]
        }
      ],
      colori: [
        { nome: "Nero metallizzato", codice: "Black Sapphire", prezzo: 900 },
        { nome: "Bianco alpino", codice: "Alpine White", prezzo: 0 },
        { nome: "Blu Portimao", codice: "Portimao Blue", prezzo: 900 },
        { nome: "Grigio Brooklyn", codice: "Brooklyn Grey", prezzo: 900 },
        { nome: "Rosso Melbourne", codice: "Melbourne Red", prezzo: 900 }
      ]
    },

    {
      id: "bmw-serie3-2025",
      marca: "BMW",
      modello: "Serie 3",
      anno: 2025,
      categoria: "Berlina media",
      descrizione: "Berlina sportiva di riferimento con tecnologia all'avanguardia",
      versioni: [
        {
          id: "320i-184cv",
          nome: "320i (184 CV)",
          prezzo_base: 45200,
          motore: {
            tipo: "Benzina",
            cilindrata: "2.0 L Turbo",
            cilindri: 4,
            potenza_cv: 184,
            potenza_kw: 135,
            coppia_nm: 300
          },
          prestazioni: {
            velocita_max_kmh: 235,
            accelerazione_0_100_kmh: 7.1,
            consumo_medio_l100km: 5.8,
            emissioni_co2_g_km: 132
          },
          trasmissione: "Automatica 8 rapporti Steptronic",
          trazione: "Posteriore",
          allestimenti: [
            {
              nome: "Business",
              prezzo_aggiuntivo: 0,
              dotazioni: ["Cerchi 17\"", "LED", "Navigatore", "Sensori parcheggio"]
            },
            {
              nome: "M Sport",
              prezzo_aggiuntivo: 5500,
              dotazioni: ["Cerchi M 19\"", "Assetto M", "Sedili sport", "Strumentazione digitale"]
            }
          ],
          optional: [
            { nome: "Tetto panoramico", prezzo: 1400 },
            { nome: "Driving Assistant Pro", prezzo: 1800 },
            { nome: "Harman Kardon", prezzo: 850 }
          ]
        }
      ],
      colori: [
        { nome: "Nero zaffiro", prezzo: 900 },
        { nome: "Bianco minerale", prezzo: 0 },
        { nome: "Blu San Marino", prezzo: 900 }
      ]
    },

    // ============ AUDI ============
    {
      id: "audi-a1-2025",
      marca: "Audi",
      modello: "A1 Sportback",
      anno: 2025,
      categoria: "Citycar premium",
      descrizione: "Citycar compatta con design sportivo e tecnologia Audi",
      versioni: [
        {
          id: "a1-30tfsi-110cv",
          nome: "30 TFSI (110 CV)",
          prezzo_base: 26500,
          motore: {
            tipo: "Benzina",
            cilindrata: "1.0 L TFSI",
            cilindri: 3,
            potenza_cv: 110,
            potenza_kw: 81,
            coppia_nm: 200
          },
          prestazioni: {
            velocita_max_kmh: 200,
            accelerazione_0_100_kmh: 9.9,
            consumo_medio_l100km: 5.1,
            emissioni_co2_g_km: 115
          },
          trasmissione: "Manuale 6 marce",
          trazione: "Anteriore",
          allestimenti: [
            {
              nome: "Admired",
              prezzo_aggiuntivo: 0,
              dotazioni: ["Cerchi 16\"", "LED", "MMI Radio", "Climatizzatore"]
            },
            {
              nome: "S line",
              prezzo_aggiuntivo: 3200,
              dotazioni: ["Cerchi S line 18\"", "Sedili S line", "Virtual Cockpit", "MMI Plus"]
            }
          ],
          optional: [
            { nome: "Tetto panoramico", prezzo: 1100 },
            { nome: "Audi Sound System", prezzo: 650 }
          ]
        }
      ],
      colori: [
        { nome: "Nero mythos", prezzo: 800 },
        { nome: "Bianco ghiaccio", prezzo: 0 },
        { nome: "Rosso Tango", prezzo: 800 }
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
        },
        {
          id: "a3-40tfsi-190cv",
          nome: "40 TFSI (190 CV)",
          prezzo_base: 40250,
          motore: {
            tipo: "Benzina mild-hybrid",
            cilindrata: "2.0 L TFSI",
            cilindri: 4,
            potenza_cv: 190,
            potenza_kw: 140,
            coppia_nm: 320
          },
          prestazioni: {
            velocita_max_kmh: 240,
            accelerazione_0_100_kmh: 6.9,
            consumo_medio_l100km: 5.8,
            emissioni_co2_g_km: 132
          },
          trasmissione: "Automatica S tronic 7 rapporti",
          trazione: "Anteriore",
          allestimenti: [
            {
              nome: "Business Advanced",
              prezzo_aggiuntivo: 0,
              dotazioni: ["Cerchi 18\"", "MMI Navigation Plus", "Virtual Cockpit Plus", "Matrix LED"]
            },
            {
              nome: "S line",
              prezzo_aggiuntivo: 5400,
              dotazioni: ["Cerchi S line 19\"", "Assetto sportivo", "Sedili S sport", "Fari LED dinamici"]
            }
          ],
          optional: [
            { nome: "Tetto panoramico", prezzo: 1250 },
            { nome: "Assist pack Tour", prezzo: 1350 },
            { nome: "Bang & Olufsen Premium", prezzo: 1200 }
          ]
        },
        {
          id: "a3-45tfsi-245cv",
          nome: "45 TFSI e (245 CV) Plug-in Hybrid",
          prezzo_base: 53400,
          motore: {
            tipo: "Ibrido plug-in (benzina + elettrico)",
            cilindrata: "1.4 L TFSI + motore elettrico",
            cilindri: 4,
            potenza_cv: 245,
            potenza_kw: 180,
            coppia_nm: 400,
            autonomia_elettrica_km: 78
          },
          prestazioni: {
            velocita_max_kmh: 227,
            accelerazione_0_100_kmh: 6.8,
            consumo_medio_l100km: 1.3,
            emissioni_co2_g_km: 29
          },
          trasmissione: "Automatica S tronic 6 rapporti",
          trazione: "Anteriore",
          allestimenti: [
            {
              nome: "Business Advanced",
              prezzo_aggiuntivo: 0,
              dotazioni: ["Cerchi 18\"", "MMI Navigation Plus", "Virtual Cockpit Plus", "Matrix LED", "Caricatore 3.6 kW"]
            },
            {
              nome: "S line",
              prezzo_aggiuntivo: 5600,
              dotazioni: ["Cerchi S line 19\"", "Assetto sportivo", "Sedili S sport", "Caricatore rapido 7.2 kW"]
            }
          ],
          optional: [
            { nome: "Tetto panoramico", prezzo: 1250 },
            { nome: "Assist pack Tour", prezzo: 1350 },
            { nome: "Bang & Olufsen Premium", prezzo: 1200 },
            { nome: "Wallbox domestica", prezzo: 850 }
          ]
        }
      ],
      colori: [
        { nome: "Nero Mythos", prezzo: 900 },
        { nome: "Bianco Ghiaccio", prezzo: 0 },
        { nome: "Grigio Daytona", prezzo: 900 },
        { nome: "Blu Navarra", prezzo: 900 }
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
    },
    {
      id: "promo-audi-a3-35tfsi",
      modello_id: "audi-a3-2025",
      versione_id: "a3-35tfsi-150cv",
      titolo: "Promozione Audi A3 35 TFSI",
      descrizione: "Anticipo zero + TAN 2.99% + 2 anni manutenzione inclusa",
      sconto_euro: 0,
      tan_finanziamento: 2.99,
      extra: "2 anni manutenzione inclusa",
      validita_fino: "2025-04-15"
    }
  ]
};

// ========================================
// MCP TOOLS (12 STRUMENTI)
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
  },
  {
    name: "get_optional_disponibili",
    description: "Elenca tutti gli optional disponibili per una versione specifica con prezzi",
    inputSchema: {
      type: "object",
      properties: {
        modello_id: { type: "string" },
        versione_id: { type: "string" }
      },
      required: ["modello_id", "versione_id"]
    }
  },
  {
    name: "get_colori_disponibili",
    description: "Mostra la gamma completa di colori disponibili per un modello con eventuali sovrapprezzo",
    inputSchema: {
      type: "object",
      properties: {
        modello_id: { type: "string" }
      },
      required: ["modello_id"]
    }
  },
  {
    name: "get_dati_tecnici",
    description: "Fornisce dati tecnici dettagliati di una versione: motore, prestazioni, consumi, emissioni",
    inputSchema: {
      type: "object",
      properties: {
        modello_id: { type: "string" },
        versione_id: { type: "string" }
      },
      required: ["modello_id", "versione_id"]
    }
  },
  {
    name: "confronta_modelli",
    description: "Confronta le caratteristiche tecniche e i prezzi di due o più versioni diverse",
    inputSchema: {
      type: "object",
      properties: {
        confronti: {
          type: "array",
          items: {
            type: "object",
            properties: {
              modello_id: { type: "string" },
              versione_id: { type: "string" }
            }
          },
          minItems: 2
        }
      },
      required: ["confronti"]
    }
  },
  {
    name: "calcola_finanziamento",
    description: "Calcola rata mensile del finanziamento dato prezzo totale, anticipo, durata e TAN",
    inputSchema: {
      type: "object",
      properties: {
        prezzo_totale: { type: "number" },
        anticipo: { type: "number" },
        durata_mesi: { type: "number" },
        tan: { type: "number" }
      },
      required: ["prezzo_totale", "durata_mesi", "tan"]
    }
  },
  {
    name: "get_allestimenti",
    description: "Elenca tutti gli allestimenti disponibili per una versione con dotazioni e prezzi",
    inputSchema: {
      type: "object",
      properties: {
        modello_id: { type: "string" },
        versione_id: { type: "string" }
      },
      required: ["modello_id", "versione_id"]
    }
  },
  {
    name: "get_campagne_attive",
    description: "Mostra tutte le promozioni e campagne commerciali attualmente attive",
    inputSchema: {
      type: "object",
      properties: {
        modello_id: {
          type: "string",
          description: "Filtra per modello specifico (opzionale)"
        }
      }
    }
  },
  {
    name: "cerca_per_budget",
    description: "Trova tutti i modelli e versioni disponibili entro un budget massimo specificato",
    inputSchema: {
      type: "object",
      properties: {
        budget_max: {
          type: "number",
          description: "Budget massimo in euro"
        },
        marca: {
          type: "string",
          enum: ["BMW", "Audi", "Tutti"],
          description: "Filtra per marca"
        }
      },
      required: ["budget_max"]
    }
  },
  {
    name: "get_optional_serie",
    description: "Mostra quali optional sono inclusi di serie in un allestimento specifico",
    inputSchema: {
      type: "object",
      properties: {
        modello_id: { type: "string" },
        versione_id: { type: "string" },
        allestimento_nome: { type: "string" }
      },
      required: ["modello_id", "versione_id", "allestimento_nome"]
    }
  }
];

// ========================================
// ENDPOINTS MCP
// ========================================

// Endpoint principale MCP
app.get('/', (req, res) => {
  res.json({
    name: "Valentina MCP Server",
    version: "1.0.0",
    description: "Server MCP per consulenza BMW e Audi - Database completo con prezzi, versioni e configurazioni",
    tools_count: mcpTools.length,
    modelli_count: mcpData.modelli.length,
    status: "online"
  });
});

// Lista tutti i tool MCP disponibili
app.get('/tools', (req, res) => {
  res.json({
    tools: mcpTools
  });
});

// Esegue un tool specifico
app.post('/tools/:toolName', (req, res) => {
  const { toolName } = req.params;
  const params = req.body;

  try {
    let result;

    switch (toolName) {
      case 'get_modelli_disponibili':
        result = mcpData.modelli
          .filter(m => !params.marca || params.marca === "Tutti" || m.marca === params.marca)
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
        const modello = mcpData.modelli.find(m => m.id === params.modello_id);
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
        const mod = mcpData.modelli.find(m => m.id === params.modello_id);
        if (!mod) throw new Error("Modello non trovato");
        const ver = mod.versioni.find(v => v.id === params.versione_id);
        if (!ver) throw new Error("Versione non trovata");

        let prezzoTotale = ver.prezzo_base;
        let dettagli = {
          prezzo_base: ver.prezzo_base,
          allestimento: null,
          optional: [],
          colore: null
        };

        if (params.allestimento_nome) {
          const all = ver.allestimenti.find(a => a.nome === params.allestimento_nome);
          if (all) {
            prezzoTotale += all.prezzo_aggiuntivo;
            dettagli.allestimento = {
              nome: all.nome,
              prezzo: all.prezzo_aggiuntivo,
              dotazioni: all.dotazioni
            };
          }
        }

        if (params.optional_nomi && Array.isArray(params.optional_nomi)) {
          params.optional_nomi.forEach(optNome => {
            const opt = ver.optional.find(o => o.nome === optNome);
            if (opt) {
              prezzoTotale += opt.prezzo;
              dettagli.optional.push({ nome: opt.nome, prezzo: opt.prezzo });
            }
          });
        }

        if (params.colore_nome) {
          const col = mod.colori.find(c => c.nome === params.colore_nome);
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

      case 'get_optional_disponibili':
        const m1 = mcpData.modelli.find(m => m.id === params.modello_id);
        if (!m1) throw new Error("Modello non trovato");
        const v1 = m1.versioni.find(v => v.id === params.versione_id);
        if (!v1) throw new Error("Versione non trovata");
        result = v1.optional;
        break;

      case 'get_colori_disponibili':
        const m2 = mcpData.modelli.find(m => m.id === params.modello_id);
        if (!m2) throw new Error("Modello non trovato");
        result = m2.colori;
        break;

      case 'get_dati_tecnici':
        const m3 = mcpData.modelli.find(m => m.id === params.modello_id);
        if (!m3) throw new Error("Modello non trovato");
        const v3 = m3.versioni.find(v => v.id === params.versione_id);
        if (!v3) throw new Error("Versione non trovata");
        result = {
          modello: `${m3.marca} ${m3.modello}`,
          versione: v3.nome,
          motore: v3.motore,
          prestazioni: v3.prestazioni,
          trasmissione: v3.trasmissione,
          trazione: v3.trazione
        };
        break;

      case 'calcola_finanziamento':
        const importo = params.prezzo_totale - (params.anticipo || 0);
        const taseMensile = (params.tan / 100) / 12;
        const rata = taseMensile > 0
          ? (importo * taseMensile * Math.pow(1 + taseMensile, params.durata_mesi)) /
            (Math.pow(1 + taseMensile, params.durata_mesi) - 1)
          : importo / params.durata_mesi;
        result = {
          prezzo_totale: params.prezzo_totale,
          anticipo: params.anticipo || 0,
          importo_finanziato: importo,
          durata_mesi: params.durata_mesi,
          tan: params.tan,
          rata_mensile: Math.round(rata * 100) / 100,
          totale_da_pagare: Math.round((rata * params.durata_mesi + (params.anticipo || 0)) * 100) / 100
        };
        break;

      case 'get_campagne_attive':
        result = mcpData.campagne.filter(c =>
          !params.modello_id || c.modello_id === params.modello_id
        );
        break;

      case 'cerca_per_budget':
        result = [];
        mcpData.modelli.forEach(m => {
          if (params.marca && params.marca !== "Tutti" && m.marca !== params.marca) return;
          m.versioni.forEach(v => {
            if (v.prezzo_base <= params.budget_max) {
              result.push({
                modello: `${m.marca} ${m.modello}`,
                versione: v.nome,
                prezzo_base: v.prezzo_base,
                potenza_cv: v.motore.potenza_cv,
                tipo_motore: v.motore.tipo
              });
            }
          });
        });
        break;

      default:
        throw new Error(`Tool ${toolName} non implementato`);
    }

    res.json({
      success: true,
      tool: toolName,
      result: result
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Avvio server
app.listen(PORT, () => {
  console.log(`✅ Valentina MCP Server in ascolto sulla porta ${PORT}`);
  console.log(`📊 Database: ${mcpData.modelli.length} modelli, ${mcpTools.length} tool MCP`);
  console.log(`🌍 Server pronto per Railway deployment`);
});
