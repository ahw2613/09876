import React from 'react';
import { Property } from '../../types/property';
import { X, Scale, ArrowRight, Trash2 } from 'lucide-react';

interface CompareModalProps {
  properties: Property[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onSelectProperty: (id: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  properties,
  isOpen,
  onClose,
  onRemove,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-lg text-stone-900">
              매물 상세 비교 ({properties.length}/3)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Comparison Table */}
        <div className="flex-1 overflow-y-auto p-6">
          {properties.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Scale className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-stone-600 text-sm">비교할 매물이 선택되지 않았습니다.</p>
              <p className="text-xs text-stone-400">매물 카드의 저울(비교) 아이콘을 클릭하여 최대 3개까지 담을 수 있습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="p-3 font-bold text-stone-400 w-32 uppercase tracking-wider">구분 항목</th>
                    {properties.map((p) => (
                      <th key={p.id} className="p-3 w-64 min-w-[200px] align-top">
                        <div className="relative rounded-lg overflow-hidden border border-stone-200 mb-2">
                          <img src={p.images[0]} alt={p.title} className="w-full h-32 object-cover" />
                          <button
                            onClick={() => onRemove(p.id)}
                            className="absolute top-1.5 right-1.5 p-1 bg-black/60 text-white hover:bg-rose-600 rounded-full transition-colors"
                            title="비교함에서 제거"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="font-bold text-sm text-stone-900 line-clamp-1">{p.title}</h4>
                        <p className="text-[11px] text-stone-500">{p.location.district} {p.location.dong}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="p-3 font-bold text-stone-500">가격</td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-3 font-bold text-stone-950 text-sm font-sans-modern">
                        {p.price.priceDisplay}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-500">거래 형태</td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-3">
                        <span className="px-2 py-0.5 rounded bg-stone-100 font-semibold text-stone-800">
                          {p.transactionType === 'sale' ? '매매' : p.transactionType === 'jeonse' ? '전세' : '월세'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-500">전용면적 / 공급</td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-3">
                        <span className="font-semibold text-stone-900">{p.specs.exclusivePyeong}평</span>
                        <span className="text-stone-400 ml-1">({p.specs.exclusiveAreaM2}㎡)</span>
                        <p className="text-stone-500 text-[11px]">공급 {p.specs.supplyPyeong}평</p>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-500">방수 / 욕실수</td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-3">
                        방 {p.specs.rooms}개 / 욕실 {p.specs.bathrooms}개
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-500">해당층 / 총층수</td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-3">{p.specs.floor}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-500">방향</td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-3">{p.specs.direction}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-500">주차 환경</td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-3">
                        세대당 {p.specs.parkingPerHousehold}대 (총 {p.specs.parkingTotal}대)
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-500">준공년도</td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-3">{p.specs.completionYear}년</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-500">월 관리비</td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-3">약 {p.price.maintenanceFee || 0}만원</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-500">상세 보기</td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-3">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectProperty(p.id);
                          }}
                          className="w-full py-2 px-3 bg-stone-900 hover:bg-black text-white rounded font-semibold text-xs flex items-center justify-center space-x-1"
                        >
                          <span>상세 정보 보기</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
