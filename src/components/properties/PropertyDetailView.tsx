import React, { useState } from 'react';
import { Property } from '../../types/property';
import { 
  ArrowLeft, 
  Heart, 
  Scale, 
  Share2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  Compass, 
  Car, 
  Layers, 
  Maximize, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface PropertyDetailViewProps {
  property: Property;
  allProperties: Property[];
  isFavorite: boolean;
  isCompared: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onBack: () => void;
  onSelectProperty: (id: string) => void;
  onOpenConsultation: (propertyTitle?: string) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  allProperties,
  isFavorite,
  isCompared,
  onToggleFavorite,
  onToggleCompare,
  onBack,
  onSelectProperty,
  onOpenConsultation,
}) => {
  const [activePhotoModal, setActivePhotoModal] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [copyToast, setCopyToast] = useState(false);

  const {
    id,
    title,
    subtitle,
    complexName,
    transactionType,
    price,
    location,
    specs,
    features,
    tags,
    images,
    description,
    keyPoints,
    agent,
    surroundings,
    viewsCount,
  } = property;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2500);
  };

  const similarProperties = allProperties
    .filter((p) => p.id !== id && (p.location.city === location.city || p.propertyType === property.propertyType))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-stone-50 pb-28 sm:pb-20">
      {/* Toast Notification for share */}
      {copyToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-2.5 rounded-md shadow-2xl animate-in fade-in slide-in-from-top-2 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>매물 링크가 클립보드에 복사되었습니다.</span>
        </div>
      )}

      {/* Top Breadcrumb & Control Bar */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-xs font-semibold text-stone-600 hover:text-stone-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            매물 목록으로 돌아가기
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleCompare(id)}
              className={`p-2 rounded-md text-xs font-medium border flex items-center space-x-1 transition-colors ${
                isCompared
                  ? 'bg-stone-900 text-amber-400 border-stone-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isCompared ? '비교함 담김' : '매물 비교'}</span>
            </button>

            <button
              onClick={() => onToggleFavorite(id)}
              className={`p-2 rounded-md text-xs font-medium border flex items-center space-x-1 transition-colors ${
                isFavorite
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
              <span className="hidden sm:inline">{isFavorite ? '관심등록 완료' : '관심등록'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-md text-xs font-medium bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 transition-colors flex items-center space-x-1"
              title="링크 공유"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">공유</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Section (Compass / Sotheby's style 5-grid hero) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative rounded-xl overflow-hidden shadow-sm bg-stone-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-2 h-[380px] sm:h-[480px] lg:h-[540px]">
            {/* Main Featured Photo */}
            <div 
              className="md:col-span-2 md:row-span-2 relative overflow-hidden cursor-pointer group"
              onClick={() => { setPhotoIndex(0); setActivePhotoModal(true); }}
            >
              <img
                src={images[0]}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* 4 Secondary Grid Photos */}
            {images.slice(1, 5).map((imgUrl, idx) => (
              <div
                key={idx}
                className="hidden md:block relative overflow-hidden cursor-pointer group"
                onClick={() => { setPhotoIndex(idx + 1); setActivePhotoModal(true); }}
              >
                <img
                  src={imgUrl}
                  alt={`${title} - 사진 ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>

          {/* Floating View All Photos Button */}
          <button
            onClick={() => { setPhotoIndex(0); setActivePhotoModal(true); }}
            className="absolute bottom-4 right-4 bg-stone-900/85 hover:bg-stone-900 text-white backdrop-blur-md px-4 py-2 rounded-md text-xs font-semibold flex items-center space-x-2 transition-all shadow-md"
          >
            <Maximize className="w-3.5 h-3.5 text-amber-400" />
            <span>사진 전체보기 ({images.length}장)</span>
          </button>
        </div>
      </div>

      {/* Main Detail Grid (Left Content + Right Sticky Agent / Consultation Card) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Main Information (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Block: Badges, Title, Address */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded bg-stone-900 text-white tracking-wide">
                  {transactionType === 'sale' ? '매매' : transactionType === 'jeonse' ? '전세' : '월세'}
                </span>
                {complexName && (
                  <span className="px-2.5 py-1 text-xs font-semibold rounded bg-stone-100 text-stone-800">
                    {complexName}
                  </span>
                )}
                {property.isFeatured && (
                  <span className="px-2.5 py-1 text-xs font-bold rounded bg-amber-500 text-stone-950">
                    VVIP 추천 매물
                  </span>
                )}
                <span className="text-xs text-stone-400 flex items-center ml-auto">
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  조회 {viewsCount.toLocaleString()}회
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight leading-snug">
                  {title}
                </h1>
                <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
                  {subtitle}
                </p>
              </div>

              <div className="flex items-center text-xs sm:text-sm text-stone-500 pt-2 border-t border-stone-100">
                <MapPin className="w-4 h-4 mr-1.5 text-amber-600 shrink-0" />
                <span>{location.city} {location.district} {location.dong} {location.roadAddress}</span>
                {location.landmark && (
                  <span className="text-stone-400 ml-2 hidden sm:inline">({location.landmark})</span>
                )}
              </div>
            </div>

            {/* Price & Financial Overview Block */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs">
              <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">
                가격 및 금융 정보
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
                <div>
                  <span className="text-xs text-stone-500 block">
                    {transactionType === 'sale' ? '매매 희망가' : transactionType === 'jeonse' ? '전세 보증금' : '보증금 / 월세'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-stone-950 font-sans-modern tracking-tight mt-1 block">
                    {price.priceDisplay}
                  </span>
                </div>

                {price.pricePyeongEstimated && (
                  <div className="pt-4 sm:pt-0 sm:pl-6">
                    <span className="text-xs text-stone-500 block">전용 평당 환산가</span>
                    <span className="text-lg sm:text-xl font-bold text-stone-900 mt-1 block">
                      {price.pricePyeongEstimated}
                    </span>
                  </div>
                )}

                {price.maintenanceFee && (
                  <div className="pt-4 sm:pt-0 sm:pl-6">
                    <span className="text-xs text-stone-500 block">월 평균 관리비</span>
                    <span className="text-lg sm:text-xl font-bold text-stone-900 mt-1 block">
                      약 {price.maintenanceFee}만 원
                    </span>
                    <span className="text-[11px] text-stone-400">계절 및 수도·전기 실사용량에 따라 차등</span>
                  </div>
                )}
              </div>
            </div>

            {/* Legal Property Specification Matrix (중개대상물 확인·설명서 필수 고시 항목) */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h2 className="text-base font-bold text-stone-900 flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-2 text-amber-600" />
                  중개대상물 법정 고시 정보
                </h2>
                <span className="text-[11px] text-stone-400">공인중개사법 시행령 제17조의2 준수</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-4 text-xs">
                <div>
                  <span className="text-stone-400 block mb-1">공급 / 전용면적</span>
                  <p className="font-semibold text-stone-900">
                    {specs.supplyPyeong}평 / {specs.exclusivePyeong}평
                  </p>
                  <p className="text-[11px] text-stone-500">
                    ({specs.supplyAreaM2}㎡ / {specs.exclusiveAreaM2}㎡)
                  </p>
                </div>

                <div>
                  <span className="text-stone-400 block mb-1">해당층 / 총 층수</span>
                  <p className="font-semibold text-stone-900">{specs.floor}</p>
                </div>

                <div>
                  <span className="text-stone-400 block mb-1">방 수 / 욕실 수</span>
                  <p className="font-semibold text-stone-900">방 {specs.rooms}개 / 욕실 {specs.bathrooms}개</p>
                </div>

                <div>
                  <span className="text-stone-400 block mb-1">방향</span>
                  <p className="font-semibold text-stone-900">{specs.direction}</p>
                </div>

                <div>
                  <span className="text-stone-400 block mb-1">주차 대수</span>
                  <p className="font-semibold text-stone-900">세대당 {specs.parkingPerHousehold}대</p>
                  <p className="text-[11px] text-stone-500">총 {specs.parkingTotal}대</p>
                </div>

                <div>
                  <span className="text-stone-400 block mb-1">사용승인일 (준공)</span>
                  <p className="font-semibold text-stone-900">{specs.approvalDate}</p>
                </div>

                <div>
                  <span className="text-stone-400 block mb-1">건축물 용도</span>
                  <p className="font-semibold text-stone-900">{specs.buildingType}</p>
                </div>

                <div>
                  <span className="text-stone-400 block mb-1">입주 가능일</span>
                  <p className="font-semibold text-stone-900">{specs.moveInDate}</p>
                </div>
              </div>
            </div>

            {/* Narrative Editorial Description */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-stone-900">매물 상세 설명</h2>
              <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                {description}
              </p>

              {/* Key Points */}
              <div className="pt-4 border-t border-stone-100">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
                  루체 리얼티 핵심 체크포인트
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Features & Amenities */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-stone-900">단지 및 세대 프리미엄 옵션</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 p-3 rounded-lg bg-stone-50/80 border border-stone-100 text-xs font-medium text-stone-800">
                    <span className="w-2 h-2 rounded-full bg-stone-900" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Surroundings & Transport */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-stone-900">교통 및 주변 생활 인프라</h2>
              <div className="space-y-3">
                {surroundings.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-stone-50 border border-stone-100 text-xs">
                    <span className="font-semibold text-stone-900">{item.title}</span>
                    <span className="text-stone-500 font-medium">{item.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar (4 Cols) - Agent Profile & Consultation Request */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 bg-white p-6 rounded-xl border border-stone-200 shadow-lg space-y-6">
              {/* Agent Card */}
              <div className="flex items-center space-x-4 pb-5 border-b border-stone-200">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-400"
                />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-bold text-base text-stone-950">{agent.name}</h3>
                    <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      전담 중개사
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">{agent.title}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">{agent.licenseNumber}</p>
                </div>
              </div>

              {/* Direct Call & Kakao Actions */}
              <div className="space-y-2.5">
                <a
                  href={`tel:${agent.phone}`}
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-md flex items-center justify-center space-x-2 transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>전화 상담 바로 연결 ({agent.phone})</span>
                </a>

                <button
                  onClick={() => onOpenConsultation(`[${property.title}] 매물 프라이빗 방문 투어 예약`)}
                  className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-md flex items-center justify-center space-x-2 transition-colors shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>프라이빗 현장 투어 예약</span>
                </button>

                <button
                  onClick={() => onOpenConsultation(`[${property.title}] 카카오톡 / 온라인 상세 문의`)}
                  className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-md flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-stone-600" />
                  <span>온라인 문의 남기기</span>
                </button>
              </div>

              {/* Security & Confidentiality Promise */}
              <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500 space-y-1.5">
                <div className="flex items-center text-stone-800 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  100% 실매물 확인 보증
                </div>
                <p>
                  모든 방문 투어 및 상담은 고객님의 사생활 보호를 위해 철저한 비밀 유지 협약 하에 1:1 예약제로만 진행됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-stone-900">함께 비교하기 좋은 추천 매물</h3>
                <p className="text-xs text-stone-500 mt-1">동일 권역 및 유사한 평형대의 프리미엄 매물입니다</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similarProperties.map((simProp) => (
                <div
                  key={simProp.id}
                  onClick={() => onSelectProperty(simProp.id)}
                  className="bg-white rounded-lg border border-stone-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                    <img
                      src={simProp.images[0]}
                      alt={simProp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 text-[11px] font-bold px-2 py-0.5 rounded bg-stone-900 text-white">
                      {simProp.transactionType === 'sale' ? '매매' : '전세'}
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <div className="text-base font-bold text-stone-950">
                      {simProp.price.priceDisplay}
                    </div>
                    <h4 className="text-xs font-semibold text-stone-800 truncate">
                      {simProp.title}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      {simProp.location.district} · {simProp.specs.exclusivePyeong}평
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Floating CTA Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 px-4 shadow-2xl flex items-center justify-between">
        <div>
          <span className="text-xs text-stone-500 block">
            {transactionType === 'sale' ? '매매 희망가' : '보증금/임대'}
          </span>
          <span className="text-base font-bold text-stone-950">
            {price.priceDisplay}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={`tel:${agent.phone}`}
            className="p-2.5 bg-stone-100 text-stone-900 rounded-md"
            title="전화 연결"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={() => onOpenConsultation(`[${title}] 빠른 모바일 방문 상담 신청`)}
            className="px-5 py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-md shadow-md"
          >
            1:1 상담 예약
          </button>
        </div>
      </div>

      {/* Lightbox Photo Modal */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="w-full max-w-6xl flex items-center justify-between text-white pb-4">
            <span className="text-sm font-semibold">
              {title} · ({photoIndex + 1} / {images.length})
            </span>
            <button
              onClick={() => setActivePhotoModal(false)}
              className="p-2 text-stone-400 hover:text-white rounded"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center">
            <img
              src={images[photoIndex]}
              alt={`${title} - ${photoIndex + 1}`}
              className="max-h-[75vh] max-w-full object-contain rounded"
            />

            {/* Prev / Next buttons */}
            <button
              onClick={() => setPhotoIndex((photoIndex - 1 + images.length) % images.length)}
              className="absolute left-2 p-3 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setPhotoIndex((photoIndex + 1) % images.length)}
              className="absolute right-2 p-3 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Photo Thumbnail Strip */}
          <div className="w-full max-w-4xl flex items-center justify-center space-x-2 pt-4 overflow-x-auto">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setPhotoIndex(i)}
                className={`w-16 h-12 object-cover rounded cursor-pointer transition-all ${
                  i === photoIndex ? 'ring-2 ring-amber-400 scale-105' : 'opacity-50 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
