
import React, { useState } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import WishlistTab from '../components/profile/WishlistTab';
import PendingReservationsTab from '../components/profile/PendingReservationsTab';
import ConfirmedReservationsTab from '../components/profile/ConfirmedReservationsTab';
import UpcomingClassesTab from '../components/profile/UpcomingClassesTab';
import PastClassesTab from '../components/profile/PastClassesTab';

import {
  wishlistItems,
  pendingReservations,
  confirmedReservations,
  upcomingClasses,
  pastClasses
} from '../data/profileData';

// 탭 인터페이스 정의
type Tab = 'wishlist' | 'pending' | 'confirmed' | 'upcoming' | 'past';

const MyProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('wishlist');

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <ProfileHeader />

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* 사이드바와 콘텐츠 영역 분리 */}
          <div className="flex flex-col md:flex-row">
            {/* 사이드바 */}
            <ProfileSidebar activeTab={activeTab} onTabChange={handleTabChange} />

            {/* 콘텐츠 영역 */}
            <div className="flex-1 p-6">
              {/* 찜한 재능 목록 */}
              {activeTab === 'wishlist' && <WishlistTab wishlistItems={wishlistItems} />}

              {/* 대기 중인 예약 */}
              {activeTab === 'pending' && <PendingReservationsTab reservations={pendingReservations} />}

              {/* 확정된 예약 */}
              {activeTab === 'confirmed' && <ConfirmedReservationsTab reservations={confirmedReservations} />}

              {/* 예정된 수업 */}
              {activeTab === 'upcoming' && <UpcomingClassesTab classes={upcomingClasses} />}

              {/* 지난 수업 */}
              {activeTab === 'past' && <PastClassesTab classes={pastClasses} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
