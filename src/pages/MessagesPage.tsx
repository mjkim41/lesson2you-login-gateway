
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Send, User } from "lucide-react";

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // 메시지 목록 샘플 데이터
  const messages = [
    {
      id: 1,
      sender: "김민준",
      avatar: "https://i.pravatar.cc/150?img=1",
      message: "코딩 멘토링 일정을 조율해보고 싶습니다.",
      time: "오늘",
      unread: true,
    },
    {
      id: 2,
      sender: "이지현",
      avatar: "https://i.pravatar.cc/150?img=2",
      message: "디자인 피드백 감사합니다. 다음 수업은 언제인가요?",
      time: "어제",
      unread: true,
    },
    {
      id: 3,
      sender: "박서연",
      avatar: "https://i.pravatar.cc/150?img=3",
      message: "진로 상담 세션이 매우 도움이 되었습니다. 감사합니다!",
      time: "2일 전",
      unread: false,
    },
    {
      id: 4,
      sender: "정현우",
      avatar: "https://i.pravatar.cc/150?img=4",
      message: "영어 회화 수업에 대한 자료를 보내드렸습니다.",
      time: "1주 전",
      unread: false,
    }
  ];

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
          <h1 className="text-xl font-bold">메시지함</h1>
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
            placeholder="메시지 검색"
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 메시지 목록 */}
      <div className="container mx-auto px-4 py-2">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {messages.map((message) => (
            <div 
              key={message.id}
              className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => navigate(`/messages/${message.id}`)}
            >
              <div className="relative mr-3">
                <img 
                  src={message.avatar} 
                  alt={message.sender} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                {message.unread && (
                  <span className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full border-2 border-white"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-medium truncate">{message.sender}</h3>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className={`text-sm truncate ${message.unread ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                  {message.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
