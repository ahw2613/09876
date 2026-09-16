import React, { useState } from 'react';
import { CustomerInquiry } from '../../types/property';
import { X, Calendar, Phone, CheckCircle2, ShieldCheck, Send } from 'lucide-react';

interface QuickConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
  onSubmitInquiry: (inquiry: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const QuickConsultationModal: React.FC<QuickConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = '',
  onSubmitInquiry,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(defaultTopic);
  const [preferredDate, setPreferredDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }

    onSubmitInquiry({
      type: 'visit_reserve',
      customerName,
      phone,
      message,
      preferredDate,
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-base text-stone-900">
              1:1 프라이빗 상담 및 투어 예약
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-stone-900">상담 신청이 완료되었습니다</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                기재해주신 연락처로 전담 공인중개사가 확인 즉시 친절히 안내 연락 드리겠습니다.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2 bg-stone-900 text-white text-xs font-bold rounded-md"
              >
                닫기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  고객 성함 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded text-stone-900 outline-none focus:bg-white focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  연락처 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded text-stone-900 outline-none focus:bg-white focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  희망 상담/투어 일시
                </label>
                <input
                  type="datetime-local"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded text-stone-900 outline-none focus:bg-white focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  문의 사항
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="궁금하신 내용이나 관심 매물을 입력해주세요."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded text-stone-900 outline-none focus:bg-white focus:border-stone-900"
                />
              </div>

              <div className="pt-2 text-[11px] text-stone-500 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>개인정보는 상담 및 예약 확인 목적으로만 안전하게 사용됩니다.</span>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-2.5 bg-stone-100 text-stone-700 font-semibold rounded hover:bg-stone-200 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-stone-900 hover:bg-black text-white font-bold rounded shadow-md transition-colors flex items-center justify-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5 mr-1" />
                  <span>예약 신청하기</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
