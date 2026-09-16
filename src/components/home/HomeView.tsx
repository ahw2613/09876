import React, { useState } from 'react';
import { Property, RegionInfo, TransactionType } from '../../types/property';
import { PropertyCard } from '../properties/PropertyCard';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Award, 
  Users, 
  TrendingUp, 
  ChevronRight, 
  MapPin, 
  CheckCircle,
  PhoneCall
} from 'lucide-react';

interface HomeViewProps {
  properties: Property[];
  regions: RegionInfo[];
  favorites: string[];
  compareList: string[];
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectProperty: (id: string) => void;
  onNavigate: (tab: string, extraParam?: string) => void;
  onOpenConsultation: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  properties,
  regions,
  favorites,
  compareList,
  onToggleFavorite,
  onToggleCompare,
  onSelectProperty,
  onNavigate,
  onOpenConsultation,
}) => {
  const [heroSearchType, setHeroSearchType] = useState<TransactionType>('all');
  const [heroKeyword, setHeroKeyword] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('properties', JSON.stringify({ keyword: heroKeyword, transactionType: heroSearchType }));
  };

  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 4);
  const newProperties = properties.filter((p) => p.isNew).slice(0, 3);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[620px] sm:min-h-[700px] flex items-center justify-center bg-stone-900 text-white overflow-hidden">
        {/* Background Image with subtle architectural gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90"
            alt="LUCE Luxury Real Estate Architecture"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Subtle Brand Tag */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-800/80 border border-stone-700 backdrop-blur-md text-amber-300 text-xs font-semibold mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>대한민국 하이엔드 주거 및 프라임 상업용 부동산 전문</span>
          </div>

          {/* Luxury Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-tight">
            공간의 품격, <br className="sm:hidden" />
            <span className="text-amber-400 font-serif-luxury tracking-normal">자산의 가치</span>를 완성하다
          </h1>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mt-4 sm:mt-6 leading-relaxed">
            한남, 청담, 반포의 최고급 펜트하우스부터 광주 호남권 명품 주거 및 프라임 빌딩까지. 
            검증된 실매물과 전문 공인중개사의 1:1 맞춤 자산 운용 서비스를 경험하세요.
          </p>

          {/* Integrated Search Box (Compass & Zillow Style) */}
          <div className="w-full max-w-3xl mt-8 sm:mt-10 bg-white/95 backdrop-blur-md p-2 sm:p-3 rounded-xl shadow-2xl border border-stone-200">
            {/* Search Type Tabs */}
            <div className="flex items-center space-x-1 sm:space-x-2 border-b border-stone-200/80 pb-2 px-1 text-xs font-semibold text-stone-600 overflow-x-auto">
              {[
                { id: 'all', label: '전체 거래' },
                { id: 'sale', label: '매매' },
                { id: 'jeonse', label: '전세' },
                { id: 'monthly', label: '월세' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setHeroSearchType(tab.id as TransactionType)}
                  type="button"
                  className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                    heroSearchType === tab.id
                      ? 'bg-stone-900 text-white font-bold'
                      : 'hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Input + Button */}
            <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row items-center pt-2 gap-2">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={heroKeyword}
                  onChange={(e) => setHeroKeyword(e.target.value)}
                  placeholder="지역명, 아파트 단지명, 매물 키워드 (예: 한남더힐, 나인원, 봉선동, 엘시티)"
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 outline-none font-medium"
                />
              </div>

              <button
                type="submit"
                id="hero-search-submit"
                className="w-full sm:w-auto px-8 py-3 bg-stone-900 hover:bg-black text-white text-sm font-bold rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>매물 검색</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </form>
          </div>

          {/* Quick Popular Keywords */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-stone-300">
            <span className="text-stone-400">인기 키워드:</span>
            {['한남더힐', '나인원한남', '아크로서울포레스트', '봉선동 한국아델리움', '상무지구 빌딩', '해운대 엘시티'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setHeroKeyword(tag);
                  onNavigate('properties', JSON.stringify({ keyword: tag }));
                }}
                className="px-2.5 py-0.5 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TRUST STATS SECTION */}
      <section className="bg-stone-950 text-white py-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-800">
            <div className="pt-2 md:pt-0">
              <span className="text-2xl sm:text-3xl font-bold text-amber-400 font-serif-luxury block">2.4조+</span>
              <span className="text-xs text-stone-400 mt-1 block">누적 중개 거래액</span>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="text-2xl sm:text-3xl font-bold text-white font-serif-luxury block">100%</span>
              <span className="text-xs text-stone-400 mt-1 block">공인중개사 실매물 검증</span>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="text-2xl sm:text-3xl font-bold text-white font-serif-luxury block">98.8%</span>
              <span className="text-xs text-stone-400 mt-1 block">VIP 자산가 고객 만족도</span>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="text-2xl sm:text-3xl font-bold text-amber-400 font-serif-luxury block">1:1</span>
              <span className="text-xs text-stone-400 mt-1 block">전담 비밀보장 상담</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURATED FEATURED PROPERTIES (추천 프리미엄 매물) */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
              Curated Collection
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              루체 리얼티 엄선 추천 매물
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              희소한 입지와 독보적 자산 가치를 지닌 하이엔드 주거 및 프라임 상업용 매물입니다
            </p>
          </div>

          <button
            onClick={() => onNavigate('properties')}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-1 text-xs font-bold text-stone-900 hover:text-amber-800 transition-colors"
          >
            <span>전체 매물 더보기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              isCompared={compareList.includes(property.id)}
              onToggleFavorite={onToggleFavorite}
              onToggleCompare={onToggleCompare}
              onClick={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* 4. EXPLORE BY REGION (지역별 탐색 - 서울, 광주/호남, 부산 등) */}
      <section className="py-16 bg-stone-100/70 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-stone-300">
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-widest block mb-1">
                Regional Hubs
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                대한민국 핵심 부촌 및 거점 지역
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                수도권 최고가 단지부터 호남권 1번가 및 해양 랜드마크까지 지역별 시세를 확인하세요
              </p>
            </div>

            <button
              onClick={() => onNavigate('regions')}
              className="mt-4 sm:mt-0 inline-flex items-center space-x-1 text-xs font-bold text-stone-900 hover:text-stone-700 transition-colors"
            >
              <span>지역 분석 전체보기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.slice(0, 6).map((region) => (
              <div
                key={region.id}
                onClick={() => onNavigate('regions', region.id)}
                className="group relative h-72 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={region.heroImage}
                  alt={region.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {region.city}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs text-amber-300 font-medium tracking-wide block mb-0.5">
                    {region.badge}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {region.name}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-1">
                    평균 매매 {region.avgPriceSale} · 매물 {region.propertyCount}건
                  </p>

                  <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-xs text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>지역 상세 분석 및 매물</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NEW LISTINGS (신규 등록 매물) */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-widest block mb-1">
              Just Listed
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              실시간 신규 등록 매물
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              공부 서류 검토 및 현장 실사를 완료하여 금주 새롭게 등록된 검증 매물입니다
            </p>
          </div>

          <button
            onClick={() => onNavigate('properties')}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-1 text-xs font-bold text-stone-900 hover:text-amber-800 transition-colors"
          >
            <span>매물 검색으로 이동</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {newProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              isCompared={compareList.includes(property.id)}
              onToggleFavorite={onToggleFavorite}
              onToggleCompare={onToggleCompare}
              onClick={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* 6. SPECIALIZED BROKERAGE SERVICES (전문 서비스 가치 제안) */}
      <section className="py-16 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
              Our Expertise
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              단순 중개를 넘어선 자산가치 극대화 솔루션
            </h2>
            <p className="text-stone-400 text-sm mt-3 leading-relaxed">
              루체 리얼티는 국내 최상위 고객을 위한 전문적인 법률·세무·실사 네트워크를 갖추고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-950 p-8 rounded-xl border border-stone-800 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">VIP 주거 자산 컨설팅</h3>
              <p className="text-stone-400 text-xs leading-relaxed">
                펜트하우스, 고급빌라, 한강뷰 아파트 등 희소 자산의 프라이빗 매수·매도 자문 및 비밀 보장 1:1 투어를 전담합니다.
              </p>
              <ul className="text-xs text-stone-300 space-y-1.5 pt-2 border-t border-stone-800">
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  비공개 오프마켓(Off-market) 매물 연결
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  소유주 1:1 맞춤형 매각 조건 조율
                </li>
              </ul>
            </div>

            <div className="bg-stone-950 p-8 rounded-xl border border-stone-800 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">상업용 빌딩 & 수익형 부동산</h3>
              <p className="text-stone-400 text-xs leading-relaxed">
                도심 핵심 상권 빌딩, 메디컬 타워, 사옥 부지의 임대차 재구성 및 매입 매각 가치평가(DCF 분석)를 지원합니다.
              </p>
              <ul className="text-xs text-stone-300 space-y-1.5 pt-2 border-t border-stone-800">
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  테넌트 구성 및 임대 수익률 분석 보고서
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  법인 세무 및 취득세·양도세 시뮬레이션
                </li>
              </ul>
            </div>

            <div className="bg-stone-950 p-8 rounded-xl border border-stone-800 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">매도 및 임대 전속 대행</h3>
              <p className="text-stone-400 text-xs leading-relaxed">
                프리미엄 사진 촬영, 고해상도 드론 영상, 전문 브로슈어 제작을 통해 귀하의 부동산을 가장 품격 있게 브랜딩합니다.
              </p>
              <ul className="text-xs text-stone-300 space-y-1.5 pt-2 border-t border-stone-800">
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  검증된 구매력의 적격 바이어 매칭
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  계약 체결부터 소유권 이전 원스톱 동행
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STRATEGIC INQUIRY CTA BANNER */}
      <section className="py-20 bg-stone-100 border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900 rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 z-10 text-center md:text-left">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                Direct Advisory Service
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                소유하신 부동산의 <br className="hidden sm:inline" />
                정확한 시장 가치를 확인해 보세요
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-md leading-relaxed">
                매도, 임대, 세무 자문 등 전문가의 정밀한 시세 분석 및 1:1 비공개 상담을 약속드립니다.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 z-10 w-full md:w-auto">
              <a
                href="tel:02-588-3490"
                className="w-full sm:w-auto px-6 py-3.5 bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold rounded-lg border border-stone-700 transition-colors flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>02-588-3490</span>
              </a>

              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-lg shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>상담 및 매도의뢰 신청</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
