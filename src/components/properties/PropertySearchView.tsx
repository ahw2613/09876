import React, { useState, useMemo } from 'react';
import { Property, FilterState, TransactionType, PropertyType } from '../../types/property';
import { PropertyCard } from './PropertyCard';
import { InteractiveMap } from './InteractiveMap';
import { 
  Search, 
  SlidersHorizontal, 
  Map, 
  LayoutGrid, 
  RotateCcw, 
  ChevronDown, 
  Check, 
  X,
  Building,
  Home,
  Briefcase
} from 'lucide-react';

interface PropertySearchViewProps {
  properties: Property[];
  favorites: string[];
  compareList: string[];
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectProperty: (id: string) => void;
  initialFilter?: Partial<FilterState>;
  showFavoritesOnly?: boolean;
}

export const PropertySearchView: React.FC<PropertySearchViewProps> = ({
  properties,
  favorites,
  compareList,
  onToggleFavorite,
  onToggleCompare,
  onSelectProperty,
  initialFilter,
  showFavoritesOnly = false,
}) => {
  // Search & Filter state
  const [filterState, setFilterState] = useState<FilterState>({
    keyword: initialFilter?.keyword || '',
    city: initialFilter?.city || '',
    district: initialFilter?.district || '',
    transactionType: initialFilter?.transactionType || 'all',
    propertyType: initialFilter?.propertyType || 'all',
    minPrice: 0,
    maxPrice: 3000000, // 300억
    minPyeong: 0,
    maxPyeong: 200,
    rooms: 0,
    bathrooms: 0,
    minParking: 0,
    builtWithinYears: 0,
    isNewOnly: false,
    isFeaturedOnly: false,
    sortBy: 'latest',
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'grid' | 'map'>('split');
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list');
  const [selectedMapPropertyId, setSelectedMapPropertyId] = useState<string | null>(null);

  // Filter logic
  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(item.id)) {
        return false;
      }

      // Keyword match
      if (filterState.keyword.trim()) {
        const kw = filterState.keyword.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(kw);
        const matchSubtitle = item.subtitle.toLowerCase().includes(kw);
        const matchComplex = item.complexName?.toLowerCase().includes(kw);
        const matchLocation = `${item.location.city} ${item.location.district} ${item.location.dong} ${item.location.roadAddress}`.toLowerCase().includes(kw);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(kw));

        if (!matchTitle && !matchSubtitle && !matchComplex && !matchLocation && !matchTags) {
          return false;
        }
      }

      // City filter
      if (filterState.city && !item.location.city.includes(filterState.city)) {
        return false;
      }

      // Transaction Type
      if (filterState.transactionType !== 'all' && item.transactionType !== filterState.transactionType) {
        return false;
      }

      // Property Type
      if (filterState.propertyType !== 'all' && item.propertyType !== filterState.propertyType) {
        return false;
      }

      // Price Filter
      const priceVal = item.price.salePrice || item.price.deposit || 0;
      if (filterState.minPrice > 0 && priceVal < filterState.minPrice) return false;
      if (filterState.maxPrice < 3000000 && priceVal > filterState.maxPrice) return false;

      // Area Filter
      if (filterState.minPyeong > 0 && item.specs.exclusivePyeong < filterState.minPyeong) return false;
      if (filterState.maxPyeong < 200 && item.specs.exclusivePyeong > filterState.maxPyeong) return false;

      // Rooms
      if (filterState.rooms > 0) {
        if (filterState.rooms === 4) {
          if (item.specs.rooms < 4) return false;
        } else if (item.specs.rooms !== filterState.rooms) {
          return false;
        }
      }

      // Bathrooms
      if (filterState.bathrooms > 0 && item.specs.bathrooms < filterState.bathrooms) {
        return false;
      }

      // Features
      if (filterState.isNewOnly && !item.isNew) return false;
      if (filterState.isFeaturedOnly && !item.isFeatured) return false;

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'priceDesc') {
        const pA = a.price.salePrice || a.price.deposit || 0;
        const pB = b.price.salePrice || b.price.deposit || 0;
        return pB - pA;
      }
      if (filterState.sortBy === 'priceAsc') {
        const pA = a.price.salePrice || a.price.deposit || 0;
        const pB = b.price.salePrice || b.price.deposit || 0;
        return pA - pB;
      }
      if (filterState.sortBy === 'areaDesc') {
        return b.specs.exclusivePyeong - a.specs.exclusivePyeong;
      }
      if (filterState.sortBy === 'popular') {
        return b.viewsCount - a.viewsCount;
      }
      // 'latest' default
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [properties, filterState, showFavoritesOnly, favorites]);

  const resetFilters = () => {
    setFilterState({
      keyword: '',
      city: '',
      district: '',
      transactionType: 'all',
      propertyType: 'all',
      minPrice: 0,
      maxPrice: 3000000,
      minPyeong: 0,
      maxPyeong: 200,
      rooms: 0,
      bathrooms: 0,
      minParking: 0,
      builtWithinYears: 0,
      isNewOnly: false,
      isFeaturedOnly: false,
      sortBy: 'latest',
    });
  };

  const hasActiveFilters = 
    filterState.transactionType !== 'all' ||
    filterState.propertyType !== 'all' ||
    filterState.minPrice > 0 ||
    filterState.maxPrice < 3000000 ||
    filterState.minPyeong > 0 ||
    filterState.maxPyeong < 200 ||
    filterState.rooms > 0 ||
    filterState.isNewOnly ||
    filterState.isFeaturedOnly ||
    filterState.city !== '';

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Top Search & Filter Bar */}
      <div className="bg-white border-b border-stone-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={filterState.keyword}
                onChange={(e) => setFilterState({ ...filterState, keyword: e.target.value })}
                placeholder="지역명, 아파트명, 지하철역, 매물 번호 검색 (예: 한남, 반포, 봉선, 엘시티)"
                className="w-full pl-10 pr-10 py-2.5 bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-sm text-stone-900 placeholder:text-stone-400 rounded-md border border-stone-200 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all outline-none"
              />
              {filterState.keyword && (
                <button
                  onClick={() => setFilterState({ ...filterState, keyword: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Pills (Transaction & Property Type) */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {/* Transaction Type Dropdown or Pills */}
              <div className="flex bg-stone-100 p-0.5 rounded-md text-xs font-semibold text-stone-700">
                {(['all', 'sale', 'jeonse', 'monthly'] as TransactionType[]).map((type) => {
                  const labels: Record<TransactionType, string> = {
                    all: '전체거래',
                    sale: '매매',
                    jeonse: '전세',
                    monthly: '월세',
                  };
                  const active = filterState.transactionType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setFilterState({ ...filterState, transactionType: type })}
                      className={`px-3 py-1.5 rounded transition-colors ${
                        active ? 'bg-stone-900 text-white shadow-xs' : 'hover:text-stone-950'
                      }`}
                    >
                      {labels[type]}
                    </button>
                  );
                })}
              </div>

              {/* City quick pill */}
              <select
                value={filterState.city}
                onChange={(e) => setFilterState({ ...filterState, city: e.target.value })}
                className="bg-stone-100 text-xs font-semibold text-stone-800 px-3 py-2 rounded-md border border-stone-200 outline-none cursor-pointer"
              >
                <option value="">전국 주요 권역</option>
                <option value="서울특별시">서울특별시</option>
                <option value="광주광역시">광주광역시</option>
                <option value="부산광역시">부산광역시</option>
                <option value="경기도">경기도</option>
              </select>

              {/* Advanced Filter Modal Trigger */}
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-xs font-semibold border transition-colors ${
                  hasActiveFilters
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>상세 필터</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                )}
              </button>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="p-2 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100 transition-colors"
                  title="필터 초기화"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Desktop Toggles */}
            <div className="hidden lg:flex items-center space-x-1 border border-stone-200 p-0.5 rounded-md bg-stone-50">
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 text-xs font-medium rounded flex items-center space-x-1 transition-colors ${
                  viewMode === 'split' ? 'bg-white text-stone-950 font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="목록과 지도 반반 분할 보기"
              >
                <span>분할</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 text-xs font-medium rounded flex items-center space-x-1 transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-stone-950 font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="매물 그리드 전체 보기"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>그리드</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 text-xs font-medium rounded flex items-center space-x-1 transition-colors ${
                  viewMode === 'map' ? 'bg-white text-stone-950 font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="지도 전체 화면 보기"
              >
                <Map className="w-3.5 h-3.5" />
                <span>지도</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile View Toggle Bar */}
        <div className="lg:hidden bg-white px-4 py-2 border-b border-stone-200 flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-700">
            총 <strong className="text-stone-950">{filteredProperties.length}</strong>개 매물
          </span>
          <div className="flex bg-stone-100 p-0.5 rounded-md text-xs font-semibold">
            <button
              onClick={() => setMobileTab('list')}
              className={`px-3 py-1 rounded transition-colors ${
                mobileTab === 'list' ? 'bg-stone-900 text-white' : 'text-stone-600'
              }`}
            >
              목록보기
            </button>
            <button
              onClick={() => setMobileTab('map')}
              className={`px-3 py-1 rounded transition-colors ${
                mobileTab === 'map' ? 'bg-stone-900 text-white' : 'text-stone-600'
              }`}
            >
              지도보기
            </button>
          </div>
        </div>

        {/* View Layout Renderer */}
        <div className="flex-1 flex overflow-hidden">
          {/* List Column (Shown in 'split' or 'grid' on desktop, or mobileTab === 'list') */}
          <div
            className={`flex-1 flex flex-col overflow-y-auto ${
              viewMode === 'map' ? 'hidden' : ''
            } ${
              mobileTab === 'map' ? 'hidden lg:flex' : 'flex'
            } ${
              viewMode === 'split' ? 'lg:w-1/2 xl:w-7/12 border-r border-stone-200' : 'w-full'
            }`}
          >
            {/* Results Header & Sort Controls */}
            <div className="px-4 sm:px-6 py-3.5 bg-stone-50 border-b border-stone-200/80 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-stone-900">
                  {showFavoritesOnly ? '나의 관심 매물' : '검색 결과'}
                </span>
                <span className="text-xs text-stone-500 ml-2">
                  총 <strong className="text-stone-900 font-bold">{filteredProperties.length}</strong>개 매물
                </span>
              </div>

              {/* Sort selector */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-stone-500 hidden sm:inline">정렬:</span>
                <select
                  value={filterState.sortBy}
                  onChange={(e) => setFilterState({ ...filterState, sortBy: e.target.value as any })}
                  className="bg-white border border-stone-200 text-stone-800 text-xs font-medium rounded px-2.5 py-1.5 outline-none cursor-pointer hover:border-stone-400"
                >
                  <option value="latest">최신 등록순</option>
                  <option value="priceDesc">가격 높은순</option>
                  <option value="priceAsc">가격 낮은순</option>
                  <option value="areaDesc">면적 넓은순</option>
                  <option value="popular">조회 인기순</option>
                </select>
              </div>
            </div>

            {/* Property Cards Container */}
            <div className="p-4 sm:p-6 flex-1">
              {filteredProperties.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                    <Search className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-stone-800">일치하는 매물이 없습니다</h4>
                    <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                      설정하신 조건의 매물이 현재 등록되어 있지 않습니다. 필터를 완화하시거나 맞춤 매물 알림을 의뢰해 주세요.
                    </p>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-black transition-colors inline-flex items-center space-x-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    필터 전체 초기화
                  </button>
                </div>
              ) : (
                <div
                  className={`grid gap-5 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2'
                  }`}
                >
                  {filteredProperties.map((prop) => (
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

          {/* Map Column (Shown in 'split' or 'map' on desktop, or mobileTab === 'map') */}
          <div
            className={`flex-1 h-auto relative ${
              viewMode === 'grid' ? 'hidden' : ''
            } ${
              mobileTab === 'list' ? 'hidden lg:block' : 'block'
            } ${
              viewMode === 'split' ? 'lg:w-1/2 xl:w-5/12' : 'w-full'
            }`}
          >
            <InteractiveMap
              properties={filteredProperties}
              selectedPropertyId={selectedMapPropertyId}
              onSelectProperty={(id) => setSelectedMapPropertyId(id)}
              onOpenDetail={onSelectProperty}
            />
          </div>
        </div>
      </div>

      {/* Advanced Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h3 className="text-lg font-bold text-stone-900 flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2 text-stone-700" />
                상세 조건 필터
              </h3>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Property Type Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                부동산 종류
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all', label: '전체' },
                  { id: 'apartment', label: '아파트' },
                  { id: 'penthouse', label: '펜트하우스' },
                  { id: 'officetel', label: '오피스텔' },
                  { id: 'villa', label: '고급빌라' },
                  { id: 'commercial', label: '상가·빌딩' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilterState({ ...filterState, propertyType: item.id as PropertyType })}
                    className={`py-2 text-xs font-medium rounded border transition-colors ${
                      filterState.propertyType === item.id
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Area (Pyeong) Range */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  전용 면적 (평수)
                </label>
                <span className="text-xs text-stone-900 font-semibold">
                  {filterState.minPyeong === 0 && filterState.maxPyeong >= 200
                    ? '전체 평수'
                    : `${filterState.minPyeong}평 ~ ${filterState.maxPyeong >= 200 ? '200평 이상' : `${filterState.maxPyeong}평`}`}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={filterState.minPyeong || ''}
                  onChange={(e) => setFilterState({ ...filterState, minPyeong: Number(e.target.value) })}
                  placeholder="최소 평"
                  className="w-1/2 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded"
                />
                <span className="text-stone-400">~</span>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={filterState.maxPyeong >= 200 ? '' : filterState.maxPyeong}
                  onChange={(e) => setFilterState({ ...filterState, maxPyeong: Number(e.target.value) || 200 })}
                  placeholder="최대 평"
                  className="w-1/2 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded"
                />
              </div>
            </div>

            {/* Room Count */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                최소 방 개수
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { value: 0, label: '전체' },
                  { value: 1, label: '1개' },
                  { value: 2, label: '2개' },
                  { value: 3, label: '3개' },
                  { value: 4, label: '4개+' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setFilterState({ ...filterState, rooms: item.value })}
                    className={`py-2 text-xs font-medium rounded border ${
                      filterState.rooms === item.value
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Special checkboxes */}
            <div className="pt-2 border-t border-stone-200 space-y-3">
              <label className="flex items-center space-x-2 text-xs font-medium text-stone-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterState.isFeaturedOnly}
                  onChange={(e) => setFilterState({ ...filterState, isFeaturedOnly: e.target.checked })}
                  className="rounded text-stone-900 focus:ring-stone-900"
                />
                <span>루체 리얼티 엄선 [추천 프리미엄 매물]만 보기</span>
              </label>
              <label className="flex items-center space-x-2 text-xs font-medium text-stone-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterState.isNewOnly}
                  onChange={(e) => setFilterState({ ...filterState, isNewOnly: e.target.checked })}
                  className="rounded text-stone-900 focus:ring-stone-900"
                />
                <span>최근 등록된 신규 매물 (NEW)만 보기</span>
              </label>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={resetFilters}
                className="text-xs text-stone-500 hover:text-stone-800 font-medium underline flex items-center"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                초기화
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-6 py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded shadow-md transition-colors"
              >
                필터 적용 ({filteredProperties.length}개 매물)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
