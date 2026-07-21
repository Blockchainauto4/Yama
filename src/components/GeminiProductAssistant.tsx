import React, { useState } from "react";
import { Sparkles, Camera, Send, Bot, User, Image as ImageIcon, Loader2, RefreshCw } from "lucide-react";

export const GeminiProductAssistant: React.FC = () => {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string; image?: string }[]
  >([
    {
      role: "assistant",
      text: "Olá! Sou o assistente de inteligência artificial do **Super Yama Supermercados**. 🛒\n\nVocê pode me mandar foto de uma etiqueta de preço, rótulo de produto ou nota fiscal para eu conferir se o valor está vantajoso, ou pedir sugestões de receitas com nossas ofertas de hoje!",
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() && !selectedImage) return;

    const userMsg = {
      role: "user" as const,
      text: inputQuery || "Analise a foto enviada.",
      image: selectedImage || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentQuery = inputQuery;
    const currentImg = selectedImage;

    setInputQuery("");
    setSelectedImage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: currentQuery,
          imageBase64: currentImg,
        }),
      });

      const data = await res.json();

      if (data.text) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.text },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Não consegui analisar essa solicitação no momento. Tente novamente.",
          },
        ]);
      }
    } catch (err) {
      console.error("Gemini Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Houve um erro de comunicação com o serviço Gemini AI. Verifique se o servidor backend está ativo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-800">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-700 rounded-2xl text-white shadow-md shadow-purple-200">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Assistente IA Super Yama Gemini
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Leitor inteligente de etiquetas, comparador de preços e consultor de receitas
            </p>
          </div>
        </div>
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  m.role === "user"
                    ? "bg-red-600 text-white"
                    : "bg-purple-700 text-white"
                }`}
              >
                {m.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                  m.role === "user"
                    ? "bg-red-600 text-white rounded-tr-none shadow-xs"
                    : "bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none space-y-2 shadow-xs"
                }`}
              >
                {m.image && (
                  <img
                    src={m.image}
                    alt="Upload"
                    className="max-h-40 w-auto rounded-xl mb-2 border border-slate-200 shadow-xs"
                  />
                )}
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-purple-700 font-bold bg-purple-50 p-3 rounded-2xl border border-purple-100 w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
              <span>Analisando solicitação no Super Yama AI...</span>
            </div>
          )}
        </div>

        {/* Selected Image Preview */}
        {selectedImage && (
          <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-10 h-10 object-cover rounded-lg"
              />
              <span className="text-xs text-slate-700 font-medium">
                Imagem anexada para leitura
              </span>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="text-xs text-red-600 hover:underline px-2 font-bold"
            >
              Remover
            </button>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSend} className="mt-4 flex items-center gap-2">
          <label className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl border border-slate-200 cursor-pointer transition">
            <Camera className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Envie uma pergunta ou foto de etiqueta de preço..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 transition"
          />

          <button
            type="submit"
            disabled={loading || (!inputQuery.trim() && !selectedImage)}
            className="p-3 bg-purple-700 hover:bg-purple-800 disabled:bg-slate-200 text-white rounded-2xl transition shadow disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
