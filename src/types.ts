export type CategoryType =
  | "hortifruti"
  | "açougue"
  | "padaria"
  | "laticínios"
  | "bebidas"
  | "mercearia"
  | "limpeza"
  | "higiene"
  | "utensílios domésticos"
  | "churrasco";

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
  latitude?: number;
  longitude?: number;
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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  welcomeDiscountActive: boolean; // 5% off on total purchase
  discountPercent: number; // 5
}

export type BikeType = "ebike" | "mechanical_bike";

export interface DelivererProfile {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  bikeType: BikeType;
  bikeModel: string;
  neighborhood: string;
  availability: "24h" | "diurno" | "noturno";
  status: "Aprovado" | "Em Análise" | "Ativo no Radar";
  rating: number;
  totalDeliveries: number;
  avatarUrl: string;
  pixKey?: string;
}

export type DeliveryStatusStep =
  | "aguardando_aceite"
  | "no_estabelecimento"
  | "mercadoria_coletada"
  | "em_transito_bike"
  | "entregue";

export interface ActiveDeliveryOrder {
  id: string;
  orderNumber: string;
  storeName: string;
  storeAddress: string;
  customerAddress: string;
  customerName: string;
  neighborhood: string;
  deliverer?: DelivererProfile;
  itemsCount: number;
  totalValue: number;
  deliveryFee: number; // Baixo custo R$ 3,90
  status: DeliveryStatusStep;
  estimatedMinutes: number;
  currentLat: number;
  currentLng: number;
  targetLat: number;
  targetLng: number;
  otpCode: string;
  createdAt: string;
  is24hExpress: boolean;
}

export type AppMode =
  | "consulta"
  | "totem" | "encarte"
  | "carrinho"
  | "gestor"
  | "ia_assistente"
  | "rastreio"
  | "cadastro_entregador";

