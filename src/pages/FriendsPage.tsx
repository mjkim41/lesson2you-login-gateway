
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, UserPlus, Heart, Check, User, X } from "lucide-react";
import { toast } from "sonner";

type Friend = {
  id: number;
  name: string;
  title: string;
  avatar: string;
  isFriend: boolean;
  isPending: boolean;
};

const FriendsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<Friend[]>([
    {
      id: 1,
      name: "김민준",
      title: "프론트엔드 개발자 & 코딩 멘토",
      avatar: "https://i.pravatar.cc/150?img=1",
      isFriend: true,
      isPending: false,
    },
    {
      id: 2,
      name: "이지현",
      title: "UX/UI 디자이너 & 디자인 멘토",
      avatar: "https://i.pravatar.cc/150?img=2",
      isFriend: false,
      isPending: false,
    },
    {
      id: 3,
      name: "박서연",
      title: "진로 상담가 & 커리어 코치",
      avatar: "https://i.pravatar.cc/150?img=3",
      isFriend: true,
      isPending: false,
    },
    {
      id: 4,
      name: "정현우",
      title: "영어 회화 강사 & 번역가",
      avatar: "https://i.pravatar.cc/150?img=4",
      isFriend: false,
      isPending: true,
    },
    {
      id: 5,
      name: "최유진",
      title: "마케팅 전문가 & 브랜딩 컨설턴트",
      avatar: "https://i.pravatar.cc/150?img=5",
      isFriend: false,
      isPending: false,
    },
  ]);

  // 필터된 사용자 목록
  const filteredUsers = users.filter(user => 
    user.name.includes(searchQuery) || 
    user.title.includes(searchQuery)
  );

  // 친구 목록
  const friends = filteredUsers.filter(user => user.isFriend);
  
  // 친구 요청 목록
  const pendingRequests = filteredUsers.filter(user => user.isPending);
  
  // 기타 사용자 목록
  const otherUsers = filteredUsers.filter(user => !user.isFriend && !user.isPending);

  // 친구 요청 보내기
  const sendFriendRequest = (userId: number) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, isPending: true } 
          : user
      )
    );
    toast.success("친구 요청을 보냈습니다.");
  };

  // 친구 요청 수락
  const acceptFriendRequest = (userId: number) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, isFriend: true, isPending: false } 
          : user
      )
    );
    toast.success("친구 요청을 수락했습니다.");
  };

  // 친구 요청 거절
  const rejectFriendRequest = (userId: number) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, isPending: false } 
          : user
      )
    );
    toast.info("친구 요청을 거절했습니다.");
  };

  // 친구 삭제
  const removeFriend = (userId: number) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, isFriend: false } 
          : user
      )
    );
    toast.info("친구 목록에서 삭제했습니다.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="뒤로 가기"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">친구 관리</h1>
        </div>
      </header>

      {/* 검색창 */}
      <div className="container mx-auto px-4 py-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="친구 검색"
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 친구 요청 섹션 */}
      {pendingRequests.length > 0 && (
        <div className="container mx-auto px-4 py-4">
          <h2 className="text-lg font-semibold mb-3">친구 요청</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {pendingRequests.map((user) => (
              <div 
                key={user.id}
                className="p-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.title}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => acceptFriendRequest(user.id)}
                      className="p-2 bg-primary text-white rounded-full"
                      aria-label="수락"
                    >
                      <Check size={18} />
                    </button>
                    <button 
                      onClick={() => rejectFriendRequest(user.id)}
                      className="p-2 bg-gray-200 text-gray-700 rounded-full"
                      aria-label="거절"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 내 친구 목록 */}
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-lg font-semibold mb-3">내 친구</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {friends.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              아직 친구가 없습니다.
            </div>
          ) : (
            friends.map((friend) => (
              <div 
                key={friend.id}
                className="p-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center">
                  <img 
                    src={friend.avatar} 
                    alt={friend.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{friend.name}</h3>
                    <p className="text-sm text-gray-600">{friend.title}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => navigate("/video-schedule", { state: { donationId: friend.id, providerName: friend.name } })}
                      className="p-2 bg-primary/10 text-primary rounded-full"
                      aria-label="화상 수업 예약"
                    >
                      <Video size={18} />
                    </button>
                    <button 
                      onClick={() => removeFriend(friend.id)}
                      className="p-2 bg-gray-200 text-gray-700 rounded-full"
                      aria-label="친구 삭제"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 추천 사용자 */}
      <div className="container mx-auto px-4 py-4 mb-8">
        <h2 className="text-lg font-semibold mb-3">추천 사용자</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {otherUsers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              추천 사용자가 없습니다.
            </div>
          ) : (
            otherUsers.map((user) => (
              <div 
                key={user.id}
                className="p-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.title}</p>
                  </div>
                  <div>
                    <button 
                      onClick={() => sendFriendRequest(user.id)}
                      className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors"
                      aria-label="친구 요청 보내기"
                    >
                      <UserPlus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
