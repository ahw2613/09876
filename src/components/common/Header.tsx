import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Heart, 
  Scale, 
  Menu, 
  X, 
  Search, 
  ArrowUpRight, 
  ShieldCheck,
  Settings
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, extraParam?: string) => void;
  favoritesCount: number;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenConsultation: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  favoritesCount,
  compareCount,
  onOpenCompare,
  onOpenConsultation,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'properties', label: '매물 탐색' },
    { id: 'regions', label: '지역 가이드' },
    { id: 'services', label: '전문 서비스' },
    { id: 'about', label: '회사 소개' },
    { id: 'contact', label: '상담 · 매도의뢰' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Top Utility Ribbon */}
      <div className="bg-stone-900 text-stone-300 text-xs px-4 sm:px-8 py-2 hidden md:flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center space-x-6">
          <span className="flex items-center text-stone-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            100% 소속 공인중개사 실매물 검증 보증제
          </span>
          <span className="text-stone-500">|</span>
          <span className="text-stone-400">
            강남 파이낸스 센터 본사 · 호남 권역 자산관리본부 운영
          </span>
        </div>

        <div className="flex items-center space-x-5">
          <a 
            href="tel:02-588-3490" 
            className="flex items-center text-stone-200 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 mr-1 text-amber-400" />
            <span className="font-medium tracking-wider">02-588-3490</span>
            <span className="text-stone-400 text-[11px] ml-1">(AM 09:00 - PM 08:00)</span>
          </a>
          <span className="text-stone-700">|</span>
          <button 
            onClick={() => onNavigate('contact')}
            className="text-stone-300 hover:text-white transition-colors flex items-center"
          >
            내 매물 접수하기
            <ArrowUpRight className="w-3 h-3 ml-0.5" />
          </button>
          <span className="text-stone-700">|</span>
          <button 
            onClick={onOpenAdmin}
            className="text-stone-400 hover:text-amber-300 transition-colors flex items-center"
            title="중개사 매물 관리 CMS"
          >
            <Settings className="w-3 h-3 mr-1" />
            중개사 CMS
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
          className="cursor-pointer flex items-center space-x-3 group"
          id="header-brand-logo"
        >
          <div className="w-10 h-10 bg-stone-900 text-amber-400 flex items-center justify-center rounded-sm group-hover:bg-black transition-colors shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif-luxury font-bold text-xl tracking-[0.18em] text-stone-900 group-hover:text-black">
                LUCE
              </span>
              <span className="text-[10px] tracking-widest text-amber-700 font-semibold px-1.5 py-0.5 bg-amber-50 rounded border border-amber-200/60 uppercase">
                Realty
              </span>
            </div>
            <p className="text-[10px] text-stone-500 tracking-wider">루체 부동산 중개법인 & 자산관리</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                id={`nav-link-${item.id}`}
                className={`relative text-[15px] font-medium transition-colors py-2 ${
                  isActive 
                    ? 'text-stone-900 font-semibold' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-stone-900 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Consultation CTA */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Quick Search trigger */}
          <button
            onClick={() => onNavigate('properties')}
            className="p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
            title="매물 바로 검색"
            aria-label="매물 검색창 열기"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Comparison button */}
          <button
            onClick={onOpenCompare}
            id="header-compare-btn"
            className="relative p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
            title="매물 비교함"
            aria-label="매물 비교함 열기"
          >
            <Scale className="w-5 h-5" />
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-stone-900 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {compareCount}
              </span>
            )}
          </button>

          {/* Favorites button */}
          <button
            onClick={() => onNavigate('properties', 'favorites')}
            id="header-favorites-btn"
            className="relative p-2.5 text-stone-600 hover:text-rose-600 hover:bg-stone-100 rounded-full transition-colors"
            title="관심 매물 목록"
            aria-label="관심 매물 보기"
          >
            <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Main Inquiry CTA */}
          <button
            onClick={onOpenConsultation}
            id="header-consultation-btn"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-all rounded-sm shadow-xs hover:shadow-md"
          >
            1:1 VIP 상담신청
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="p-2 text-stone-700 hover:text-stone-900 lg:hidden rounded-md hover:bg-stone-100"
            aria-label="모바일 메뉴"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 mb-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 text-base font-medium rounded-md transition-colors ${
                  currentTab === item.id 
                    ? 'bg-stone-100 text-stone-900 font-semibold' 
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-600 px-2 py-1">
              <span>관심 매물 ({favoritesCount}개)</span>
              <button 
                onClick={() => { onNavigate('properties', 'favorites'); setMobileMenuOpen(false); }}
                className="text-stone-900 font-medium underline"
              >
                목록보기
              </button>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-600 px-2 py-1">
              <span>비교함 ({compareCount}개)</span>
              <button 
                onClick={() => { onOpenCompare(); setMobileMenuOpen(false); }}
                className="text-stone-900 font-medium underline"
              >
                비교하기
              </button>
            </div>

            <button
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-stone-900 rounded-sm"
            >
              1:1 VIP 전문 상담 신청
            </button>

            <div className="flex items-center justify-between pt-2">
              <a
                href="tel:02-588-3490"
                className="flex items-center text-xs font-semibold text-stone-800"
              >
                <Phone className="w-3.5 h-3.5 mr-1 text-amber-600" />
                대표 직통: 02-588-3490
              </a>
              <button
                onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center"
              >
                <Settings className="w-3 h-3 mr-1" />
                중개사 CMS
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
