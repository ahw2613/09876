import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle, 
  Calculator, 
  FileText, 
  Camera, 
  Lock,
  PhoneCall
} from 'lucide-react';

interface ServicesViewProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigate: (tab: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenConsultation, onNavigate }) => {
  return (
    <div className="min-h-screen bg-stone-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
            Bespoke Real Estate Advisory
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            자산의 가치를 지키고 키우는 <br />
            루체 리얼티의 전속 솔루션
          </h1>
          <p className="text-sm sm:text-base text-stone-500 mt-4 leading-relaxed">
            단순 매물 소개를 넘어, 계약 체결부터 세무 자문, 사후 자산 관리까지 대한민국 최상위 고객을 위한 완벽한 올인원 서비스를 제공합니다.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-5">
            <div className="w-12 h-12 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              1. 프리미엄 매도 · 임대 전속 마케팅
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              소유하신 하이엔드 부동산을 가장 높은 가치로 신속하게 매각할 수 있도록, 건축 전문 포토그래퍼의 실내외 촬영, 드론 항공 뷰, 전용 브로슈어 제작 및 엄선된 VIP 바이어 풀에 우선 매칭합니다.
            </p>
            <ul className="space-y-2 text-xs text-stone-700 pt-3 border-t border-stone-100">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
                <span>건축 전문 화각의 인테리어 및 외관 화보 촬영</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
                <span>국내 대기업 임원 및 패밀리오피스 대상 다이렉트 프레젠테이션</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
                <span>소유자 사생활 보호를 위한 철저한 사전 신원 확인제</span>
              </li>
            </ul>
            <button
              onClick={() => onOpenConsultation('내 매물 프리미엄 매도의뢰 신청')}
              className="mt-2 text-xs font-bold text-stone-900 hover:text-amber-800 inline-flex items-center"
            >
              <span>내 매물 매도의뢰 바로가기</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-5">
            <div className="w-12 h-12 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              2. VIP 프라이빗 매수 자문 & 투어
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              공개 시장에 노출되지 않는 비공개 오프마켓(Off-market) 매물을 발굴하여, 고객의 라이프스타일과 투자 목적에 부합하는 최고의 자산을 제안하고 전용 차량을 통한 1:1 비공개 투어를 진행합니다.
            </p>
            <ul className="space-y-2 text-xs text-stone-700 pt-3 border-t border-stone-100">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
                <span>시장에 나오지 않은 희소 펜트하우스·단독주택 매물 리스트업</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
                <span>일조권, 조망권, 층간소음, 단지 커뮤니티 정밀 실사</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
                <span>가격 협상 및 잔금 일정 최적화 조율</span>
              </li>
            </ul>
            <button
              onClick={() => onOpenConsultation('VIP 프라이빗 매수 자문 신청')}
              className="mt-2 text-xs font-bold text-stone-900 hover:text-amber-800 inline-flex items-center"
            >
              <span>비공개 매수 상담 예약</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-5">
            <div className="w-12 h-12 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              3. 상업용 빌딩 자산실사 & 가치평가
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              수익형 빌딩 및 메디컬 타워의 임대차 계약 검토, 공실 해소 방안, 향후 재건축 및 리모델링에 따른 용적률 극대화 방안을 정밀 분석하는 투자 타당성 보고서를 제공합니다.
            </p>
            <ul className="space-y-2 text-xs text-stone-700 pt-3 border-t border-stone-100">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
                <span>현재 및 예상 현금흐름(DCF) 분석 및 실질 Cap Rate 산출</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
                <span>건축물 물리적 상태 실사 및 불법건축물 리스크 진단</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
                <span>우량 앵커 테넌트(병원, 금융기관, 프랜차이즈) 유치 컨설팅</span>
              </li>
            </ul>
            <button
              onClick={() => onOpenConsultation('상업용 빌딩 매입·매각 실사의뢰')}
              className="mt-2 text-xs font-bold text-stone-900 hover:text-amber-800 inline-flex items-center"
            >
              <span>빌딩 자문 문의하기</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          {/* Service 4 */}
          <div className="bg-white p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-5">
            <div className="w-12 h-12 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              4. 법률 · 세무 제휴 원스톱 자문
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              취득세, 보유세, 양도소득세는 물론 상속·증여에 따른 자산 승계 플랜을 대형 세무법인 및 부동산 전문 변호사와 연계하여 사전 시뮬레이션해 드립니다.
            </p>
            <ul className="space-y-2 text-xs text-stone-700 pt-3 border-t border-stone-100">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
                <span>취득 및 양도 시점별 절세 시뮬레이션 보고서 작성</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
                <span>법인 설립을 통한 부동산 자산 관리 플랜</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-amber-600 shrink-0" />
                <span>특약 조항 법적 검토 및 소유권 이전 등기 원스톱 처리</span>
              </li>
            </ul>
            <button
              onClick={() => onOpenConsultation('세무 및 법률 원스톱 상담 신청')}
              className="mt-2 text-xs font-bold text-stone-900 hover:text-amber-800 inline-flex items-center"
            >
              <span>원스톱 자문 신청</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

        {/* Real Estate Selling Process Timeline (NJ Street / Compass workflow) */}
        <div className="bg-stone-900 text-white p-8 sm:p-14 rounded-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
              Step-by-Step Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              루체 리얼티의 5단계 안심 중개 프로세스
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 pt-4">
            {[
              { step: '01', title: '접수 및 사전 미팅', desc: '고객의 니즈 분석 및 소유 부동산 권리분석' },
              { step: '02', title: '현장 실사 및 가치평가', desc: '공인중개사 현장 정밀 실사 및 적정 호가 산정' },
              { step: '03', title: '프리미엄 브랜딩', desc: '전문 사진·영상 제작 및 비공개 타겟 마케팅' },
              { step: '04', title: '1:1 안전 투어 & 협상', desc: '사전 검증된 바이어와의 프라이빗 투어 및 조율' },
              { step: '05', title: '계약 체결 및 사후관리', desc: '변호사·세무사 제휴 계약서 작성 및 등기 완료' },
            ].map((item) => (
              <div key={item.step} className="bg-stone-950 p-5 rounded-lg border border-stone-800 relative space-y-2">
                <span className="text-amber-400 font-serif-luxury font-bold text-xl block">
                  {item.step}
                </span>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-stone-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 text-center">
            <button
              onClick={() => onOpenConsultation('부동산 매도의뢰 및 상담 신청')}
              className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-lg shadow-md transition-all"
            >
              지금 바로 전속 매도의뢰 상담하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
