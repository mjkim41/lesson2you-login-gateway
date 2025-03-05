
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Video, Info, Search, Filter } from "lucide-react";
import { toast } from "sonner";

type ScheduleSlot = {
  id: number;
  day: string;
  date: string;
  slots: {
    id: string;
    time: string;
    available: boolean;
  }[];
};

const VideoSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 재능 기부자 샘플 데이터
  const mentor = {
    id: 1,
    name: "김민준",
    title: "프론트엔드 개발자 & 코딩 멘토",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 4.9,
    reviewCount: 42,
    bio: "5년차 프론트엔드 개발자로, React와 TypeScript를 활용한 웹 개발 경험을 나누고 있습니다. 주니어 개발자의 성장을 돕는 것에 큰 보람을 느낍니다.",
  };

  // 일정 샘플 데이터
  const scheduleData: ScheduleSlot[] = [
    {
      id: 1,
      day: "월요일",
      date: "6월 10일",
      slots: [
        { id: "mon-1", time: "10:00", available: true },
        { id: "mon-2", time: "12:00", available: false },
        { id: "mon-3", time: "14:00", available: true },
        { id: "mon-4", time: "16:00", available: true },
      ]
    },
    {
      id: 2,
      day: "화요일",
      date: "6월 11일",
      slots: [
        { id: "tue-1", time: "11:00", available: true },
        { id: "tue-2", time: "13:00", available: true },
        { id: "tue-3", time: "15:00", available: false },
        { id: "tue-4", time: "17:00", available: true },
      ]
    },
    {
      id: 3,
      day: "수요일",
      date: "6월 12일",
      slots: [
        { id: "wed-1", time: "09:00", available: true },
        { id: "wed-2", time: "11:00", available: false },
        { id: "wed-3", time: "13:00", available: true },
        { id: "wed-4", time: "15:00", available: true },
      ]
    },
  ];

  const handleSchedule = () => {
    if (selectedSlot) {
      toast.success("화상 미팅이 성공적으로 예약되었습니다!");
      // 잠시 후 화상 페이지로 이동하는 시뮬레이션 (실제로는 예약된 시간에 이동)
      setTimeout(() => {
        navigate("/video-chat");
      }, 1500);
    } else {
      toast.error("시간 슬롯을 선택해주세요.");
    }
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
          <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            <Filter size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* 멘토 프로필 */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <img 
                src={mentor.avatar} 
                alt={mentor.name} 
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{mentor.name}</h2>
                <p className="text-gray-600">{mentor.title}</p>
                <div className="flex items-center mt-1 text-sm">
                  <div className="flex items-center text-yellow-500">
                    <span>★</span>
                    <span className="ml-1 text-gray-700">{mentor.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-gray-600">{mentor.reviewCount} 리뷰</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-700">{mentor.bio}</p>
          </div>
        </div>
      </div>

      {/* 일정 선택 */}
      <div className="container mx-auto px-4 py-4">
        <h3 className="text-lg font-bold mb-3 flex items-center">
          <Calendar size={18} className="mr-2 text-primary" />
          가능한 일정
        </h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {scheduleData.map((day) => (
            <div key={day.id} className="p-4 border-b border-gray-100 last:border-b-0">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="font-medium">{day.day}</h4>
                  <p className="text-sm text-gray-500">{day.date}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {day.slots.map((slot) => (
                  <button
                    key={slot.id}
                    className={`py-2 px-3 rounded-md text-sm font-medium transition-all ${
                      !slot.available 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : selectedSlot === slot.id
                          ? 'bg-primary text-white ring-2 ring-primary ring-opacity-50' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.id)}
                  >
                    <Clock size={14} className="inline mr-1" />
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 예약 버튼 */}
      <div className="container mx-auto px-4 py-6">
        <button
          className={`w-full py-3 rounded-lg flex items-center justify-center font-medium transition-colors ${
            selectedSlot 
              ? 'bg-primary text-white hover:bg-primary/90' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleSchedule}
          disabled={!selectedSlot}
        >
          <Video size={18} className="mr-2" />
          화상 미팅 예약하기
        </button>
        <p className="text-xs text-gray-500 text-center mt-2 flex items-center justify-center">
          <Info size={12} className="mr-1" />
          예약 후 이메일로 알림을 받게 됩니다
        </p>
      </div>
    </div>
  );
};

export default VideoSchedulePage;
