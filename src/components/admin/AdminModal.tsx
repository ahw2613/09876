import React, { useState } from 'react';
import { Property, CustomerInquiry, TransactionType, PropertyType } from '../../types/property';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  Building, 
  Users, 
  DollarSign,
  Search,
  Filter
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  inquiries: CustomerInquiry[];
  onAddProperty: (newProp: Property) => void;
  onDeleteProperty: (id: string) => void;
  onUpdateInquiryStatus: (id: string, status: CustomerInquiry['status']) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  properties,
  inquiries,
  onAddProperty,
  onDeleteProperty,
  onUpdateInquiryStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'properties' | 'inquiries' | 'add'>('properties');
  const [searchTerm, setSearchTerm] = useState('');

  // New Property Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formTransactionType, setFormTransactionType] = useState<TransactionType>('sale');
  const [formPropertyType, setFormPropertyType] = useState<PropertyType>('apartment');
  const [formCity, setFormCity] = useState('서울특별시');
  const [formDistrict, setFormDistrict] = useState('용산구');
  const [formDong, setFormDong] = useState('한남동');
  const [formPriceDisplay, setFormPriceDisplay] = useState('매매 95억');
  const [formSalePrice, setFormSalePrice] = useState(950000);
  const [formSupplyPyeong, setFormSupplyPyeong] = useState(85);
  const [formExclusivePyeong, setFormExclusivePyeong] = useState(74);
  const [formRooms, setFormRooms] = useState(4);
  const [formBaths, setFormBaths] = useState(3);
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');

  if (!isOpen) return null;

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formPriceDisplay) {
      alert('매물명과 가격을 입력해 주세요.');
      return;
    }

    const newProp: Property = {
      id: `prop-custom-${Date.now()}`,
      title: formTitle,
      subtitle: formSubtitle || '루체 리얼티 엄선 프리미엄 매물',
      transactionType: formTransactionType,
      propertyType: formPropertyType,
      status: 'active',
      price: {
        priceDisplay: formPriceDisplay,
        priceShort: `${Math.round(formSalePrice / 10000)}억`,
        salePrice: formSalePrice,
        pricePyeongEstimated: `평당 약 ${Math.round(formSalePrice / formExclusivePyeong * 10) / 10}천만원`,
        maintenanceFee: 80,
      },
      location: {
        city: formCity,
        district: formDistrict,
        dong: formDong,
        roadAddress: '테헤란로 152',
        lat: 37.525,
        lng: 127.01,
      },
      specs: {
        supplyPyeong: formSupplyPyeong,
        exclusivePyeong: formExclusivePyeong,
        supplyAreaM2: Math.round(formSupplyPyeong * 3.3058),
        exclusiveAreaM2: Math.round(formExclusivePyeong * 3.3058),
        floor: '고층 / 25층',
        rooms: formRooms,
        bathrooms: formBaths,
        direction: '남동향 (거실 기준)',
        parkingTotal: 300,
        parkingPerHousehold: 2.5,
        approvalDate: '2023-08-15',
        completionYear: 2023,
        moveInDate: '즉시 입주 협의 가능',
        buildingType: '공동주택(아파트)',
      },
      features: ['파노라마 뷰', '고급 대리석 마감', '발렛파킹', '스마트홈'],
      tags: ['신규등록', '프리미엄', '추천'],
      images: [
        formImage,
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      ],
      description: '루체 리얼티 관리자 패널을 통해 새롭게 등록된 검증 매물입니다. 최고급 자재와 완벽한 조망권을 제공합니다.',
      keyPoints: ['전속 관리 매물', '사전 검증 완료', '즉시 입주 가능'],
      agent: {
        name: '정현우 본부장',
        title: '수석 자산운용 본부장',
        phone: '010-9876-5432',
        licenseNumber: '제 11680-2018-00129호',
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      },
      surroundings: [
        { category: '교통', title: '역세권 도보 5분', distance: '300m' },
        { category: '편의', title: '명품 백화점', distance: '1.2km' },
      ],
      isFeatured: true,
      isNew: true,
      viewsCount: 1,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddProperty(newProp);
    setActiveTab('properties');
    alert('매물이 성공적으로 등록되었습니다.');
  };

  const filteredProps = properties.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base tracking-wide">
              LUCE REALTY · 중개 관리자 콘솔 (CMS)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 pt-2 text-xs font-bold text-stone-600">
          <button
            onClick={() => setActiveTab('properties')}
            className={`pb-3 px-4 border-b-2 transition-all ${
              activeTab === 'properties'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            매물 목록 관리 ({properties.length}건)
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 px-4 border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'inquiries'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>고객 의뢰 및 예약 접수</span>
            <span className="px-1.5 py-0.2 bg-amber-400 text-stone-950 rounded-full text-[10px]">
              {inquiries.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 px-4 border-b-2 transition-all flex items-center space-x-1 ${
              activeTab === 'add'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>신규 매물 등록</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: PROPERTIES MANAGEMENT */}
          {activeTab === 'properties' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="매물명 또는 지역 검색"
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded outline-none"
                  />
                </div>
                <button
                  onClick={() => setActiveTab('add')}
                  className="px-3.5 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>신규 매물 등록</span>
                </button>
              </div>

              <div className="border border-stone-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-600 font-bold border-b border-stone-200">
                    <tr>
                      <th className="p-3">매물 이미지 & 단지명</th>
                      <th className="p-3">지역</th>
                      <th className="p-3">거래 / 가격</th>
                      <th className="p-3">전용면적</th>
                      <th className="p-3">등록일</th>
                      <th className="p-3 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredProps.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3 flex items-center space-x-3">
                          <img src={p.images[0]} alt="" className="w-12 h-10 object-cover rounded" />
                          <div>
                            <span className="font-bold text-stone-900 block">{p.title}</span>
                            <span className="text-[11px] text-stone-400">{p.specs.buildingType}</span>
                          </div>
                        </td>
                        <td className="p-3 text-stone-600">{p.location.city} {p.location.district}</td>
                        <td className="p-3">
                          <span className="font-bold text-stone-900">{p.price.priceDisplay}</span>
                        </td>
                        <td className="p-3 text-stone-600">{p.specs.exclusivePyeong}평</td>
                        <td className="p-3 text-stone-400">{p.createdAt}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`'${p.title}' 매물을 삭제하시겠습니까?`)) {
                                onDeleteProperty(p.id);
                              }
                            }}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="border border-stone-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-600 font-bold border-b border-stone-200">
                    <tr>
                      <th className="p-3">접수일시</th>
                      <th className="p-3">유형</th>
                      <th className="p-3">고객명 / 연락처</th>
                      <th className="p-3">내용 요약</th>
                      <th className="p-3">처리 상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-stone-50">
                        <td className="p-3 text-stone-400">{inq.createdAt}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-stone-100 font-semibold text-stone-800">
                            {inq.type === 'selling_request' ? '매도의뢰' : inq.type === 'visit_reserve' ? '방문투어예약' : '일반상담'}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-stone-900 block">{inq.customerName}</span>
                          <span className="text-stone-500">{inq.phone}</span>
                        </td>
                        <td className="p-3 max-w-xs text-stone-600 truncate">
                          {inq.message || inq.targetRegion || '상담 요청'}
                        </td>
                        <td className="p-3">
                          <select
                            value={inq.status}
                            onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="text-xs bg-white border border-stone-200 rounded px-2 py-1 outline-none font-semibold text-stone-800"
                          >
                            <option value="pending">접수 대기</option>
                            <option value="in_progress">상담 진행중</option>
                            <option value="completed">상담 완료</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ADD PROPERTY FORM */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateProperty} className="max-w-2xl mx-auto space-y-4 text-xs">
              <h4 className="text-sm font-bold text-stone-900 border-b pb-2">신규 매물 기본 정보 입력</h4>

              <div>
                <label className="block font-bold text-stone-700 mb-1">매물 타이틀 (단지명 및 특장점)</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="예: 나인원한남 펜트하우스 (파노라마 한강뷰)"
                  className="w-full px-3 py-2 bg-stone-50 border rounded text-stone-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">거래 형태</label>
                  <select
                    value={formTransactionType}
                    onChange={(e) => setFormTransactionType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border rounded text-stone-900 outline-none"
                  >
                    <option value="sale">매매</option>
                    <option value="jeonse">전세</option>
                    <option value="monthly">월세</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">부동산 종류</label>
                  <select
                    value={formPropertyType}
                    onChange={(e) => setFormPropertyType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border rounded text-stone-900 outline-none"
                  >
                    <option value="apartment">아파트</option>
                    <option value="penthouse">펜트하우스</option>
                    <option value="officetel">오피스텔</option>
                    <option value="villa">고급빌라</option>
                    <option value="commercial">상가·빌딩</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">시/도</label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border rounded text-stone-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">구/군</label>
                  <input
                    type="text"
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border rounded text-stone-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">동</label>
                  <input
                    type="text"
                    value={formDong}
                    onChange={(e) => setFormDong(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border rounded text-stone-900 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">표시 가격 문구</label>
                  <input
                    type="text"
                    value={formPriceDisplay}
                    onChange={(e) => setFormPriceDisplay(e.target.value)}
                    placeholder="매매 95억"
                    className="w-full px-3 py-2 bg-stone-50 border rounded text-stone-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">매매가 숫자 (만원 단위)</label>
                  <input
                    type="number"
                    value={formSalePrice}
                    onChange={(e) => setFormSalePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border rounded text-stone-900 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">공급평수</label>
                  <input
                    type="number"
                    value={formSupplyPyeong}
                    onChange={(e) => setFormSupplyPyeong(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border rounded text-stone-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">전용평수</label>
                  <input
                    type="number"
                    value={formExclusivePyeong}
                    onChange={(e) => setFormExclusivePyeong(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border rounded text-stone-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">방 개수</label>
                  <input
                    type="number"
                    value={formRooms}
                    onChange={(e) => setFormRooms(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border rounded text-stone-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">욕실 개수</label>
                  <input
                    type="number"
                    value={formBaths}
                    onChange={(e) => setFormBaths(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border rounded text-stone-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">대표 이미지 URL</label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border rounded text-stone-900 outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('properties')}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded font-semibold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-stone-900 hover:bg-black text-white rounded font-bold"
                >
                  매물 즉시 등록
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
