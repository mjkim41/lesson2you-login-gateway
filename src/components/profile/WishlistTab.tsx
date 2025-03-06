
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, X } from 'lucide-react';
import { toast } from 'sonner';

interface WishlistItem {
  id: number;
  title: string;
  provider: string;
  category: string;
  rating: number;
  image: string;
}

interface WishlistTabProps {
  wishlistItems: WishlistItem[];
}

const WishlistTab: React.FC<WishlistTabProps> = ({ wishlistItems }) => {
  const navigate = useNavigate();
  
  const handleRemoveWishlist = (id: number) => {
    toast.success("찜 목록에서 제거되었습니다.");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">찜한 재능</h2>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          찜한 재능이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlistItems.map(item => (
            <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-full">
                <div className="w-1/3">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="w-2/3 p-4 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-600">by {item.provider}</p>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded-full mt-2">
                        {item.category}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleRemoveWishlist(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="mt-auto flex space-x-2">
                    <button
                      onClick={() => navigate(`/talent/${item.id}`)}
                      className="flex-1 py-1.5 px-3 text-xs bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    >
                      상세보기
                    </button>
                    <button
                      onClick={() => navigate('/video-schedule', { state: { providerName: item.provider } })}
                      className="py-1.5 px-3 text-xs bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                    >
                      예약하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistTab;
