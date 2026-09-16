import React, { useState } from 'react';
import { Property } from '../../types/property';
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers, ExternalLink } from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
  selectedPropertyId: string | null;
  onSelectProperty: (id: string) => void;
  onOpenDetail: (id: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
  onOpenDetail,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapStyle, setMapStyle] = useState<'standard' | 'satellite'>('standard');
  const [activeRegion, setActiveRegion] = useState<'all' | 'seoul' | 'gwangju' | 'busan'>('all');

  // Selected property
  const activeProperty = properties.find((p) => p.id === selectedPropertyId) || null;

  return (
    <div className="relative w-full h-full bg-[#E5E9EC] overflow-hidden select-none flex flex-col">
      {/* Top Map Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Quick Region Focus Pill */}
        <div className="pointer-events-auto flex items-center space-x-1.5 bg-white/95 backdrop-blur-md p-1 rounded-md shadow-md border border-stone-200">
          <button
            onClick={() => setActiveRegion('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded ${
              activeRegion === 'all'
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            전체 ({properties.length})
          </button>
          <button
            onClick={() => setActiveRegion('seoul')}
            className={`px-2.5 py-1 text-xs font-semibold rounded ${
              activeRegion === 'seoul'
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            수도권 · 서울
          </button>
          <button
            onClick={() => setActiveRegion('gwangju')}
            className={`px-2.5 py-1 text-xs font-semibold rounded ${
              activeRegion === 'gwangju'
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            광주 · 호남
          </button>
          <button
            onClick={() => setActiveRegion('busan')}
            className={`px-2.5 py-1 text-xs font-semibold rounded ${
              activeRegion === 'busan'
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            부산 · 해운대
          </button>
        </div>

        {/* Layer / Style toggle */}
        <div className="pointer-events-auto flex items-center space-x-2 bg-white/95 backdrop-blur-md p-1 rounded-md shadow-md border border-stone-200">
          <button
            onClick={() => setMapStyle(mapStyle === 'standard' ? 'satellite' : 'standard')}
            className="p-1.5 text-stone-700 hover:text-stone-950 text-xs font-medium flex items-center"
            title="지도 스타일 전환"
          >
            <Layers className="w-3.5 h-3.5 mr-1" />
            {mapStyle === 'standard' ? '일반지도' : '위성/지형'}
          </button>
        </div>
      </div>

      {/* Map Graphic Canvas / Simulation with realistic grid and landmass */}
      <div 
        className={`relative flex-1 w-full h-full transition-all duration-500 flex items-center justify-center ${
          mapStyle === 'satellite' ? 'bg-stone-900' : 'bg-[#e4ebf0]'
        }`}
        style={{
          backgroundImage: mapStyle === 'satellite' 
            ? 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)' 
            : 'radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Stylized River & Topography curves */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -100 280 C 150 250, 280 340, 500 310 C 720 280, 850 360, 1200 330"
            fill="none"
            stroke={mapStyle === 'satellite' ? '#2563eb' : '#93c5fd'}
            strokeWidth="32"
            strokeLinecap="round"
          />
          <path
            d="M 120 0 C 180 180, 240 290, 290 500"
            fill="none"
            stroke={mapStyle === 'satellite' ? '#1e40af' : '#bfdbfe'}
            strokeWidth="14"
          />
        </svg>

        {/* Region Labels */}
        <div className="absolute top-1/4 left-1/3 text-stone-400 font-serif-luxury tracking-widest text-xs pointer-events-none">
          SEOUL METROPOLITAN AREA
        </div>
        <div className="absolute bottom-1/4 left-1/4 text-stone-400 font-serif-luxury tracking-widest text-xs pointer-events-none">
          GWANGJU / HONAM REGION
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-stone-400 font-serif-luxury tracking-widest text-xs pointer-events-none">
          BUSAN METROPOLITAN AREA
        </div>

        {/* Interactive Property Pins */}
        <div className="absolute inset-0 p-8 sm:p-14 flex flex-wrap items-center justify-around">
          {properties.map((prop, index) => {
            const isSelected = prop.id === selectedPropertyId;

            // Region visibility filter
            if (activeRegion === 'seoul' && prop.location.city !== '서울특별시') return null;
            if (activeRegion === 'gwangju' && prop.location.city !== '광주광역시') return null;
            if (activeRegion === 'busan' && prop.location.city !== '부산광역시') return null;

            // Approximate position offsets for clean layout
            const positions = [
              { top: '32%', left: '38%' }, // Hannam 1
              { top: '38%', left: '42%' }, // Nine One
              { top: '26%', left: '50%' }, // Acro
              { top: '48%', left: '44%' }, // One Bailey
              { top: '42%', left: '56%' }, // PH129
              { top: '68%', left: '28%' }, // Bongseon
              { top: '74%', left: '34%' }, // Sangmu
              { top: '72%', left: '74%' }, // Haeundae
            ];
            const pos = positions[index % positions.length];

            return (
              <div
                key={prop.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group"
              >
                {/* Custom Zillow/Redfin Style Price Pill Marker */}
                <button
                  type="button"
                  onClick={() => onSelectProperty(prop.id)}
                  className={`relative flex items-center px-2.5 py-1.5 rounded-full font-bold text-xs shadow-md transition-all duration-200 transform hover:scale-110 ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 ring-4 ring-stone-900 ring-offset-2 z-30 scale-110'
                      : 'bg-stone-900 text-white hover:bg-black'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 mr-1 ${isSelected ? 'text-stone-950' : 'text-amber-400'}`} />
                  <span>{prop.price.priceShort}</span>
                  
                  {/* Triangle pointer bottom */}
                  <div
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
                      isSelected ? 'bg-amber-500' : 'bg-stone-900'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Property Popup Card */}
        {activeProperty && (
          <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 z-30 bg-white rounded-lg shadow-2xl border border-stone-200 p-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex space-x-3">
              <img
                src={activeProperty.images[0]}
                alt={activeProperty.title}
                className="w-24 h-24 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-800">
                      {activeProperty.transactionType === 'sale' ? '매매' : activeProperty.transactionType === 'jeonse' ? '전세' : '월세'}
                    </span>
                    <button
                      onClick={() => onSelectProperty('')}
                      className="text-stone-400 hover:text-stone-600 text-xs p-1"
                    >
                      ✕
                    </button>
                  </div>
                  <h4 className="text-base font-bold text-stone-950 mt-1 truncate">
                    {activeProperty.price.priceDisplay}
                  </h4>
                  <p className="text-xs font-medium text-stone-700 truncate">
                    {activeProperty.title}
                  </p>
                  <p className="text-[11px] text-stone-500 truncate">
                    {activeProperty.location.city} {activeProperty.location.district} · {activeProperty.specs.exclusivePyeong}평
                  </p>
                </div>

                <button
                  onClick={() => onOpenDetail(activeProperty.id)}
                  className="mt-2 w-full py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-black rounded transition-colors flex items-center justify-center"
                >
                  매물 상세정보 보기
                  <ExternalLink className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Map Navigation Controls */}
      <div className="absolute bottom-6 left-6 z-20 flex flex-col space-y-1.5 bg-white/95 backdrop-blur-md rounded-md shadow-md border border-stone-200 p-1">
        <button
          onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2))}
          className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded"
          title="확대"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.6))}
          className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded"
          title="축소"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => { setActiveRegion('all'); setZoomLevel(1); }}
          className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded"
          title="지도 초기화"
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
