import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini client on server side
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Super Yama Consulta de Preços" });
});

// API Endpoint: Gemini AI product / receipt / price tag analysis
app.post("/api/gemini/analyze", async (req, res) => {
  try {
    const { prompt, imageBase64, mimeType } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(500).json({
        error: "Chave GEMINI_API_KEY não configurada no servidor.",
      });
    }

    const systemInstruction = `Você é o assistente inteligente do Super Yama Supermercados.
Sua missão é ajudar os clientes a consultar preços, analisar etiquetas de preço, comparar custo por kg/litro, sugerir receitas com itens em promoção do Super Yama e tirar dúvidas sobre economia no supermercado.
Responda sempre em Português do Brasil com tom simpático, prestativo e direto.`;

    let response;
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: {
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType: mimeType || "image/jpeg",
              },
            },
            {
              text: prompt || "Analise esta imagem de produto ou etiqueta de preço e extraia o nome do produto, marca, peso/volume e preço se visível. Compare se o valor está vantajoso.",
            },
          ],
        },
        config: {
          systemInstruction,
        },
      });
    } else {
      response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt || "Quais são as melhores dicas para economizar no Super Yama hoje?",
        config: {
          systemInstruction,
        },
      });
    }

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Erro na API Gemini:", error);
    res.status(500).json({
      error: "Falha ao processar solicitação no Gemini AI.",
      details: error?.message || String(error),
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Super Yama] Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer();
