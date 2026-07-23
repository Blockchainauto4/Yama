import React, { useState } from "react";
import { CartItem, StoreUnit, UserProfile } from "../types";
import {
  X,
  MessageSquare,
  CheckCircle2,
  Copy,
  MapPin,
  Bike,
  User,
  CreditCard,
  Building2,
  ShoppingBag,
  Sparkles,
  Phone,
  Lock,
  ArrowRight,
  Receipt,
  FileText,
} from "lucide-react";

interface WhatsAppCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  selectedStore: StoreUnit;
  currentUser: UserProfile | null;
  onConfirmOrder: (orderDetails: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    paymentMethod: string;
    whatsappMessageText: string;
  }) => void;
}

export const WhatsAppCheckoutModal: React.FC<WhatsAppCheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  selectedStore,
  currentUser,
  onConfirmOrder,
}) => {
  const [customerName, setCustomerName] = useState(currentUser?.name || "");
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || "(11) 9");
  const [cpf, setCpf] = useState(currentUser?.cpf || "");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState(
    selectedStore.neighborhood.split("/")[0].trim()
  );
  const [referencePoint, setReferencePoint] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pix na Entrega");
  const [changeForAmount, setChangeForAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Central WhatsApp number
  const CENTRAL_WHATSAPP_NUMBER = "5511987654321";
  const CENTRAL_WHATSAPP_FORMATTED = "(11) 98765-4321";

  // Calculations
  const regularTotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const clubeTotal = cart.reduce(
    (acc, item) => acc + item.product.clubeYamaPrice * item.quantity,
    0
  );
  const totalSavings = regularTotal - clubeTotal;
  const welcomeDiscount = currentUser ? (clubeTotal * 0.05) : 0;
  const deliveryFee = 3.90;
  const finalTotal = Math.max(0, clubeTotal - welcomeDiscount + deliveryFee);
  const itemsCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const fullAddressStr = `${streetAddress}, ${addressNumber} ${
    complement ? `- ${complement}` : ""
  } (${neighborhood}) ${referencePoint ? `[Ref: ${referencePoint}]` : ""}`;

  const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

  // Format WhatsApp Payload
  const generateWhatsAppMessage = () => {
    let msg = `🛒 *NOVO PEDIDO - SUPER YAMA SUPERMERCADOS*\n`;
    msg += `----------------------------------------\n`;
    msg += `🏪 *Loja Origem:* ${selectedStore.name}\n`;
    msg += `📍 *Endereço da Loja:* ${selectedStore.address}\n\n`;

    msg += `👤 *DADOS DO CLIENTE:*\n`;
    msg += `• *Nome:* ${customerName || "Não informado"}\n`;
    msg += `• *WhatsApp:* ${customerPhone || "Não informado"}\n`;
    if (cpf) msg += `• *CPF (Nota Fiscal):* ${cpf}\n`;
    msg += `• *Endereço de Entrega:* ${fullAddressStr || "Retirada na Loja"}\n\n`;

    msg += `🚲 *MODALIDADE DE ENTREGA:*\n`;
    msg += `• Delivery Express 24h em E-Bike (Baixo Custo)\n`;
    msg += `• *Código de Segurança OTP:* ${otpCode}\n\n`;

    msg += `📦 *ITENS COMPRADOS (${itemsCount} itens):*\n`;
    cart.forEach((item, index) => {
      const itemSubtotal = item.product.clubeYamaPrice * item.quantity;
      msg += `${index + 1}. ${item.quantity}x ${item.product.name} (${item.product.brand}) - R$ ${itemSubtotal
        .toFixed(2)
        .replace(".", ",")} (R$ ${item.product.clubeYamaPrice
        .toFixed(2)
        .replace(".", ",")} un)\n`;
    });

    msg += `\n----------------------------------------\n`;
    msg += `💰 *RESUMO FINANCEIRO:*\n`;
    msg += `• Subtotal (Tabela Normal): R$ ${regularTotal.toFixed(2).replace(".", ",")}\n`;
    msg += `• Economia Clube Yama: -R$ ${totalSavings.toFixed(2).replace(".", ",")}\n`;
    if (welcomeDiscount > 0) {
      msg += `• Bônus de Cadastro (5% OFF): -R$ ${welcomeDiscount.toFixed(2).replace(".", ",")}\n`;
    }
    msg += `• Taxa de Entrega E-Bike: R$ ${deliveryFee.toFixed(2).replace(".", ",")}\n`;
    msg += `💵 *VALOR FINAL A PAGAR: R$ ${finalTotal.toFixed(2).replace(".", ",")}*\n\n`;

    msg += `💳 *Forma de Pagamento:* ${paymentMethod}\n`;
    if (paymentMethod === "Dinheiro" && changeForAmount) {
      msg += `• *Troco para:* R$ ${changeForAmount}\n`;
    }
    if (notes) {
      msg += `📝 *Observações:* ${notes}\n`;
    }
    msg += `----------------------------------------\n`;
    msg += `⚡ *Pedido gerado pelo aplicativo Super Yama 24h*`;

    return msg;
  };

  const handleSendWhatsApp = () => {
    const text = generateWhatsAppMessage();
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${CENTRAL_WHATSAPP_NUMBER}?text=${encodedText}`;

    // Confirm order state
    onConfirmOrder({
      customerName: customerName || "Cliente Yama",
      customerPhone: customerPhone || "(11) 99999-9999",
      customerAddress: fullAddressStr,
      paymentMethod,
      whatsappMessageText: text,
    });

    setIsSubmitted(true);
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyMessage = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp Direct 24h
            </span>
            <span className="text-xs text-emerald-100 font-bold">
              Central Super Yama
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black">
            Finalizar Pedido via WhatsApp Central
          </h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-lg font-medium">
            Seu pedido será formatado e enviado diretamente para a nossa central de atendimento no WhatsApp para separação imediata e entrega em E-Bike!
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Order Quick Summary Card */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-slate-900">
                <Building2 className="w-4 h-4 text-emerald-600" />
                {selectedStore.name}
              </span>
              <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold">
                {itemsCount} {itemsCount === 1 ? "item" : "itens"}
              </span>
            </div>

            <div className="border-t border-slate-200 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-slate-500 font-medium">Subtotal Normal: </span>
                <span className="line-through text-slate-400 font-mono">
                  R$ {regularTotal.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div>
                <span className="text-emerald-700 font-bold">Economia Clube: </span>
                <span className="font-mono text-emerald-700 font-bold">
                  -R$ {totalSavings.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="text-slate-900 font-black text-sm">
                Total a Pagar:{" "}
                <span className="text-emerald-700 font-mono">
                  R$ {finalTotal.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Identification Form */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 uppercase tracking-wider">
              <User className="w-4 h-4 text-emerald-600" />
              1. Identificação do Cliente
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex: Maria Aparecida da Silva"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Seu WhatsApp / Telefone *
                </label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  CPF (Opcional para Nota Fiscal)
                </label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address Form */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-red-600" />
              2. Endereço para Delivery Express (E-Bike)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Rua / Avenida *
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="Ex: Av. Taquandava ou Rua das Flores"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Número *
                </label>
                <input
                  type="text"
                  value={addressNumber}
                  onChange={(e) => setAddressNumber(e.target.value)}
                  placeholder="Ex: 142"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Complemento
                </label>
                <input
                  type="text"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                  placeholder="Apt 12, Bloco B ou Casa 2"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bairro *
                </label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Ex: Jardim Aracati"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ponto de Referência
                </label>
                <input
                  type="text"
                  value={referencePoint}
                  onChange={(e) => setReferencePoint(e.target.value)}
                  placeholder="Ex: Próximo à padaria ou escola"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              3. Forma de Pagamento na Entrega
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { id: "Pix na Entrega", label: "Pix no QR Code", icon: "⚡" },
                { id: "Cartão de Crédito", label: "Cartão Crédito", icon: "💳" },
                { id: "Cartão de Débito", label: "Cartão Débito", icon: "💳" },
                { id: "Dinheiro", label: "Dinheiro", icon: "💵" },
              ].map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setPaymentMethod(pm.id)}
                  className={`p-3 rounded-2xl border text-center transition font-bold flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === pm.id
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base">{pm.icon}</span>
                  <span>{pm.label}</span>
                </button>
              ))}
            </div>

            {paymentMethod === "Dinheiro" && (
              <div className="max-w-xs">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Precisa de troco para quanto?
                </label>
                <input
                  type="text"
                  value={changeForAmount}
                  onChange={(e) => setChangeForAmount(e.target.value)}
                  placeholder="Ex: R$ 100,00 ou Não preciso de troco"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Observações adicionais para a central / entregador
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Ex: Deixar na portaria, campainha com defeito..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none resize-none"
              />
            </div>
          </div>

          {/* WhatsApp Message Live Preview Box */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                Pré-visualização da Mensagem do Pedido
              </h3>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-emerald-700 hover:text-emerald-800 text-xs font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 transition"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copiar Texto
                  </>
                )}
              </button>
            </div>

            <pre className="bg-slate-900 text-emerald-400 p-4 rounded-2xl text-[11px] font-mono leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto border border-slate-800">
              {generateWhatsAppMessage()}
            </pre>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
            Central de Vendas WhatsApp:{" "}
            <strong className="text-slate-800">{CENTRAL_WHATSAPP_FORMATTED}</strong>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-2xl font-bold text-xs text-slate-600 hover:bg-slate-200 transition"
            >
              Cancelar
            </button>

            <button
              onClick={handleSendWhatsApp}
              className="flex-1 sm:flex-initial py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-2xl flex items-center justify-center gap-2 transition shadow-xl shadow-emerald-950/20 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current text-emerald-100" />
              <span>Enviar Pedido para WhatsApp da Central</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
