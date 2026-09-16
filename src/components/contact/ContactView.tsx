import React, { useState } from 'react';
import { CustomerInquiry } from '../../types/property';
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Building, 
  Send,
  MessageSquare
} from 'lucide-react';

interface ContactViewProps {
  onSubmitInquiry: (inquiry: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onSubmitInquiry }) => {
  const [inquiryType, setInquiryType] = useState<CustomerInquiry['type']>('selling_request');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [budget, setBudget] = useState('');
  const [targetRegion, setTargetRegion] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }

    onSubmitInquiry({
      type: inquiryType,
      customerName,
      phone,
      email,
      preferredDate,
      budget,
      targetRegion,
      message,
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
            Consultation & Listing Request
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            매도의뢰 및 1:1 VIP 전문 상담
          </h1>
          <p className="text-sm text-stone-500 mt-2 leading-relaxed">
            소유 부동산 매도·임대 접수부터 프라이빗 매수 희망 조건까지, 전문 공인중개사가 확인 즉시 전담 안내해 드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900 text-white p-8 rounded-2xl space-y-6 shadow-lg">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  Customer Direct Line
                </span>
                <h3 className="text-2xl font-bold tracking-tight">
                  신속한 유선 상담이 필요하신가요?
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  평일 및 토요일 상시 전문 공인중개사가 대기하고 있습니다.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <a
                  href="tel:02-588-3490"
                  className="flex items-center space-x-3 p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-400 transition-colors"
                >
                  <Phone className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="text-xs text-stone-400 block">서울 본사 대표 직통</span>
                    <span className="text-lg font-bold text-white">02-588-3490</span>
                  </div>
                </a>

                <a
                  href="tel:062-385-3490"
                  className="flex items-center space-x-3 p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-400 transition-colors"
                >
                  <Phone className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="text-xs text-stone-400 block">호남권역 자산관리본부</span>
                    <span className="text-lg font-bold text-white">062-385-3490</span>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-stone-800 text-xs text-stone-400 space-y-2">
                <div className="flex items-center text-stone-200">
                  <ShieldCheck className="w-4 h-4 mr-2 text-amber-400" />
                  <span>개인정보 암호화 및 철저한 비밀보장</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  접수해주신 매물 정보와 상담 내역은 담당 공인중개사 1인에게만 전담 배정되어 절대 외부로 유출되지 않습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Column (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-md">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900">상담 신청이 완료되었습니다</h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    루체 리얼티 전담 공인중개사가 기재해주신 연락처(<strong>{phone}</strong>)로 신속하게 안내 연락 드리겠습니다.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setCustomerName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="mt-4 px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-md"
                  >
                    추가 문의 접수하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type Tabs */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      상담 유형 선택
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'selling_request', label: '내 매물 내놓기(매도의뢰)' },
                        { id: 'visit_reserve', label: '방문 상담 예약' },
                        { id: 'property_inquiry', label: '매수 희망 문의' },
                        { id: 'consultation', label: '세무·자산관리 자문' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setInquiryType(item.id as any)}
                          className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all ${
                            inquiryType === item.id
                              ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        고객 성함 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="성함을 입력해 주세요"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-md text-sm text-stone-900 focus:bg-white focus:border-stone-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        연락처 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010-0000-0000"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-md text-sm text-stone-900 focus:bg-white focus:border-stone-900 outline-none"
                      />
                    </div>
                  </div>

                  {/* Region & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        희망 지역 / 매물 소재지
                      </label>
                      <input
                        type="text"
                        value={targetRegion}
                        onChange={(e) => setTargetRegion(e.target.value)}
                        placeholder="예: 서울 용산구 한남동, 광주 남구 봉선동"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-md text-sm text-stone-900 focus:bg-white focus:border-stone-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        희망 예산 / 희망 매매가
                      </label>
                      <input
                        type="text"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="예: 50억~100억 대, 매매 25억 희망"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-md text-sm text-stone-900 focus:bg-white focus:border-stone-900 outline-none"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      상세 문의 내용
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="매물 정보(단지명, 층수, 평형) 또는 원하시는 매수 조건, 방문 희망 일시 등을 자유롭게 적어주세요."
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-md text-sm text-stone-900 focus:bg-white focus:border-stone-900 outline-none"
                    />
                  </div>

                  {/* Privacy agreement */}
                  <div className="pt-2 text-xs text-stone-500">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" required defaultChecked className="rounded text-stone-900" />
                      <span>개인정보 수집 및 이용(상담 연락 및 매물 안내 목적)에 동의합니다.</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-stone-900 hover:bg-black text-white text-sm font-bold rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>1:1 상담 신청 완료</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
