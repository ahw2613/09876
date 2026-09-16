import React from 'react';
import { Property } from '../../types/property';
import { Heart, Scale, MapPin, Eye, Check } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  isCompared: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onClick: (id: string) => void;
  compact?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  isCompared,
  onToggleFavorite,
  onToggleCompare,
  onClick,
  compact = false,
}) => {
  const {
    id,
    title,
    subtitle,
    transactionType,
    price,
    location,
    specs,
    tags,
    images,
    isFeatured,
    isNew,
    viewsCount,
  } = property;

  const transactionLabel = 
    transactionType === 'sale' ? '매매' :
    transactionType === 'jeonse' ? '전세' : '월세';

  const transactionBadgeColor =
    transactionType === 'sale' ? 'bg-stone-900 text-white' :
    transactionType === 'jeonse' ? 'bg-amber-800 text-white' : 'bg-emerald-800 text-white';

  return (
    <article
      id={`property-card-${id}`}
      onClick={() => onClick(id)}
      className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-stone-200/80 hover:border-stone-400 hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Thumbnail Container with 16:10 or 4:3 Aspect Ratio */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
        <img
          src={images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-sm tracking-wide shadow-xs ${transactionBadgeColor}`}>
            {transactionLabel}
          </span>
          {isFeatured && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-sm bg-amber-500 text-stone-950 tracking-wide shadow-xs">
              추천 매물
            </span>
          )}
          {isNew && (
            <span className="text-xs font-medium px-2 py-1 rounded-sm bg-white/90 backdrop-blur-xs text-stone-800 tracking-wide border border-stone-200">
              NEW
            </span>
          )}
        </div>

        {/* Top Right Actions (Favorite & Compare) */}
        <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
          {/* Compare Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(id);
            }}
            title={isCompared ? '비교함에서 제거' : '매물 비교함에 추가'}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
              isCompared
                ? 'bg-stone-900 text-amber-400'
                : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-950'
            }`}
          >
            {isCompared ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Scale className="w-4 h-4" />}
          </button>

          {/* Favorite Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(id);
            }}
            title={isFavorite ? '관심 매물 해제' : '관심 매물 저장'}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
              isFavorite
                ? 'bg-white text-rose-600'
                : 'bg-white/80 text-stone-700 hover:bg-white hover:text-rose-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Location Dong Overlay at bottom */}
        <div className="absolute bottom-2 left-3 text-white text-[11px] font-medium bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-sm flex items-center">
          <MapPin className="w-3 h-3 mr-1 text-amber-400" />
          {location.city} {location.district} {location.dong}
        </div>

        {/* Views counter */}
        <div className="absolute bottom-2 right-3 text-white/90 text-[11px] bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-sm flex items-center">
          <Eye className="w-3 h-3 mr-1" />
          {viewsCount.toLocaleString()}
        </div>
      </div>

      {/* Card Content Section */}
      <div className={`p-4 flex-1 flex flex-col justify-between ${compact ? 'space-y-2' : 'space-y-3'}`}>
        <div>
          {/* Price Header (Zillow / Redfin Style Big Price) */}
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-950 font-sans-modern">
              {price.priceDisplay}
            </span>
            {price.pricePyeongEstimated && (
              <span className="text-xs text-stone-500 font-medium">
                {price.pricePyeongEstimated}
              </span>
            )}
          </div>

          {/* Property Title */}
          <h3 className="font-semibold text-stone-900 text-base leading-snug line-clamp-1 group-hover:text-amber-900 transition-colors">
            {title}
          </h3>

          {/* Subtitle / Key highlights */}
          {!compact && (
            <p className="text-xs text-stone-500 line-clamp-1 mt-1 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Specs Matrix (Area, Rooms, Bath, Floor) */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-700">
          <div className="flex items-center space-x-3 divide-x divide-stone-200">
            <div>
              <span className="font-semibold text-stone-900">{specs.exclusivePyeong}평</span>
              <span className="text-[11px] text-stone-500 ml-1">({specs.exclusiveAreaM2}㎡)</span>
            </div>
            <div className="pl-3">
              <span>방 {specs.rooms} · 욕실 {specs.bathrooms}</span>
            </div>
            <div className="pl-3 hidden sm:block">
              <span>{specs.floor.split('/')[0]}</span>
            </div>
          </div>
        </div>

        {/* Tag pills */}
        {!compact && tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
