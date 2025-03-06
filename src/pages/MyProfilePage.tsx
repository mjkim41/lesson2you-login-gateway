
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Calendar, Clock, CheckCircle, X, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

// 탭 인터페이스 정의
type Tab = 'wishlist' | 'pending' | 'confirmed';

const MyProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('wishlist');
  
  // 찜한 항목 샘플 데이터
  const wishlistItems = [
    {
      id: 1,
      title: "파이썬 프로그래밍 기초",
      provider: "정상혁",
      category: "IT 기술",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "영어 회화 수업",
      provider: "김지영",
      category: "교육",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "웹디자인 기초",
      provider: "이현우",
      category: "디자인",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  // 대기 중인 예약 샘플 데이터
  const pendingReservations = [
    {
      id: 101,
      title: "자바스크립트 코딩 튜터링",
      provider: "강민준",
      date: "2024-08-15",
      time: "14:00",
      status: 'pending'
    },
    {
      id: 102,
      title: "포트폴리오 리뷰",
      provider: "이서현",
      date: "2024-08-18",
      time: "10:30",
      status: 'pending'
    }
  ];

  // 확정된 예약 샘플 데이터
  const confirmedReservations = [
    {
      id: 201,
      title: "UI/UX 디자인 멘토링",
      provider: "박승우",
      date: "2024-08-20",
      time: "16:00",
      status: 'confirmed'
    },
    {
      id: 202,
      title: "미디어 마케팅 상담",
      provider: "김태희",
      date: "2024-08-25",
      time: "13:30",
      status: 'confirmed'
    }
  ];

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };
  
  const handleRemoveWishlist = (id: number) => {
    // 실제로는 API를 호출하여 찜 목록에서 제거
    toast.success("찜 목록에서 제거되었습니다.");
  };
  
  const handleCancelReservation = (id: number) => {
    // 실제로는 API를 호출하여 예약 취소
    toast.success("예약이 취소되었습니다.");
  };

  const handleMessageProvider = (providerName: string) => {
    // 메시지 페이지로 이동
    navigate('/messages', { state: { recipient: providerName } });
  };

  const handleReservationDetail = (id: number) => {
    // 실제로는 예약 상세 페이지로 이동
    toast.info("예약 상세 정보를 확인합니다.");
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
          <h1 className="text-xl font-bold">내 프로필</h1>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* 사이드바와 콘텐츠 영역 분리 */}
          <div className="flex flex-col md:flex-row">
            {/* 사이드바 */}
            <div className="w-full md:w-64 bg-gray-50 p-4">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleTabChange('wishlist')}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'wishlist' ? 'bg-primary text-white' : 'hover:bg-gray-200'
                  }`}
                >
                  <Heart size={18} />
                  <span>찜한 재능</span>
                </button>
                <button
                  onClick={() => handleTabChange('pending')}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'pending' ? 'bg-primary text-white' : 'hover:bg-gray-200'
                  }`}
                >
                  <Clock size={18} />
                  <span>대기 중인 예약</span>
                </button>
                <button
                  onClick={() => handleTabChange('confirmed')}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'confirmed' ? 'bg-primary text-white' : 'hover:bg-gray-200'
                  }`}
                >
                  <CheckCircle size={18} />
                  <span>확정된 예약</span>
                </button>
              </div>
            </div>

            {/* 콘텐츠 영역 */}
            <div className="flex-1 p-6">
              {/* 찜한 재능 목록 */}
              {activeTab === 'wishlist' && (
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
              )}

              {/* 대기 중인 예약 */}
              {activeTab === 'pending' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">대기 중인 예약</h2>
                  {pendingReservations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      대기 중인 예약이 없습니다.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingReservations.map(reservation => (
                        <div key={reservation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{reservation.title}</h3>
                              <p className="text-sm text-gray-600">by {reservation.provider}</p>
                              <div className="flex items-center mt-2 text-sm">
                                <Calendar size={16} className="mr-1 text-gray-500" />
                                <span>{reservation.date} {reservation.time}</span>
                              </div>
                              <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full mt-2">
                                승인 대기 중
                              </span>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <button
                                onClick={() => handleMessageProvider(reservation.provider)}
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                                aria-label="메시지 보내기"
                              >
                                <MessageSquare size={18} />
                              </button>
                              <button
                                onClick={() => handleCancelReservation(reservation.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                                aria-label="예약 취소"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 확정된 예약 */}
              {activeTab === 'confirmed' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">확정된 예약</h2>
                  {confirmedReservations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      확정된 예약이 없습니다.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {confirmedReservations.map(reservation => (
                        <div key={reservation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{reservation.title}</h3>
                              <p className="text-sm text-gray-600">by {reservation.provider}</p>
                              <div className="flex items-center mt-2 text-sm">
                                <Calendar size={16} className="mr-1 text-gray-500" />
                                <span>{reservation.date} {reservation.time}</span>
                              </div>
                              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-2">
                                예약 확정
                              </span>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <button
                                onClick={() => handleReservationDetail(reservation.id)}
                                className="px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                              >
                                상세 정보
                              </button>
                              <button
                                onClick={() => navigate('/video-chat')}
                                className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                              >
                                화상 수업
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
