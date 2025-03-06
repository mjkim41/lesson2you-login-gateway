import React, { useState } from 'react';
import { ArrowLeft, Search, X, UserPlus, CheckCircle, Video as VideoIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const FriendsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState([
    { id: 1, name: '김민준', isOnline: true, profileImage: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: '이지현', isOnline: false, profileImage: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: '박서연', isOnline: true, profileImage: 'https://i.pravatar.cc/150?img=3' },
  ]);
  const [friendRequests, setFriendRequests] = useState([
    { id: 4, name: '최승현', profileImage: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: '윤지우', profileImage: 'https://i.pravatar.cc/150?img=5' },
  ]);

  const acceptFriendRequest = (id: number) => {
    const request = friendRequests.find(req => req.id === id);
    if (request) {
      setFriends([...friends, { ...request, isOnline: false }]);
      setFriendRequests(friendRequests.filter(req => req.id !== id));
      toast.success(`${request.name}님과 친구가 되었습니다!`);
    }
  };

  const declineFriendRequest = (id: number) => {
    setFriendRequests(friendRequests.filter(req => req.id !== id));
    toast.info('친구 요청을 거절했습니다.');
  };

  const removeFriend = (id: number) => {
    setFriends(friends.filter(friend => friend.id !== id));
    toast.warning('친구를 삭제했습니다.');
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">친구 관리</h1>
          <div></div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="친구 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Friend Requests */}
      {friendRequests.length > 0 && (
        <div className="container mx-auto px-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">친구 요청</h2>
          <ul className="space-y-3">
            {friendRequests.map((request) => (
              <li key={request.id} className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center">
                  <img src={request.profileImage} alt={request.name} className="w-10 h-10 rounded-full mr-3" />
                  <span className="text-gray-800 font-medium">{request.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => acceptFriendRequest(request.id)}
                    className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                    aria-label="수락"
                  >
                    <CheckCircle size={20} />
                  </button>
                  <button
                    onClick={() => declineFriendRequest(request.id)}
                    className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors"
                    aria-label="거절"
                  >
                    <X size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Friend List */}
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-semibold mb-3">내 친구 목록</h2>
        <ul className="space-y-3">
          {filteredFriends.map((friend) => (
            <li key={friend.id} className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center">
                <img src={friend.profileImage} alt={friend.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <span className="text-gray-800 font-medium">{friend.name}</span>
                  {friend.isOnline && <span className="ml-1 text-xs text-green-500">(온라인)</span>}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate('/video-chat')}
                  className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                  aria-label="화상 통화"
                >
                  <VideoIcon size={20} />
                </button>
                <button
                  onClick={() => removeFriend(friend.id)}
                  className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors"
                  aria-label="친구 삭제"
                >
                  <X size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Friend Button */}
      <div className="container mx-auto px-4 mt-6">
        <button className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center">
          <UserPlus size={16} className="mr-2" />
          친구 추가
        </button>
      </div>
    </div>
  );
};

export default FriendsPage;
