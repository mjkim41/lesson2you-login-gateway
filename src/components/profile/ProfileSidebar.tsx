
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, Bookmark, Calendar 
} from 'lucide-react';

type Tab = 'wishlist' | 'reservation' | 'class';
type SubTab = 'pending' | 'confirmed' | 'upcoming' | 'past';

interface ProfileSidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full md:w-64 bg-gray-50 p-4">
      {/* 메뉴 그룹: 재능 관리 */}
      <div className="mb-6">
        <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 px-4">재능 관리</h3>
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => onTabChange('wishlist')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'wishlist' ? 'bg-primary text-white' : 'hover:bg-gray-200'
            }`}
          >
            <Heart size={18} />
            <span>찜한 재능</span>
          </button>
        </div>
      </div>

      {/* 메뉴 그룹: 예약 관리 */}
      <div className="mb-6">
        <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 px-4">예약 관리</h3>
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => onTabChange('reservation')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'reservation' ? 'bg-primary text-white' : 'hover:bg-gray-200'
            }`}
          >
            <Calendar size={18} />
            <span>예약 관리</span>
          </button>
        </div>
      </div>

      {/* 메뉴 그룹: 수업 관리 */}
      <div className="mb-6">
        <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 px-4">수업 관리</h3>
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => onTabChange('class')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'class' ? 'bg-primary text-white' : 'hover:bg-gray-200'
            }`}
          >
            <Bookmark size={18} />
            <span>수업 관리</span>
          </button>
        </div>
      </div>

      {/* 바로가기 링크 */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <button
          onClick={() => navigate('/video-classes')}
          className="flex items-center space-x-2 px-4 py-3 rounded-lg w-full text-left text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <Bookmark size={18} />
          <span>화상 수업 탐색</span>
        </button>
        <button
          onClick={() => navigate('/reservations')}
          className="flex items-center space-x-2 px-4 py-3 rounded-lg w-full text-left text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <Calendar size={18} />
          <span>예약 관리</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
