export type CategoryType =
  | "hortifruti"
  | "açougue"
  | "padaria"
  | "laticínios"
  | "bebidas"
  | "mercearia"
  | "limpeza"
  | "higiene";

export interface Product {
  id: string;
  barcode: string;
  name: string;
  brand: string;
  category: CategoryType;
  price: number;
  clubeYamaPrice: number;
  unitMeasure: string;
  unitPriceRatio: string; // e.g. "R$ 14,90/kg"
  aisle: string; // e.g. "Corredor 4 - Laticínios"
  stockQuantity: number;
  imageUrl: string;
  inPromotion: boolean;
  promotionBadge?: string;
  description: string;
  isPopular?: boolean;
}

export interface StoreUnit {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  distance: string;
  rating: number;
  reviewCount: number;
  status: "Aberto" | "Fechado";
  closingTime: string;
  phone: string;
  services: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PriceReport {
  id: string;
  productId: string;
  productName: string;
  foundPrice: number;
  systemPrice: number;
  storeId: string;
  notes: string;
  timestamp: string;
  status: "Pendente" | "Verificado" | "Corrigido";
}

export interface PriceChangeLog {
  productId: string;
  productName: string;
  oldPrice: number;
  newPrice: number;
  oldClubePrice: number;
  newClubePrice: number;
  timestamp: string;
}

export type AppMode = "consulta" | "totem" | "encarte" | "carrinho" | "gestor" | "ia_assistente";
