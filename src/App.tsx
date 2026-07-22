import React, { useState } from "react";
import {
  AppMode,
  CartItem,
  PriceChangeLog,
  Product,
  StoreUnit,
} from "./types";
import { INITIAL_PRODUCTS, STORES_DATA } from "./data/mockData";
import { Header } from "./components/Header";
import { PriceSearch } from "./components/PriceSearch";
import { BarcodeScannerModal } from "./components/BarcodeScannerModal";
import { TotemTerminalView } from "./components/TotemTerminalView";
import { PromotionsFlyer } from "./components/PromotionsFlyer";
import { CartManager } from "./components/CartManager";
import { PriceManagerModal } from "./components/PriceManagerModal";
import { GeminiProductAssistant } from "./components/GeminiProductAssistant";
import { PriceReportModal } from "./components/PriceReportModal";
import { PriceTicker } from "./components/PriceTicker";
import { LocalSeoFooter } from "./components/LocalSeoFooter";
import { Bell, Flame, RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";

export default function App() {
  const [currentMode, setMode] = useState<AppMode>("consulta");
  const [stores] = useState<StoreUnit[]>(STORES_DATA);
  const [selectedStore, setSelectedStore] = useState<StoreUnit>(STORES_DATA[0]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [priceLogs, setPriceLogs] = useState<PriceChangeLog[]>([]);

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [reportProduct, setReportProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.name}" adicionado ao carrinho!`);
  };

  const handleUpdateCartQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSwapCartItem = (oldProductId: string, newProduct: Product) => {
    setCart((prev) => {
      const oldItem = prev.find((item) => item.product.id === oldProductId);
      const qty = oldItem ? oldItem.quantity : 1;

      const filtered = prev.filter((item) => item.product.id !== oldProductId);
      const existingNew = filtered.find((item) => item.product.id === newProduct.id);

      if (existingNew) {
        return filtered.map((item) =>
          item.product.id === newProduct.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...filtered, { product: newProduct, quantity: qty }];
    });
    showToast(`Troca realizada! Item substituído por "${newProduct.name}"`);
  };

  const handleSwapAllToCheaper = () => {
    let swappedCount = 0;
    setCart((prev) => {
      return prev.map((item) => {
        const cheaper = products
          .filter(
            (p) =>
              p.category === item.product.category &&
              p.id !== item.product.id &&
              p.clubeYamaPrice < item.product.clubeYamaPrice
          )
          .sort((a, b) => a.clubeYamaPrice - b.clubeYamaPrice)[0];

        if (cheaper) {
          swappedCount++;
          return { product: cheaper, quantity: item.quantity };
        }
        return item;
      });
    });

    if (swappedCount > 0) {
      showToast(`⚡ ${swappedCount} produto(s) substituído(s) pelas opções mais baratas!`);
    } else {
      showToast("Seu carrinho já utiliza as opções mais baratas de cada categoria!");
    }
  };

  // Real-time Price Update (Gestor)
  const handleUpdateProductPrice = (
    productId: string,
    newPrice: number,
    newClubePrice: number,
    inPromotion: boolean,
    badge?: string
  ) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return;

    const log: PriceChangeLog = {
      productId,
      productName: target.name,
      oldPrice: target.price,
      newPrice,
      oldClubePrice: target.clubeYamaPrice,
      newClubePrice,
      timestamp: new Date().toLocaleTimeString("pt-BR"),
    };

    setPriceLogs((prev) => [log, ...prev]);

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            price: newPrice,
            clubeYamaPrice: newClubePrice,
            inPromotion,
            promotionBadge: badge || p.promotionBadge,
          };
        }
        return p;
      })
    );

    showToast(`🔥 Preço de "${target.name}" atualizado em tempo real!`);
  };

  // Handle scanned barcode
  const handleScanSuccess = (barcode: string) => {
    setSearchQuery(barcode);
    setMode("consulta");
    showToast(`Código ${barcode} lido com sucesso!`);
  };

  // Handle price report submit
  const handleSubmitReport = (
    productId: string,
    foundPrice: number,
    notes: string
  ) => {
    showToast("Divergência notificada para a gerência da loja!");
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-red-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border-2 border-red-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideUp">
          <Bell className="w-5 h-5 text-red-400 animate-bounce" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main App Header */}
      <Header
        currentMode={currentMode}
        setMode={setMode}
        selectedStore={selectedStore}
        setSelectedStore={setSelectedStore}
        stores={stores}
        cartCount={totalCartCount}
      />

      {/* Live Financial-Style Price Ticker Banner */}
      <PriceTicker products={products} onAddToCart={handleAddToCart} />

      {/* Main Body Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {currentMode === "consulta" && (
          <PriceSearch
            products={products}
            selectedStore={selectedStore}
            onAddToCart={handleAddToCart}
            onReportPrice={(p) => setReportProduct(p)}
            onOpenScanner={() => setIsScannerOpen(true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentMode === "totem" && (
          <TotemTerminalView
            products={products}
            selectedStore={selectedStore}
            onOpenScanner={() => setIsScannerOpen(true)}
          />
        )}

        {currentMode === "encarte" && (
          <PromotionsFlyer
            products={products}
            selectedStore={selectedStore}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentMode === "carrinho" && (
          <CartManager
            cart={cart}
            products={products}
            selectedStore={selectedStore}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onSwapItem={handleSwapCartItem}
            onSwapAllCheaper={handleSwapAllToCheaper}
          />
        )}

        {currentMode === "gestor" && (
          <PriceManagerModal
            products={products}
            onUpdateProductPrice={handleUpdateProductPrice}
            priceLogs={priceLogs}
          />
        )}

        {currentMode === "ia_assistente" && <GeminiProductAssistant />}

        {/* Local SEO Section Footer */}
        <LocalSeoFooter
          stores={stores}
          selectedStore={selectedStore}
          onSelectStore={setSelectedStore}
        />
      </main>

      {/* Modals */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        productsList={products}
      />

      <PriceReportModal
        product={reportProduct}
        selectedStore={selectedStore}
        onClose={() => setReportProduct(null)}
        onSubmitReport={handleSubmitReport}
      />

      {/* App Footer */}
      <footer className="bg-slate-800 text-slate-400 py-4 px-6 text-xs font-medium shrink-0 border-t border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              SINCRONIA EM TEMPO REAL ATIVA
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="text-slate-300">Unidade: {selectedStore.name} ({selectedStore.address})</span>
          </div>
          <div className="flex items-center gap-4 uppercase tracking-widest text-[10px]">
            <span>SUPER YAMA V. 2.4.0</span>
            <span className="h-3 w-[1px] bg-slate-600"></span>
            <span>Suporte: Ramal 204</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
