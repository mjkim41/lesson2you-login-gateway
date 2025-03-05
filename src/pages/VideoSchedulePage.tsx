
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Video, Info, Search, Filter, Check, X, Calendar as CalendarIcon, User } from "lucide-react";
import { toast } from "sonner";
import { format, addDays, isBefore } from "date-fns";
import { ko } from "date-fns/locale";

type ScheduleSlot = {
  id: number;
  date: Date;
  slots: {
    id: string;
    time: string;
    available: boolean;
  }[];
};

type Friend = {
  id: number;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  bio: string;
  isFriend: boolean;
};

const VideoSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFriendsOnly, setShowFriendsOnly] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState<number | null>(
    location.state?.donationId || null
  );
  const [requestSent, setRequestSent] = useState(false);
  const [requestApproved, setRequestApproved] = useState(false);
  
  // 현재 날짜부터 30일간의 달력 데이터 생성
  const generateCalendarData = () => {
    const calendarData: ScheduleSlot[] = [];
    const today = new Date();
    
    // 30일 동안의 슬롯 생성
    for (let i = 0; i < 30; i++) {
      const currentDate = addDays(today, i);
      
      // 일요일(0)과 토요일(6)에는 적은 슬롯 생성
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
      
      const slotCount = isWeekend ? 2 : 4;
      const slots = [];
      
      for (let j = 0; j < slotCount; j++) {
        // 시간 9시부터 시작, 2시간 간격
        const hour = 9 + (j * 2);
        const timeStr = `${hour}:00`;
        
        // 랜덤으로 일부 슬롯은 이미 예약됨 처리
        const available = Math.random() > 0.3;
        
        slots.push({
          id: `${format(currentDate, 'yyyyMMdd')}-${j}`,
          time: timeStr,
          available
        });
      }
      
      calendarData.push({
        id: i + 1,
        date: currentDate,
        slots
      });
    }
    
    return calendarData;
  };

  // 재능 기부자 데이터
  const mentors: Friend[] = [
    {
      id: 1,
      name: "김민준",
      title: "프론트엔드 개발자 & 코딩 멘토",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 4.9,
      reviewCount: 42,
      bio: "5년차 프론트엔드 개발자로, React와 TypeScript를 활용한 웹 개발 경험을 나누고 있습니다. 주니어 개발자의 성장을 돕는 것에 큰 보람을 느낍니다.",
      isFriend: true
    },
    {
      id: 2,
      name: "이지현",
      title: "UX/UI 디자이너 & 디자인 멘토",
      avatar: "https://i.pravatar.cc/150?img=2",
      rating: 4.5,
      reviewCount: 38,
      bio: "사용자 경험을 중심으로 한 디자인 철학을 가진 UX/UI 디자이너입니다. 디자인 시스템 구축과 사용자 리서치에 관한 경험을 나누고 싶습니다.",
      isFriend: false
    },
    {
      id: 3,
      name: "박서연",
      title: "진로 상담가 & 커리어 코치",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 4.9,
      reviewCount: 32,
      bio: "10년간의 HR 경력을 바탕으로 취업 준비생과 이직을 고민하는 분들에게 실질적인 도움을 드리고 있습니다. 함께 성장하는 과정을 만들어가요.",
      isFriend: true
    },
  ];

  // 선택된 멘토 정보 가져오기
  const selectedMentorData = mentors.find(mentor => mentor.id === selectedMentor) || null;
  
  // 일정 데이터 상태
  const [scheduleData, setScheduleData] = useState<ScheduleSlot[]>(generateCalendarData());
  
  // 필터링된 멘토 목록
  const filteredMentors = mentors.filter(mentor => 
    (!showFriendsOnly || mentor.isFriend) &&
    (searchQuery === "" || 
     mentor.name.includes(searchQuery) || 
     mentor.title.includes(searchQuery) ||
     mentor.bio.includes(searchQuery))
  );

  const handleSchedule = () => {
    if (!selectedMentor) {
      toast.error("재능 기부자를 선택해주세요.");
      return;
    }
    
    if (!selectedSlot) {
      toast.error("시간 슬롯을 선택해주세요.");
      return;
    }
    
    // 예약 요청 보내기
    setRequestSent(true);
    toast.info("예약 요청을 보냈습니다. 상대방의 승인을 기다려주세요.");
    
    // 상대방 수락 시뮬레이션 (3초 후)
    setTimeout(() => {
      const isApproved = Math.random() > 0.2; // 80% 확률로 승인
      setRequestApproved(isApproved);
      
      if (isApproved) {
        toast.success("화상 미팅 요청이 승인되었습니다!");
        // 잠시 후 화상 페이지로 이동하는 시뮬레이션 (실제로는 예약된 시간에 이동)
        setTimeout(() => {
          navigate("/video-chat", { 
            state: { 
              mentorId: selectedMentor,
              mentorName: selectedMentorData?.name,
              scheduleTime: selectedSlot
            }
          });
        }, 1500);
      } else {
        toast.error("상대방이 요청을 거절했습니다. 다른 시간을 선택해보세요.");
        setRequestSent(false);
      }
    }, 3000);
  };

  // 날짜 포맷 함수
  const formatDate = (date: Date) => {
    const dayOfWeek = format(date, 'EEEE', { locale: ko });
    const formattedDate = format(date, 'MM월 dd일', { locale: ko });
    return { dayOfWeek, formattedDate };
  };

  // 오늘 날짜
  const today = new Date();

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
          <h1 className="text-xl font-bold">화상 수업 예약</h1>
        </div>
      </header>

      {/* 검색 및 필터 */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="재능 기부자 또는 분야 검색"
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className={`p-2 rounded-lg border ${showFriendsOnly ? 'bg-primary/10 border-primary text-primary' : 'border-gray-200 text-gray-600'} hover:bg-gray-100 transition-colors flex items-center gap-1`}
            onClick={() => setShowFriendsOnly(!showFriendsOnly)}
          >
            <User size={18} />
            <span className="hidden sm:inline">친구만</span>
          </button>
        </div>
      </div>

      {selectedMentor ? (
        <>
          {/* 선택된 멘토 프로필 */}
          <div className="container mx-auto px-4 py-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <img 
                    src={selectedMentorData?.avatar} 
                    alt={selectedMentorData?.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{selectedMentorData?.name}</h2>
                    <p className="text-gray-600">{selectedMentorData?.title}</p>
                    <div className="flex items-center mt-1 text-sm">
                      <div className="flex items-center text-yellow-500">
                        <span>★</span>
                        <span className="ml-1 text-gray-700">{selectedMentorData?.rating}</span>
                      </div>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-gray-600">{selectedMentorData?.reviewCount} 리뷰</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">{selectedMentorData?.bio}</p>
                <button 
                  onClick={() => setSelectedMentor(null)}
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  다른 멘토 선택하기
                </button>
              </div>
            </div>
          </div>

          {/* 일정 선택 */}
          <div className="container mx-auto px-4 py-4">
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <Calendar size={18} className="mr-2 text-primary" />
              가능한 일정 (30일)
            </h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center">
                  <CalendarIcon size={18} className="mr-2 text-primary" />
                  <span className="text-sm font-medium">
                    {format(today, 'yyyy년 MM월', { locale: ko })}부터 {format(addDays(today, 30), 'yyyy년 MM월', { locale: ko })}까지
                  </span>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {scheduleData.slice(0, 10).map((day) => {
                  const { dayOfWeek, formattedDate } = formatDate(day.date);
                  const isPastDate = isBefore(day.date, today) && !isBefore(today, day.date, 'day');
                  
                  return (
                    <div 
                      key={day.id} 
                      className={`p-4 border-b border-gray-100 last:border-b-0 ${isPastDate ? 'opacity-50' : ''}`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="font-medium">{dayOfWeek}</h4>
                          <p className="text-sm text-gray-500">{formattedDate}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {day.slots.map((slot) => (
                          <button
                            key={slot.id}
                            className={`py-2 px-3 rounded-md text-sm font-medium transition-all ${
                              !slot.available || isPastDate
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : selectedSlot === slot.id
                                  ? 'bg-primary text-white ring-2 ring-primary ring-opacity-50' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            disabled={!slot.available || isPastDate || requestSent}
                            onClick={() => setSelectedSlot(slot.id)}
                          >
                            <Clock size={14} className="inline mr-1" />
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* 멘토 선택 목록 */
        <div className="container mx-auto px-4 py-4">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <User size={18} className="mr-2 text-primary" />
            재능 기부자 선택
          </h3>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {filteredMentors.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {showFriendsOnly 
                  ? "친구 목록에 재능 기부자가 없습니다." 
                  : "검색 결과가 없습니다."}
              </div>
            ) : (
              filteredMentors.map((mentor) => (
                <div 
                  key={mentor.id}
                  className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    if (mentor.isFriend) {
                      setSelectedMentor(mentor.id);
                    } else {
                      toast.error("친구 관계인 재능 기부자와만 화상 미팅을 예약할 수 있습니다.");
                    }
                  }}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <img 
                        src={mentor.avatar} 
                        alt={mentor.name} 
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      {mentor.isFriend && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs p-1 rounded-full">
                          <User size={10} />
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{mentor.name}</h4>
                        <div className="flex items-center text-sm">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1">{mentor.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{mentor.title}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{mentor.bio}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 예약 버튼 */}
      <div className="container mx-auto px-4 py-6">
        {requestSent ? (
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            {requestApproved ? (
              <div className="text-green-600 flex items-center justify-center">
                <Check size={20} className="mr-2" />
                화상 미팅이 승인되었습니다. 페이지 이동 중...
              </div>
            ) : (
              <div className="text-primary flex items-center justify-center">
                <div className="animate-spin mr-2">
                  <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
                재능 기부자의 승인을 기다리는 중...
              </div>
            )}
          </div>
        ) : (
          <button
            className={`w-full py-3 rounded-lg flex items-center justify-center font-medium transition-colors ${
              selectedMentor && selectedSlot 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleSchedule}
            disabled={!selectedMentor || !selectedSlot}
          >
            <Video size={18} className="mr-2" />
            화상 미팅 예약하기
          </button>
        )}
        <p className="text-xs text-gray-500 text-center mt-2 flex items-center justify-center">
          <Info size={12} className="mr-1" />
          예약 후 이메일로 알림을 받게 됩니다
        </p>
      </div>
    </div>
  );
};

export default VideoSchedulePage;
