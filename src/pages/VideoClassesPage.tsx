
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Video, Calendar, Clock, Search, Filter, User, Check, X } from "lucide-react";
import { toast } from "sonner";
import { format, addDays, isAfter, isBefore, isToday } from "date-fns";
import { ko } from "date-fns/locale";

type VideoClass = {
  id: number;
  title: string;
  provider: string;
  providerAvatar: string;
  category: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: "scheduled" | "completed" | "canceled";
  isMentor: boolean;
};

const VideoClassesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMentorOnly, setShowMentorOnly] = useState(false);
  
  // 현재 날짜와 시간
  const now = new Date();
  
  // 데모 데이터
  const [classes, setClasses] = useState<VideoClass[]>([
    {
      id: 1,
      title: "코딩 멘토링 세션",
      provider: "김민준",
      providerAvatar: "https://i.pravatar.cc/150?img=1",
      category: "IT 기술",
      date: addDays(now, 2),
      startTime: "14:00",
      endTime: "15:30",
      status: "scheduled",
      isMentor: false
    },
    {
      id: 2,
      title: "포트폴리오 점검 및 피드백",
      provider: "박서연",
      providerAvatar: "https://i.pravatar.cc/150?img=3",
      category: "디자인",
      date: addDays(now, 5),
      startTime: "19:00",
      endTime: "20:00",
      status: "scheduled",
      isMentor: false
    },
    {
      id: 3,
      title: "영어 회화 연습",
      provider: "나",
      providerAvatar: "https://i.pravatar.cc/150?img=8",
      category: "언어",
      date: addDays(now, -3),
      startTime: "10:00",
      endTime: "11:00",
      status: "completed",
      isMentor: true
    },
    {
      id: 4,
      title: "진로 상담 세션",
      provider: "나",
      providerAvatar: "https://i.pravatar.cc/150?img=8",
      category: "상담",
      date: addDays(now, -7),
      startTime: "16:00",
      endTime: "17:00", 
      status: "canceled",
      isMentor: true
    },
    {
      id: 5,
      title: "디자인 피드백",
      provider: "나",
      providerAvatar: "https://i.pravatar.cc/150?img=8",
      category: "디자인",
      date: addDays(now, 1),
      startTime: "13:00",
      endTime: "14:00",
      status: "scheduled",
      isMentor: true
    }
  ]);

  // 수업 취소 처리
  const cancelClass = (id: number) => {
    setClasses(prevClasses => 
      prevClasses.map(c => 
        c.id === id ? { ...c, status: "canceled" } : c
      )
    );
    toast.success("수업이 취소되었습니다.");
  };

  // 화상 채팅 페이지로 이동
  const joinVideoChat = (id: number) => {
    const classItem = classes.find(c => c.id === id);
    navigate("/video-chat", { 
      state: { 
        classId: id,
        title: classItem?.title,
        provider: classItem?.provider
      }
    });
  };

  // 현재 날짜를 기준으로 예정된 수업과 지난 수업을 필터링
  const upcomingClasses = classes.filter(c => 
    (isAfter(c.date, now) || (isToday(c.date) && c.startTime > format(now, 'HH:mm'))) && 
    c.status !== "canceled" &&
    (!showMentorOnly || c.isMentor) &&
    (searchQuery === "" || 
     c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const pastClasses = classes.filter(c => 
    (isBefore(c.date, now) && (!isToday(c.date) || c.startTime < format(now, 'HH:mm'))) || 
    c.status === "canceled" &&
    (!showMentorOnly || c.isMentor) &&
    (searchQuery === "" || 
     c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 예정된 수업 정렬 (날짜 및 시간순)
  upcomingClasses.sort((a, b) => {
    const dateCompare = a.date.getTime() - b.date.getTime();
    if (dateCompare !== 0) return dateCompare;
    return a.startTime.localeCompare(b.startTime);
  });
  
  // 지난 수업 정렬 (최신순)
  pastClasses.sort((a, b) => b.date.getTime() - a.date.getTime());
  
  // 현재 선택된 탭에 따라 표시할 수업 목록
  const displayedClasses = activeTab === "upcoming" ? upcomingClasses : pastClasses;

  // 수업을 날짜별로 그룹화
  const groupClassesByDate = (classes: VideoClass[]) => {
    const grouped: Record<string, VideoClass[]> = {};
    
    classes.forEach(classItem => {
      const dateStr = format(classItem.date, 'yyyy-MM-dd');
      if (!grouped[dateStr]) {
        grouped[dateStr] = [];
      }
      grouped[dateStr].push(classItem);
    });
    
    return grouped;
  };
  
  const groupedClasses = groupClassesByDate(displayedClasses);
  const sortedDates = Object.keys(groupedClasses).sort((a, b) => {
    if (activeTab === "upcoming") {
      return new Date(a).getTime() - new Date(b).getTime();
    } else {
      return new Date(b).getTime() - new Date(a).getTime();
    }
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
          <h1 className="text-xl font-bold">화상 수업</h1>
        </div>
      </header>

      {/* 필터링 및 탭 */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="수업명, 멘토 등으로 검색"
              className="pl-9 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className={`px-3 py-2 rounded-lg border flex items-center gap-1 ${
              showMentorOnly
                ? 'bg-primary/10 border-primary text-primary'
                : 'border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setShowMentorOnly(!showMentorOnly)}
          >
            <Filter size={16} />
            <span>내가 멘토인 수업만</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "upcoming"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              예정된 수업
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "past"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("past")}
            >
              지난 수업
            </button>
          </div>
        </div>

        {/* 수업 목록 */}
        {sortedDates.length > 0 ? (
          sortedDates.map(dateStr => (
            <div key={dateStr} className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                <Calendar size={16} className="mr-1" />
                {format(new Date(dateStr), 'yyyy년 MM월 dd일 (eee)', { locale: ko })}
                {isToday(new Date(dateStr)) && (
                  <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                    오늘
                  </span>
                )}
              </h3>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {groupedClasses[dateStr].map((classItem, index) => (
                  <div 
                    key={classItem.id}
                    className={`p-4 ${
                      index !== groupedClasses[dateStr].length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="relative mr-3">
                        <img 
                          src={classItem.providerAvatar} 
                          alt={classItem.provider} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {classItem.isMentor && (
                          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs p-0.5 rounded-full">
                            <User size={10} />
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{classItem.title}</h4>
                            <p className="text-sm text-gray-600">
                              {classItem.isMentor ? "멘티" : "멘토"}: {classItem.provider}
                            </p>
                          </div>
                          
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            classItem.status === "scheduled" 
                              ? "bg-green-100 text-green-800"
                              : classItem.status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                          }`}>
                            {classItem.status === "scheduled" ? "예정됨" : 
                            classItem.status === "completed" ? "완료됨" : "취소됨"}
                          </span>
                        </div>
                        
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <span className="flex items-center mr-4">
                            <Clock size={14} className="mr-1" />
                            {classItem.startTime} - {classItem.endTime}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                            {classItem.category}
                          </span>
                        </div>
                        
                        {/* 수업 상태에 따른 버튼 */}
                        {classItem.status === "scheduled" && (
                          <div className="mt-3 flex gap-2">
                            {/* 현재 시간이 수업 시작 시간 10분 전 이내인 경우에만 입장 버튼 활성화 */}
                            {isToday(classItem.date) && 
                              format(now, 'HH:mm') >= 
                              format(new Date(`${dateStr}T${classItem.startTime}`), 'HH:mm', { 
                                locale: ko 
                              }).slice(0, 5) && (
                              <button
                                onClick={() => joinVideoChat(classItem.id)}
                                className="px-3 py-1.5 bg-primary text-white text-sm rounded-md hover:bg-primary/90 transition-colors flex items-center"
                              >
                                <Video size={14} className="mr-1" />
                                입장하기
                              </button>
                            )}
                            
                            {/* 취소 버튼 */}
                            <button
                              onClick={() => cancelClass(classItem.id)}
                              className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors flex items-center"
                            >
                              <X size={14} className="mr-1" />
                              취소하기
                            </button>
                          </div>
                        )}
                        
                        {/* 완료된 수업 */}
                        {classItem.status === "completed" && (
                          <div className="mt-3">
                            <button 
                              className="px-3 py-1.5 border border-primary text-primary text-sm rounded-md hover:bg-primary/10 transition-colors"
                              onClick={() => toast.info("수업 리뷰 작성 페이지로 이동합니다.")}
                            >
                              리뷰 작성하기
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Video size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="font-medium text-gray-800 mb-1">
              {activeTab === "upcoming" ? "예정된 수업이 없습니다" : "지난 수업이 없습니다"}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {activeTab === "upcoming" 
                ? "새로운 화상 수업을 예약해보세요" 
                : "아직 완료된 수업이 없습니다"}
            </p>
            {activeTab === "upcoming" && (
              <button 
                onClick={() => navigate("/video-schedule")}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                수업 예약하기
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoClassesPage;
