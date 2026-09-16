import React from 'react';
import { Building2, Phone, Mail, MapPin, Shield, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, extraParam?: string) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand + Value Proposition + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-stone-800">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-400 text-stone-950 flex items-center justify-center rounded-sm font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif-luxury font-bold text-2xl tracking-[0.2em] text-white">
                  LUCE
                </span>
                <span className="text-xs text-amber-400 tracking-widest block font-medium">
                  REAL ESTATE & ASSET MANAGEMENT
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-sm leading-relaxed pr-6">
              루체 부동산 중개법인은 국내 최정상 하이엔드 주거 자산과 프라임 상업용 빌딩의 
              가치 평가, 자산 승계, 매각 및 임대 마케팅을 전담하는 프리미엄 부동산 전문 그룹입니다.
              신뢰와 품격으로 고객의 소중한 자산 가치를 극대화합니다.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded bg-stone-900 text-amber-300 border border-stone-800">
                <Shield className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                한국공인중개사협회 정회원
              </span>
              <span className="text-xs text-stone-400">100% 검증 실매물 원칙</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">매물 탐색</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => onNavigate('properties')} className="hover:text-white transition-colors">
                    전체 매물 보기
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('properties')} className="hover:text-white transition-colors">
                    하이엔드 펜트하우스
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('properties')} className="hover:text-white transition-colors">
                    프리미엄 아파트
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('properties')} className="hover:text-white transition-colors">
                    수익형 상업용 빌딩
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('properties', 'favorites')} className="hover:text-white transition-colors">
                    나의 관심 매물
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">핵심 지역</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => onNavigate('regions')} className="hover:text-white transition-colors">
                    용산 · 한남동
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('regions')} className="hover:text-white transition-colors">
                    강남 · 청담 · 반포
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('regions')} className="hover:text-white transition-colors">
                    성수 · 서울숲
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('regions')} className="hover:text-white transition-colors">
                    광주 남구 봉선동
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('regions')} className="hover:text-white transition-colors">
                    광주 서구 상무지구
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">고객 상담</h4>
              <div className="space-y-3">
                <a 
                  href="tel:02-588-3490" 
                  className="block p-3 rounded bg-stone-900 border border-stone-800 hover:border-amber-400/40 transition-colors"
                >
                  <span className="text-[11px] text-stone-400 block">전화 상담 직통</span>
                  <span className="text-base font-bold text-amber-400">02-588-3490</span>
                </a>
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-2.5 px-3 rounded text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center"
                >
                  온라인 상담 접수
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Korean Legal Brokerage Disclosures */}
        <div className="py-8 border-b border-stone-800 text-xs text-stone-400 space-y-3">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-stone-300 font-medium">
            <span>상호명: (주)루체부동산중개법인</span>
            <span>대표자: 박도현</span>
            <span>중개사무소등록번호: 제 11680-2023-00412호</span>
            <span>사업자등록번호: 214-88-92041</span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-stone-400" />
              본사: 서울특별시 강남구 테헤란로 152 강남파이낸스센터 24층 (역삼동)
            </span>
            <span className="flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-stone-400" />
              호남본부: 광주광역시 서구 시청로 30 상무센트럴타워 8층
            </span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="flex items-center">
              <Phone className="w-3 h-3 mr-1 text-stone-400" />
              대표번호: 02-588-3490
            </span>
            <span>팩스: 02-588-3491</span>
            <span className="flex items-center">
              <Mail className="w-3 h-3 mr-1 text-stone-400" />
              문의: advisory@lucerealty.co.kr
            </span>
            <span>개인정보보호책임자: 정현우 수석본부장</span>
          </div>

          <p className="text-stone-400 leading-relaxed text-[11px] pt-1">
            [공인중개사법에 따른 고지] 본 사이트에 게재된 매물 정보는 소속 공인중개사의 현장 실사 및 공부 서류 열람을 거쳐 등록되며, 
            계약 체결 여부에 따라 실시간 상태가 변동될 수 있습니다. 거래 전 중개대상물 확인·설명서를 반드시 교부해 드립니다.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400">
          <p>© 2026 LUCE Real Estate & Advisory Co., Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-3 sm:mt-0">
            <button onClick={() => alert('개인정보처리방침: 당사는 고객님의 소중한 개인정보를 안전하게 암호화하여 관리하며, 상담 목적 외 용도로 활용하지 않습니다.')} className="hover:text-stone-300">
              개인정보처리방침
            </button>
            <button onClick={() => alert('이용약관: 루체 리얼티 플랫폼 이용 조건 및 매물 정보 열람 규정을 확인하실 수 있습니다.')} className="hover:text-stone-300">
              이용약관
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-stone-300">
              공인중개사 윤리강령
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
