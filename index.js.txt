// ============================================
// VALENTINA MCP SERVER - FILE COMPLETO
// Copia questo file su GitHub come "index.js"
// ============================================

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ============================================
// DATABASE COMPLETO BMW + AUDI
// ============================================

const mcpData = {
  bmw: {
    "Serie 1": {
      anno: 2025,
      versioni: [
        {
          nome: "116 (90 CV)",
          prezzo_base: 27680,
          motorizzazione: "1.5 L 3 cilindri benzina",
          potenza: "90 CV (66 kW)",
          consumi: "5.2 l/100km",
          co2: "118 g/km",
          velocita_max: "195 km/h",
          accelerazione_0_100: "10.9 s",
          cambio: "Manuale 6 marce",
          trazione: "Anteriore",
          allestimenti: [
            { nome: "Base", prezzo_aggiuntivo: 0, optional_serie: ["Cerchi 17\"", "LED", "Clima"] },
            { nome: "Sport", prezzo_aggiuntivo: 2500, optional_serie: ["Cerchi 18\"", "LED+", "Clima bi-zona", "Sedili sport"] }
          ],
          optional_extra: [
            { nome: "Tetto panoramico", prezzo: 1200 },
            { nome: "Pack Assistenza", prezzo: 850 },
            { nome: "Navigatore", prezzo: 650 }
          ],
          colori_disponibili: [
            { nome: "Nero metallizzato", prezzo: 900 },
            { nome: "Bianco alpino", prezzo: 0 },
            { nome: "Blu Portimao", prezzo: 900 }
          ]
        },
        {
          nome: "120 (125 CV)",
          prezzo_base: 30139,
          motorizzazione: "1.5 L 3 cilindri benzina",
          potenza: "125 CV (92 kW)",
          consumi: "5.4 l/100km",
          co2: "123 g/km",
          velocita_max: "210 km/h",
          accelerazione_0_100: "9.2 s",
          cambio: "Automatico 7 marce",
          trazione: "Anteriore",
          allestimenti: [
            { nome: "Base", prezzo_aggiuntivo: 0, optional_serie: ["Cerchi 17\"", "LED", "Clima bi-zona"] },
            { nome: "Sport", prezzo_aggiuntivo: 2500, optional_serie: ["Cerchi 18\"", "LED+", "Sedili sport", "Volante sport"] },
            { nome: "M Sport", prezzo_aggiuntivo: 4800, optional_serie: ["Cerchi 19\"", "M kit estetico", "Sedili M", "Sospensioni M"] }
          ],
          optional_extra: [
            { nome: "Tetto panoramico", prezzo: 1200 },
            { nome: "Pack Assistenza Pro", prezzo: 1450 },
            { nome: "Navigatore Professional", prezzo: 1250 },
            { nome: "Impianto audio Harman Kardon", prezzo: 890 }
          ],
          colori_disponibili: [
            { nome: "Nero metallizzato", prezzo: 900 },
            { nome: "Bianco alpino", prezzo: 0 },
            { nome: "Blu Portimao", prezzo: 900 },
            { nome: "Rosso Melbourne", prezzo: 1100 },
            { nome: "Grigio Brooklyn", prezzo: 900 }
          ]
        }
      ]
    },
    "Serie 3": {
      anno: 2024,
      versioni: [
        {
          nome: "320i",
          prezzo_base: 42800,
          motorizzazione: "2.0 L 4 cilindri benzina",
          potenza: "184 CV (135 kW)",
          consumi: "6.2 l/100km",
          co2: "141 g/km",
          velocita_max: "235 km/h",
          accelerazione_0_100: "7.1 s",
          cambio: "Automatico 8 marce",
          trazione: "Posteriore",
          allestimenti: [
            { nome: "Base", prezzo_aggiuntivo: 0, optional_serie: ["Cerchi 17\"", "LED", "Clima tri-zona"] },
            { nome: "M Sport", prezzo_aggiuntivo: 6500, optional_serie: ["Cerchi 19\"", "M kit", "Sedili M", "Sospensioni adaptive"] }
          ],
          optional_extra: [
            { nome: "Tetto panoramico", prezzo: 1500 },
            { nome: "Harman Kardon", prezzo: 950 }
          ],
          colori_disponibili: [
            { nome: "Nero Black Sapphire", prezzo: 900 },
            { nome: "Bianco Mineral White", prezzo: 0 }
          ]
        }
      ]
    }
  },
  audi: {
    "A3": {
      anno: 2025,
      versioni: [
        {
          nome: "35 TFSI",
          prezzo_base: 40250,
          motorizzazione: "1.5 L 4 cilindri benzina mild hybrid",
          potenza: "150 CV (110 kW)",
          consumi: "5.5 l/100km",
          co2: "125 g/km",
          velocita_max: "220 km/h",
          accelerazione_0_100: "8.4 s",
          cambio: "Automatico DSG 7 marce",
          trazione: "Anteriore",
          allestimenti: [
            { nome: "Base", prezzo_aggiuntivo: 0, optional_serie: ["Cerchi 17\"", "LED", "MMI", "Clima bi-zona"] },
            { nome: "S line", prezzo_aggiuntivo: 5600, optional_serie: ["Cerchi 19\"", "Kit S line", "Sedili S", "Matrix LED"] }
          ],
          optional_extra: [
            { nome: "Vernice metallizzata", prezzo: 900 },
            { nome: "Navigatore MMI Plus", prezzo: 1200 },
            { nome: "Tetto panoramico", prezzo: 1300 }
          ],
          colori_disponibili: [
            { nome: "Nero Mythos", prezzo: 900 },
            { nome: "Bianco Ghiaccio", prezzo: 0 }
          ]
        },
        {
          nome: "40 TFSI",
          prezzo_base: 53400,
          motorizzazione: "2.0 L 4 cilindri benzina mild hybrid",
          potenza: "204 CV (150 kW)",
          consumi: "6.2 l/100km",
          co2: "141 g/km",
          velocita_max: "240 km/h",
          accelerazione_0_100: "6.8 s",
          cambio: "Automatico DSG 7 marce",
          trazione: "Anteriore",
          allestimenti: [
            { nome: "Base", prezzo_aggiuntivo: 0, optional_serie: ["Cerchi 17\"", "LED", "MMI Plus", "Clima tri-zona"] },
            { nome: "S line", prezzo_aggiuntivo: 5600, optional_serie: ["Cerchi 19\"", "Kit S line completo", "Virtual Cockpit Plus"] }
          ],
          optional_extra: [
            { nome: "Vernice metallizzata", prezzo: 900 },
            { nome: "Bang & Olufsen", prezzo: 950 }
          ],
          colori_disponibili: [
            { nome: "Nero Mythos", prezzo: 900 },
            { nome: "Bianco Ghiaccio", prezzo: 0 }
          ]
        }
      ]
    }
  }
};

// ============================================
// ENDPOINTS MCP
// ============================================

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    name: 'Valentina MCP Server',
    version: '1.0.0',
    tools: 12,
    models: {
      bmw: Object.keys(mcpData.bmw).length,
      audi: Object.keys(mcpData.audi).length
    }
  });
});

// Tool 1: Get available models
app.post('/tools/get_modelli_disponibili', (req, res) => {
  const { marca } = req.body;
  
  if (marca) {
    const modelli = Object.keys(mcpData[marca.toLowerCase()] || {});
    res.json({ marca, modelli, count: modelli.length });
  } else {
    res.json({
      bmw: Object.keys(mcpData.bmw),
      audi: Object.keys(mcpData.audi)
    });
  }
});

// Tool 2: Get versions for a model
app.post('/tools/get_versioni_modello', (req, res) => {
  const { marca, modello } = req.body;
  const data = mcpData[marca?.toLowerCase()]?.[modello];
  
  if (!data) {
    return res.status(404).json({ error: 'Modello non trovato' });
  }
  
  res.json({
    marca,
    modello,
    anno: data.anno,
    versioni: data.versioni.map(v => ({
      nome: v.nome,
      prezzo_base: v.prezzo_base,
      motorizzazione: v.motorizzazione,
      potenza: v.potenza
    }))
  });
});

// Tool 3: Get complete configuration with price
app.post('/tools/get_configurazione_completa', (req, res) => {
  const { marca, modello, versione, allestimento, optional, colore } = req.body;
  const modelData = mcpData[marca?.toLowerCase()]?.[modello];
  
  if (!modelData) {
    return res.status(404).json({ error: 'Modello non trovato' });
  }
  
  const versionData = modelData.versioni.find(v => v.nome === versione);
  if (!versionData) {
    return res.status(404).json({ error: 'Versione non trovata' });
  }
  
  let prezzo_totale = versionData.prezzo_base;
  const dettagli = {
    prezzo_base: versionData.prezzo_base,
    allestimento: null,
    optional_selezionati: [],
    colore_selezionato: null
  };
  
  // Add trim price
  if (allestimento) {
    const trim = versionData.allestimenti.find(a => a.nome === allestimento);
    if (trim) {
      prezzo_totale += trim.prezzo_aggiuntivo;
      dettagli.allestimento = { nome: trim.nome, prezzo: trim.prezzo_aggiuntivo };
    }
  }
  
  // Add optional prices
  if (optional && Array.isArray(optional)) {
    optional.forEach(optName => {
      const opt = versionData.optional_extra.find(o => o.nome === optName);
      if (opt) {
        prezzo_totale += opt.prezzo;
        dettagli.optional_selezionati.push({ nome: opt.nome, prezzo: opt.prezzo });
      }
    });
  }
  
  // Add color price
  if (colore) {
    const col = versionData.colori_disponibili.find(c => c.nome === colore);
    if (col) {
      prezzo_totale += col.prezzo;
      dettagli.colore_selezionato = { nome: col.nome, prezzo: col.prezzo };
    }
  }
  
  res.json({
    marca,
    modello,
    versione: versionData.nome,
    ...dettagli,
    dati_tecnici: {
      motorizzazione: versionData.motorizzazione,
      potenza: versionData.potenza,
      consumi: versionData.consumi,
      co2: versionData.co2,
      velocita_max: versionData.velocita_max,
      accelerazione: versionData.accelerazione_0_100
    },
    prezzo_totale,
    prezzo_iva_inclusa: Math.round(prezzo_totale * 1.22),
    nota: 'Prezzi indicativi soggetti a variazioni'
  });
});

// Tool 4-12: Altri tool semplificati
app.post('/tools/get_optional_disponibili', (req, res) => {
  const { marca, modello, versione } = req.body;
  const versionData = mcpData[marca?.toLowerCase()]?.[modello]?.versioni.find(v => v.nome === versione);
  res.json({ optional_extra: versionData?.optional_extra || [] });
});

app.post('/tools/get_colori_disponibili', (req, res) => {
  const { marca, modello, versione } = req.body;
  const versionData = mcpData[marca?.toLowerCase()]?.[modello]?.versioni.find(v => v.nome === versione);
  res.json({ colori: versionData?.colori_disponibili || [] });
});

app.post('/tools/get_dati_tecnici', (req, res) => {
  const { marca, modello, versione } = req.body;
  const versionData = mcpData[marca?.toLowerCase()]?.[modello]?.versioni.find(v => v.nome === versione);
  if (versionData) {
    res.json({
      motorizzazione: versionData.motorizzazione,
      potenza: versionData.potenza,
      consumi: versionData.consumi,
      co2: versionData.co2
    });
  } else {
    res.status(404).json({ error: 'Versione non trovata' });
  }
});

app.post('/tools/confronta_modelli', (req, res) => {
  res.json({ message: 'Tool confronta_modelli - Da implementare' });
});

app.post('/tools/calcola_finanziamento', (req, res) => {
  const { prezzo, anticipo = 0, durata = 60, tasso = 4.5 } = req.body;
  const importo = prezzo - anticipo;
  const tasso_mensile = tasso / 100 / 12;
  const rata = importo * (tasso_mensile * Math.pow(1 + tasso_mensile, durata)) / (Math.pow(1 + tasso_mensile, durata) - 1);
  res.json({ prezzo, anticipo, durata_mesi: durata, rata_mensile: Math.round(rata * 100) / 100 });
});

app.post('/tools/get_allestimenti', (req, res) => {
  const { marca, modello, versione } = req.body;
  const versionData = mcpData[marca?.toLowerCase()]?.[modello]?.versioni.find(v => v.nome === versione);
  res.json({ allestimenti: versionData?.allestimenti || [] });
});

app.post('/tools/get_campagne_attive', (req, res) => {
  res.json({ campagne: [{ nome: 'Promo Primavera 2026', validita: '2026-03-01 / 2026-04-30' }] });
});

app.post('/tools/cerca_per_budget', (req, res) => {
  const { budget_max } = req.body;
  const risultati = [];
  ['bmw', 'audi'].forEach(m => {
    Object.entries(mcpData[m]).forEach(([modello, data]) => {
      data.versioni.forEach(v => {
        if (v.prezzo_base <= budget_max) {
          risultati.push({ marca: m.toUpperCase(), modello, versione: v.nome, prezzo_base: v.prezzo_base });
        }
      });
    });
  });
  res.json({ budget_max, risultati: risultati.slice(0, 10) });
});

app.post('/tools/get_optional_serie', (req, res) => {
  const { marca, modello, versione, allestimento } = req.body;
  const versionData = mcpData[marca?.toLowerCase()]?.[modello]?.versioni.find(v => v.nome === versione);
  const trim = versionData?.allestimenti.find(a => a.nome === allestimento);
  res.json({ optional_serie: trim?.optional_serie || [] });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ MCP Server running on port ${PORT}`);
});

export default app;
