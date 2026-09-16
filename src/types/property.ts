export type TransactionType = 'all' | 'sale' | 'jeonse' | 'monthly';
export type PropertyType = 'all' | 'apartment' | 'officetel' | 'villa' | 'penthouse' | 'house' | 'commercial';

export interface PropertyPrice {
  salePrice?: number; // In 10,000 KRW (e.g. 450000 = 45억)
  deposit?: number; // In 10,000 KRW (e.g. 50000 = 5억)
  monthlyRent?: number; // In 10,000 KRW (e.g. 350 = 350만원)
  maintenanceFee?: number; // In 10,000 KRW (e.g. 45 = 45만원)
  priceDisplay: string; // e.g. "매매 45억" or "보증금 5억 / 월 350만"
  priceShort: string; // e.g. "45억" or "5억 / 350만"
  pricePyeongEstimated?: string; // e.g. "평당 1억 1,200만"
}

export interface PropertyLocation {
  city: string; // e.g. "서울특별시" or "광주광역시"
  district: string; // e.g. "용산구" or "남구"
  dong: string; // e.g. "한남동" or "봉선동"
  roadAddress: string; // e.g. "한남대로 91"
  detailAddress?: string;
  landmark?: string; // e.g. "한남초등학교 인근"
  lat: number;
  lng: number;
  subwayInfo?: string; // e.g. "한남역(경의중앙선) 도보 7분"
}

export interface PropertySpecs {
  supplyAreaM2: number;
  exclusiveAreaM2: number;
  supplyPyeong: number;
  exclusivePyeong: number;
  floor: string; // e.g. "고층/12층" or "28층"
  totalFloors?: number;
  rooms: number;
  bathrooms: number;
  direction: string; // e.g. "남향 (거실 기준)"
  parkingTotal: number;
  parkingPerHousehold: number;
  completionYear: number;
  approvalDate: string; // e.g. "2020-03-15"
  buildingType: string; // e.g. "공동주택 (아파트)"
  heatingType?: string; // e.g. "개별난방 (도시가스)"
  moveInDate: string; // e.g. "즉시 입주 협의 가능"
}

export interface PropertyAgent {
  name: string;
  title: string;
  phone: string;
  email?: string;
  photo: string;
  licenseNumber: string;
  brokerageName?: string;
}

export interface PropertySurrounding {
  category: 'transport' | 'school' | 'life' | 'culture' | string;
  title: string;
  distance: string;
}

export interface Property {
  id: string;
  title: string;
  subtitle: string;
  complexName?: string;
  propertyType: PropertyType;
  transactionType: TransactionType;
  price: PropertyPrice;
  location: PropertyLocation;
  specs: PropertySpecs;
  features: string[];
  tags: string[];
  images: string[];
  floorPlanUrl?: string;
  description: string;
  keyPoints: string[];
  agent: PropertyAgent;
  surroundings: PropertySurrounding[];
  status: 'available' | 'reserved' | 'completed' | 'active';
  isFeatured: boolean;
  isHotDeal?: boolean;
  isNew: boolean;
  viewsCount: number;
  createdAt: string;
}

export interface FilterState {
  keyword: string;
  city: string;
  district: string;
  transactionType: TransactionType;
  propertyType: PropertyType;
  minPrice: number; // in 10,000 KRW
  maxPrice: number;
  minPyeong: number;
  maxPyeong: number;
  rooms: number; // 0 = all, 1, 2, 3, 4+
  bathrooms: number;
  minParking: number;
  builtWithinYears: number; // 0 = all, 5 = within 5 years, 10 = within 10 years
  isNewOnly: boolean;
  isFeaturedOnly: boolean;
  sortBy: 'latest' | 'priceAsc' | 'priceDesc' | 'areaDesc' | 'popular';
}

export interface RegionInfo {
  id: string;
  city: string;
  name: string;
  koreanName: string;
  badge: string;
  heroImage: string;
  description: string;
  avgPriceSale: string;
  avgPriceJeonse: string;
  keyLandmarks: string[];
  schools: string[];
  transport: string[];
  propertyCount: number;
  summaryQuote: string;
}

export interface CustomerInquiry {
  id: string;
  type: 'property_inquiry' | 'selling_request' | 'consultation' | 'visit_reserve';
  propertyId?: string;
  propertyTitle?: string;
  customerName: string;
  phone: string;
  email?: string;
  preferredDate?: string;
  preferredTime?: string;
  budget?: string;
  targetRegion?: string;
  message: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
}
