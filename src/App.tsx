import React, { useState, useEffect } from 'react';
import { Property, RegionInfo, CustomerInquiry } from './types/property';
import { MOCK_PROPERTIES } from './data/mockProperties';
import { MOCK_REGIONS } from './data/mockRegions';

// Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomeView } from './components/home/HomeView';
import { PropertySearchView } from './components/properties/PropertySearchView';
import { PropertyDetailView } from './components/properties/PropertyDetailView';
import { LocationsView } from './components/locations/LocationsView';
import { ServicesView } from './components/services/ServicesView';
import { AboutView } from './components/about/AboutView';
import { ContactView } from './components/contact/ContactView';
import { CompareModal } from './components/compare/CompareModal';
import { QuickConsultationModal } from './components/common/QuickConsultationModal';
import { AdminModal } from './components/admin/AdminModal';

export default function App() {
  // Navigation tab: 'home' | 'properties' | 'detail' | 'regions' | 'services' | 'about' | 'contact'
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState<string | undefined>(undefined);
  const [searchInitialFilter, setSearchInitialFilter] = useState<any>(undefined);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);

  // Data state
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('luce_properties');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return MOCK_PROPERTIES;
      }
    }
    return MOCK_PROPERTIES;
  });

  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([
    {
      id: 'inq-101',
      type: 'visit_reserve',
      customerName: '박서준 고객님',
      phone: '010-8472-1920',
      budget: '150억',
      targetRegion: '용산구 한남동',
      message: '한남더힐 85평형 주말 오후 프라이빗 투어 희망합니다.',
      preferredDate: '2025-04-12 14:00',
      status: 'in_progress',
      createdAt: '2025-04-05',
    },
    {
      id: 'inq-102',
      type: 'selling_request',
      customerName: '최윤진 고객님',
      phone: '010-3341-9981',
      budget: '매매 80억 희망',
      targetRegion: '강남구 청담동',
      message: '소유 중인 청담동 고급빌라 매도 전속 계약 및 가치 평가 의뢰 드립니다.',
      status: 'pending',
      createdAt: '2025-04-07',
    },
  ]);

  // User engagement state (Favorites & Compare)
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('luce_favorites');
    return saved ? JSON.parse(saved) : ['prop-hannam-01', 'prop-gwangju-01'];
  });

  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationDefaultTopic, setConsultationDefaultTopic] = useState('');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('luce_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('luce_properties', JSON.stringify(properties));
  }, [properties]);

  // Handlers
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        alert('비교 매물은 최대 3개까지 담을 수 있습니다.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleNavigate = (tab: string, extraParam?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tab === 'properties') {
      setShowFavoritesOnly(false);
      if (extraParam) {
        try {
          const parsed = JSON.parse(extraParam);
          setSearchInitialFilter(parsed);
        } catch {
          setSearchInitialFilter(undefined);
        }
      } else {
        setSearchInitialFilter(undefined);
      }
    } else if (tab === 'regions') {
      if (extraParam) {
        setSelectedRegionId(extraParam);
      }
    }

    setActiveTab(tab);
  };

  const handleSelectProperty = (id: string) => {
    setSelectedPropertyId(id);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (topic?: string) => {
    setConsultationDefaultTopic(topic || '1:1 VIP 전문 상담 신청');
    setIsConsultationModalOpen(true);
  };

  const handleAddProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    if (selectedPropertyId === id) {
      setActiveTab('properties');
      setSelectedPropertyId(null);
    }
  };

  const handleSubmitInquiry = (inquiryData: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: CustomerInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleUpdateInquiryStatus = (id: string, status: CustomerInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  // Selected property for detail view
  const currentProperty = properties.find((p) => p.id === selectedPropertyId) || properties[0];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans-modern text-stone-900 selection:bg-amber-400 selection:text-stone-950">
      {/* 1. Global Navigation Header */}
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        compareCount={compareList.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* 2. Main Routed Body */}
      <main className="flex-1">
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <HomeView
            properties={properties}
            regions={MOCK_REGIONS}
            favorites={favorites}
            compareList={compareList}
            onToggleFavorite={handleToggleFavorite}
            onToggleCompare={handleToggleCompare}
            onSelectProperty={handleSelectProperty}
            onNavigate={handleNavigate}
            onOpenConsultation={() => handleOpenConsultation()}
          />
        )}

        {/* PROPERTIES SEARCH VIEW (SPLIT / GRID / MAP) */}
        {activeTab === 'properties' && (
          <PropertySearchView
            properties={properties}
            favorites={favorites}
            compareList={compareList}
            onToggleFavorite={handleToggleFavorite}
            onToggleCompare={handleToggleCompare}
            onSelectProperty={handleSelectProperty}
            initialFilter={searchInitialFilter}
            showFavoritesOnly={showFavoritesOnly}
          />
        )}

        {/* PROPERTY DETAIL VIEW */}
        {activeTab === 'detail' && currentProperty && (
          <PropertyDetailView
            property={currentProperty}
            allProperties={properties}
            isFavorite={favorites.includes(currentProperty.id)}
            isCompared={compareList.includes(currentProperty.id)}
            onToggleFavorite={handleToggleFavorite}
            onToggleCompare={handleToggleCompare}
            onBack={() => setActiveTab('properties')}
            onSelectProperty={handleSelectProperty}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {/* REGIONAL ANALYSIS & GUIDES VIEW */}
        {activeTab === 'regions' && (
          <LocationsView
            regions={MOCK_REGIONS}
            properties={properties}
            favorites={favorites}
            compareList={compareList}
            onToggleFavorite={handleToggleFavorite}
            onToggleCompare={handleToggleCompare}
            onSelectProperty={handleSelectProperty}
            selectedRegionId={selectedRegionId}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {/* SPECIALIZED SERVICES VIEW */}
        {activeTab === 'services' && (
          <ServicesView
            onOpenConsultation={handleOpenConsultation}
            onNavigate={handleNavigate}
          />
        )}

        {/* ABOUT LUCE REALTY VIEW */}
        {activeTab === 'about' && (
          <AboutView onOpenConsultation={() => handleOpenConsultation()} />
        )}

        {/* CONTACT & LISTING INQUIRY VIEW */}
        {activeTab === 'contact' && (
          <ContactView onSubmitInquiry={handleSubmitInquiry} />
        )}
      </main>

      {/* 3. Global Legal & Compliance Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* 4. Compare Modal (Side-by-side) */}
      <CompareModal
        properties={properties.filter((p) => compareList.includes(p.id))}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemove={handleToggleCompare}
        onSelectProperty={handleSelectProperty}
      />

      {/* 5. 1-Click Quick Consultation / Tour Booking Modal */}
      <QuickConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        defaultTopic={consultationDefaultTopic}
        onSubmitInquiry={handleSubmitInquiry}
      />

      {/* 6. Real Estate CMS / Admin Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        properties={properties}
        inquiries={inquiries}
        onAddProperty={handleAddProperty}
        onDeleteProperty={handleDeleteProperty}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
      />
    </div>
  );
}
