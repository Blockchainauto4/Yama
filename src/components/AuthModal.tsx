import React, { useState } from "react";
import { UserProfile } from "../types";
import { Lock, UserCheck, Sparkles, X, Gift, ShieldCheck, Mail, User as UserIcon, CreditCard, ArrowRight } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      name: name.trim() || email.split("@")[0] || "Cliente Yama",
      email: email.trim(),
      cpf: cpf.trim() || undefined,
      welcomeDiscountActive: true,
      discountPercent: 5,
    };

    onLogin(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden relative">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full mb-3 shadow-md">
            <Gift className="w-3.5 h-3.5 text-slate-950" />
            <span>5% OFF na 1ª Compra</span>
          </div>

          <h3 className="text-2xl font-black tracking-tight text-white">
            {isRegister ? "Criar Conta Super Yama" : "Acessar Sua Conta"}
          </h3>
          <p className="text-xs text-slate-200 mt-1 font-medium">
            {isRegister
              ? "Cadastre-se grátis para liberar todos os preços e ganhar 5% de desconto no total da sua compra!"
              : "Faça login para visualizar preços atualizados e utilizar seus benefícios do Clube Yama."}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Welcome Discount Highlight Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-3">
            <div className="p-2 bg-amber-400 text-slate-900 rounded-xl font-bold shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xs text-amber-950">
              <strong className="block text-amber-900 font-extrabold text-sm">
                Bônus de Boas-Vindas de 5% OFF!
              </strong>
              Ao criar sua conta agora, você ganha automaticamente <strong>5% de desconto acumulativo</strong> no valor final do seu carrinho.
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nome Completo
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Maria Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              E-mail ou Telefone
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                CPF (Opcional - Para acúmulo de pontos)
              </label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm py-3.5 rounded-2xl transition shadow-lg shadow-red-200 flex items-center justify-center gap-2 active:scale-95"
          >
            <span>{isRegister ? "Criar Conta & Ganhar 5% OFF" : "Entrar e Liberar Preços"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-bold text-slate-600 hover:text-red-600 transition"
            >
              {isRegister
                ? "Já tem uma conta? Clique para Entrar"
                : "Ainda não tem conta? Clique para Cadastrar e Ganhar 5% OFF"}
            </button>
          </div>
        </form>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Dados Protegidos SSL
          </span>
          <span>Clube Super Yama</span>
        </div>
      </div>
    </div>
  );
};
