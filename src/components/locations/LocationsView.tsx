import React, { useState } from 'react';
import { RegionInfo, Property } from '../../types/property';
import { PropertyCard } from '../properties/PropertyCard';
import { 
  MapPin, 
  TrendingUp, 
  GraduationCap, 
  Train, 
  Building, 
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface LocationsViewProps {
  regions: RegionInfo[];
  properties: Property[];
  favorites: string[];
  compareList: string[];
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectProperty: (id: string) => void;
  selectedRegionId?: string;
  onOpenConsultation: (topic?: string) => void;
}

export const LocationsView: React.FC<LocationsViewProps> = ({
  regions,
  properties,
  favorites,
  compareList,
  onToggleFavorite,
  onToggleCompare,
  onSelectProperty,
  selectedRegionId,
  onOpenConsultation,
}) => {
  const [activeRegionId, setActiveRegionId] = useState<string>(
    selectedRegionId || regions[0]?.id || ''
  );

  const activeRegion = regions.find((r) => r.id === activeRegionId) || regions[0];

  // Properties in this region
  const regionProperties = properties.filter((p) => {
    if (activeRegion.id.includes('yongsan')) return p.location.district === '용산구';
    if (activeRegion.id.includes('gangnam')) return p.location.district === '강남구' || p.location.district === '서초구';
    if (activeRegion.id.includes('seongsu')) return p.location.district === '성동구';
    if (activeRegion.id.includes('bongseon')) return p.location.dong === '봉선동';
    if (activeRegion.id.includes('sangmu')) return p.location.dong === '치평동' || p.propertyType === 'commercial';
    if (activeRegion.id.includes('haeundae')) return p.location.city === '부산광역시';
    return false;
  });

  return (
    <div className="min-h-screen bg-stone-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
            Regional Analysis & Insights
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            대한민국 핵심 권역별 분석 가이드
          </h1>
          <p className="text-sm text-stone-500 mt-2 leading-relaxed">
            서울의 최상위 부촌부터 광주·호남 명품 학군 및 비즈니스 거점까지, 권역별 주거 환경과 시세 동향, 추천 매물을 분석해 드립니다.
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setActiveRegionId(reg.id)}
              className={`px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeRegionId === reg.id
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>{reg.name}</span>
              <span className="ml-1.5 opacity-60 text-[10px]">({reg.city.slice(0, 2)})</span>
            </button>
          ))}
        </div>

        {/* Selected Region Hero Banner */}
        {activeRegion && (
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-900 text-white">
            <div className="absolute inset-0 z-0">
              <img
                src={activeRegion.heroImage}
                alt={activeRegion.name}
                className="w-full h-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
            </div>

            <div className="relative z-10 p-6 sm:p-12 max-w-2xl space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeRegion.city} · {activeRegion.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {activeRegion.koreanName}
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {activeRegion.description}
              </p>

              {/* Price badges */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium">
                <div className="bg-stone-800/80 backdrop-blur-xs px-4 py-2 rounded-lg border border-stone-700">
                  <span className="text-stone-400 block text-[11px]">평균 매매 시세</span>
                  <span className="text-base font-bold text-amber-400 font-sans-modern">{activeRegion.avgPriceSale}</span>
                </div>
                <div className="bg-stone-800/80 backdrop-blur-xs px-4 py-2 rounded-lg border border-stone-700">
                  <span className="text-stone-400 block text-[11px]">평균 전세 시세</span>
                  <span className="text-base font-bold text-white font-sans-modern">{activeRegion.avgPriceJeonse}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Region Analysis 3 Columns (Landmarks, Schools, Transport) */}
        {activeRegion && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Landmarks */}
            <div className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm">
                <Building className="w-4 h-4 text-amber-600" />
                <h3>주요 랜드마크 & 프리미엄 단지</h3>
              </div>
              <ul className="space-y-2 text-xs text-stone-600">
                {activeRegion.keyLandmarks.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2 p-2 rounded bg-stone-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-900 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Schools & Education */}
            <div className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <h3>명문 학군 및 교육 환경</h3>
              </div>
              <ul className="space-y-2 text-xs text-stone-600">
                {activeRegion.schools.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2 p-2 rounded bg-stone-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-900 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Transport & Development */}
            <div className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-stone-900 font-bold text-sm">
                <Train className="w-4 h-4 text-amber-600" />
                <h3>교통망 및 주요 개발 호재</h3>
              </div>
              <ul className="space-y-2 text-xs text-stone-600">
                {activeRegion.transport.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2 p-2 rounded bg-stone-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-900 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Region Curated Properties */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-200">
            <div>
              <h3 className="text-xl font-bold text-stone-900">
                {activeRegion?.name} 추천 실매물
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                현재 즉시 상담 가능한 검증된 매물 {regionProperties.length}건
              </p>
            </div>

            <button
              onClick={() => onOpenConsultation(`[${activeRegion?.name}] 지역 맞춤 매물 탐색 의뢰`)}
              className="px-4 py-2 bg-stone-900 hover:bg-black text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center space-x-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>이 지역 매물 맞춤 의뢰</span>
            </button>
          </div>

          {regionProperties.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-stone-200 space-y-3">
              <p className="text-stone-600 text-sm">
                현재 온라인에 공개된 매물 외에 <strong>비공개 오프마켓(Off-market) 매물</strong>이 준비되어 있습니다.
              </p>
              <button
                onClick={() => onOpenConsultation(`[${activeRegion?.name}] 비공개 매물 조회 요청`)}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-md"
              >
                비공개 매물 1:1 유선 문의
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isFavorite={favorites.includes(prop.id)}
                  isCompared={compareList.includes(prop.id)}
                  onToggleFavorite={onToggleFavorite}
                  onToggleCompare={onToggleCompare}
                  onClick={onSelectProperty}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
