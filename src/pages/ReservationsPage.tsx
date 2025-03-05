
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Calendar, Clock, Video, Check, X, User, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { format, addDays, isToday, isBefore } from "date-fns";
import { ko } from "date-fns/locale";

type Reservation = {
  id: number;
  menteeId: number;
  menteeName: string;
  menteeAvatar: string;
  title: string;
  category: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: "pending" | "approved" | "rejected" | "canceled";
  message?: string;
};

const ReservationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"pending" | "all">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  
  // 현재 날짜
  const today = new Date();
  
  // 데모 데이터
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 1,
      menteeId: 101,
      menteeName: "이지현",
      menteeAvatar: "https://i.pravatar.cc/150?img=2",
      title: "JavaScript 기초 튜토리얼",
      category: "IT 기술",
      date: addDays(today, 2),
      startTime: "14:00",
      endTime: "15:30",
      status: "pending",
      message: "자바스크립트 기초에 대해 배우고 싶습니다. 특히 ES6 문법에 관심이 있어요."
    },
    {
      id: 2,
      menteeId: 102,
      menteeName: "박지민",
      menteeAvatar: "https://i.pravatar.cc/150?img=6",
      title: "포트폴리오 리뷰 요청",
      category: "디자인",
      date: addDays(today, 5),
      startTime: "19:00",
      endTime: "20:00",
      status: "pending",
      message: "UX/UI 디자인 포트폴리오를 만들었는데 피드백을 받고 싶습니다."
    },
    {
      id: 3,
      menteeId: 103,
      menteeName: "김하늘",
      menteeAvatar: "https://i.pravatar.cc/150?img=9",
      title: "영어 회화 연습",
      category: "언어",
      date: addDays(today, 3),
      startTime: "10:00",
      endTime: "11:00",
      status: "approved"
    },
    {
      id: 4,
      menteeId: 104,
      menteeName: "최준호",
      menteeAvatar: "https://i.pravatar.cc/150?img=4",
      title: "진로 상담 세션",
      category: "상담",
      date: addDays(today, -1),
      startTime: "16:00",
      endTime: "17:00", 
      status: "rejected"
    },
    {
      id: 5,
      menteeId: 105,
      menteeName: "이은지",
      menteeAvatar: "https://i.pravatar.cc/150?img=11",
      title: "UI 디자인 기초",
      category: "디자인",
      date: addDays(today, 7),
      startTime: "13:00",
      endTime: "14:00",
      status: "canceled"
    }
  ]);

  // 예약 승인 처리
  const approveReservation = (id: number) => {
    setReservations(prevReservations => 
      prevReservations.map(reservation => 
        reservation.id === id 
          ? { ...reservation, status: "approved" } 
          : reservation
      )
    );
    toast.success("예약이 승인되었습니다.");
  };

  // 예약 거절 처리
  const rejectReservation = (id: number) => {
    setReservations(prevReservations => 
      prevReservations.map(reservation => 
        reservation.id === id 
          ? { ...reservation, status: "rejected" } 
          : reservation
      )
    );
    toast.success("예약이 거절되었습니다.");
  };

  // 예약 취소 처리
  const cancelReservation = (id: number) => {
    setReservations(prevReservations => 
      prevReservations.map(reservation => 
        reservation.id === id 
          ? { ...reservation, status: "canceled" } 
          : reservation
      )
    );
    toast.success("예약이 취소되었습니다.");
  };

  // 메시지 보내기
  const sendMessage = (menteeId: number, menteeName: string) => {
    navigate(`/messages/${menteeId}`, { state: { recipient: menteeName } });
  };

  // 화상 채팅 페이지로 이동
  const joinVideoChat = (id: number) => {
    const reservation = reservations.find(r => r.id === id);
    navigate("/video-chat", { 
      state: { 
        classId: id,
        title: reservation?.title,
        provider: reservation?.menteeName
      }
    });
  };

  // 필터링된 예약 목록
  const filteredReservations = reservations.filter(reservation => 
    (activeTab === "pending" ? reservation.status === "pending" : true) &&
    (searchQuery === "" || 
     reservation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     reservation.menteeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     reservation.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 날짜별로 예약 정렬 (오늘/미래의 예약부터)
  filteredReservations.sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
    return a.date.getTime() - b.date.getTime();
  });

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
          <h1 className="text-xl font-bold">예약 관리</h1>
        </div>
      </header>

      {/* 필터링 및 탭 */}
      <div className="container mx-auto px-4 py-4">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="예약 제목, 멘티 이름 등으로 검색"
            className="pl-9 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "pending"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              대기 중인 예약
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "all"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("all")}
            >
              모든 예약
            </button>
          </div>
        </div>

        {/* 예약 목록 */}
        {filteredReservations.length > 0 ? (
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <div 
                key={reservation.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <img 
                      src={reservation.menteeAvatar} 
                      alt={reservation.menteeName} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{reservation.title}</h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <User size={14} className="mr-1" />
                            {reservation.menteeName}
                          </p>
                        </div>
                        
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          reservation.status === "pending" 
                            ? "bg-yellow-100 text-yellow-800"
                            : reservation.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : reservation.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                        }`}>
                          {reservation.status === "pending" ? "대기 중" : 
                           reservation.status === "approved" ? "승인됨" : 
                           reservation.status === "rejected" ? "거절됨" : "취소됨"}
                        </span>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {format(reservation.date, 'yyyy년 MM월 dd일 (eee)', { locale: ko })}
                          {isToday(reservation.date) && (
                            <span className="ml-1 px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                              오늘
                            </span>
                          )}
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {reservation.startTime} - {reservation.endTime}
                        </span>
                        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                          {reservation.category}
                        </span>
                      </div>
                      
                      {/* 예약 메시지 */}
                      {reservation.message && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                          <p className="font-medium text-xs text-gray-500 mb-1">멘티 메시지:</p>
                          {reservation.message}
                        </div>
                      )}
                      
                      {/* 예약 상태에 따른 버튼 */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {reservation.status === "pending" && (
                          <>
                            <button
                              onClick={() => approveReservation(reservation.id)}
                              className="px-3 py-1.5 bg-primary text-white text-sm rounded-md hover:bg-primary/90 transition-colors flex items-center"
                            >
                              <Check size={14} className="mr-1" />
                              승인하기
                            </button>
                            <button
                              onClick={() => rejectReservation(reservation.id)}
                              className="px-3 py-1.5 border border-red-500 text-red-500 text-sm rounded-md hover:bg-red-50 transition-colors flex items-center"
                            >
                              <X size={14} className="mr-1" />
                              거절하기
                            </button>
                          </>
                        )}
                        
                        {reservation.status === "approved" && !isBefore(reservation.date, today) && (
                          <>
                            <button
                              onClick={() => cancelReservation(reservation.id)}
                              className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors flex items-center"
                            >
                              <X size={14} className="mr-1" />
                              취소하기
                            </button>
                            
                            {isToday(reservation.date) && (
                              <button
                                onClick={() => joinVideoChat(reservation.id)}
                                className="px-3 py-1.5 bg-primary text-white text-sm rounded-md hover:bg-primary/90 transition-colors flex items-center"
                              >
                                <Video size={14} className="mr-1" />
                                입장하기
                              </button>
                            )}
                          </>
                        )}
                        
                        <button
                          onClick={() => sendMessage(reservation.menteeId, reservation.menteeName)}
                          className="px-3 py-1.5 border border-primary text-primary text-sm rounded-md hover:bg-primary/10 transition-colors flex items-center"
                        >
                          <MessageCircle size={14} className="mr-1" />
                          메시지 보내기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="font-medium text-gray-800 mb-1">
              {activeTab === "pending" ? "대기 중인 예약이 없습니다" : "예약 내역이 없습니다"}
            </h3>
            <p className="text-sm text-gray-500">
              {activeTab === "pending" 
                ? "새로운 예약 요청이 들어오면 이곳에 표시됩니다" 
                : "아직 예약 내역이 없습니다"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;
