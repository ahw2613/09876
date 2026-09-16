import React from 'react';
import { Building2, ShieldCheck, MapPin, Phone, Mail, Award, Clock } from 'lucide-react';

interface AboutViewProps {
  onOpenConsultation: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenConsultation }) => {
  const team = [
    {
      name: '정현우',
      role: '수석 자산운용 본부장 / 공인중개사',
      license: '제 11680-2018-00129호',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      intro: '서울대 도시공학과 학사 및 부동산학 석사. 한남동, 청담동, 반포동 최고가 펜트하우스 1,200억 원 이상 단독 중개 실적 보유.',
    },
    {
      name: '이지민',
      role: 'VIP 주거자산 팀장 / 공인중개사',
      license: '제 11680-2020-00344호',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      intro: '연세대 경영학과 졸. 성수동 서울숲 갤러리아포레, 아크로서울포레스트 및 한남더힐 전담 자산 관리 전문가.',
    },
    {
      name: '김태윤',
      role: '호남권역 총괄 이사 / 공인중개사',
      license: '제 29155-2016-00088호',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      intro: '전남대 법학과 졸. 광주 남구 봉선동 명품 주거 및 상무지구 메디컬·오피스 빌딩 통매매 전문 15년 경력.',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Brand Mission */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
            About LUCE Real Estate
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            신뢰와 품격으로 완성하는 <br />
            부동산 자산관리의 새로운 기준
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            루체 부동산 중개법인은 단순한 매물 중개인을 넘어, 고객의 인생과 자산 포트폴리오를 함께 설계하는 
            신뢰받는 부동산 패밀리 오피스 파트너입니다.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
            <ShieldCheck className="w-8 h-8 text-amber-600" />
            <h3 className="text-lg font-bold text-stone-900">100% 실매물 책임 보증제</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              모든 매물은 등기부등본, 건축물대장, 토지이용계획확인원 등 12개 법정 서류의 전수 조사를 통과한 실매물만 등록합니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
            <Award className="w-8 h-8 text-amber-600" />
            <h3 className="text-lg font-bold text-stone-900">철저한 비밀 유지 & 프라이버시</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              고객의 거래 내역과 자산 현황은 엄격한 기밀 유지 협약(NDA)에 따라 안전하게 보호되며, 전담 차량을 통한 비공개 투어를 진행합니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-stone-200/80 shadow-xs space-y-3">
            <Building2 className="w-8 h-8 text-amber-600" />
            <h3 className="text-lg font-bold text-stone-900">전국 광역 네트워크</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              서울 강남파이낸스센터 본사와 광주 상무센트럴타워 호남본부를 통해 수도권과 지방 핵심 거점을 유기적으로 연결합니다.
            </p>
          </div>
        </div>

        {/* Certified Team Section */}
        <div className="space-y-8">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-widest block mb-1">
              Leadership & Experts
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              루체 리얼티 전문 공인중개사 팀
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs">
                <div className="aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-stone-950">{member.name}</h3>
                    <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold">
                      전담 전문가
                    </span>
                  </div>
                  <p className="text-xs font-medium text-stone-600">{member.role}</p>
                  <p className="text-[11px] text-stone-400">{member.license}</p>
                  <p className="text-xs text-stone-500 pt-2 border-t border-stone-100 leading-relaxed">
                    {member.intro}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Office Locations */}
        <div className="bg-stone-900 text-white p-8 sm:p-12 rounded-2xl space-y-8">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Office Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              찾아오시는 길 & 사무소 안내
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-stone-950 p-6 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-amber-400">서울 강남 본사</h4>
                <span className="text-xs text-stone-400">GFC 24층</span>
              </div>
              <p className="text-xs text-stone-300">
                서울특별시 강남구 테헤란로 152 강남파이낸스센터(GFC) 24층
              </p>
              <p className="text-xs text-stone-400">
                지하철 2호선 역삼역 2번 출구 지하 직통 연결 (주차 2시간 무료)
              </p>
              <div className="pt-2 text-xs font-semibold text-stone-300 flex items-center space-x-3">
                <span>직통: 02-588-3490</span>
                <span>팩스: 02-588-3491</span>
              </div>
            </div>

            <div className="bg-stone-950 p-6 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-amber-400">호남권역 자산관리본부</h4>
                <span className="text-xs text-stone-400">상무 센트럴타워 8층</span>
              </div>
              <p className="text-xs text-stone-300">
                광주광역시 서구 시청로 30 상무센트럴타워 8층
              </p>
              <p className="text-xs text-stone-400">
                광주광역시청 정문 앞, 상무역 5번 출구 도보 6분 (지상·지하 주차 완비)
              </p>
              <div className="pt-2 text-xs font-semibold text-stone-300 flex items-center space-x-3">
                <span>직통: 062-385-3490</span>
                <span>문의: honam@lucerealty.co.kr</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-lg shadow-md transition-colors"
            >
              본사 방문 상담 예약하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
