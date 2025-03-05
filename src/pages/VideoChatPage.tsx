
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Mic, MicOff, Video as VideoIcon, VideoOff, Share, Phone, MessageSquare, X } from "lucide-react";
import { toast } from "sonner";

const VideoChatPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{id: number, sender: string, text: string, timestamp: Date}[]>([]);
  const [callTime, setCallTime] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // 상대방 정보
  const mentorName = location.state?.mentorName || "김민준";
  
  // 통화 시간 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setCallTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // 페이지 로드 시 인사 메시지 자동 추가
  useEffect(() => {
    // 1초 후 상대방 인사 메시지
    setTimeout(() => {
      addMessage({
        id: Date.now(),
        sender: mentorName,
        text: "안녕하세요! 화상 수업에 오신 것을 환영합니다. 오늘은 어떤 주제에 대해 이야기해 볼까요?",
        timestamp: new Date()
      });
    }, 1000);
  }, [mentorName]);
  
  // 새 메시지 추가 시 스크롤 맨 아래로
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // 메시지 추가 함수
  const addMessage = (newMessage: {id: number, sender: string, text: string, timestamp: Date}) => {
    setMessages(prev => [...prev, newMessage]);
  };
  
  // 메시지 전송 함수
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      // 내 메시지 추가
      addMessage({
        id: Date.now(),
        sender: "나",
        text: message,
        timestamp: new Date()
      });
      
      setMessage("");
      
      // 상대방 응답 시뮬레이션 (1~3초 후)
      const responses = [
        "네, 계속해서 말씀해주세요. 잘 듣고 있습니다.",
        "흥미로운 질문이네요! 생각해볼 만한 주제입니다.",
        "좋은 지적입니다. 그런 관점으로 생각해보지 않았어요.",
        "제가 알기로는 그 부분에 대해서는 이렇게 접근하는 것이 좋습니다.",
        "더 자세히 설명해 드릴까요?",
      ];
      
      setTimeout(() => {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage({
          id: Date.now(),
          sender: mentorName,
          text: randomResponse,
          timestamp: new Date()
        });
      }, 1000 + Math.random() * 2000);
    }
  };
  
  // 통화 종료 함수
  const endCall = () => {
    const confirmEnd = window.confirm("통화를 종료하시겠습니까?");
    if (confirmEnd) {
      toast.info("통화가 종료되었습니다.");
      navigate("/");
    }
  };
  
  // 통화 시간 포맷팅
  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* 헤더 */}
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="mr-3 p-2 rounded-full text-gray-300 hover:bg-gray-700 transition-colors"
              aria-label="뒤로 가기"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold text-white">화상 수업</h1>
          </div>
          <div className="flex items-center">
            <span className="text-white bg-primary/20 rounded-full px-3 py-1 text-sm font-mono">
              {formatCallTime(callTime)}
            </span>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* 비디오 영역 */}
        <div className={`flex-1 relative ${showChat ? 'hidden md:block' : 'block'}`}>
          {/* 메인 비디오 (상대방) */}
          <div className="absolute inset-0 p-4">
            <div className="w-full h-full rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
              {!isVideoOff ? (
                <img 
                  src="https://i.pravatar.cc/150?img=1" 
                  alt="상대방 화면" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <VideoOff size={48} className="mx-auto mb-2" />
                  <p>상대방 비디오가 꺼져 있습니다</p>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {mentorName}
              </div>
            </div>
          </div>
          
          {/* 소형 비디오 (나) */}
          <div className="absolute bottom-8 right-8 w-40 h-40 md:w-48 md:h-48 rounded-lg overflow-hidden border-2 border-white shadow-lg">
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              {!isVideoOff ? (
                <img 
                  src="https://i.pravatar.cc/150?img=5" 
                  alt="내 화면" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-300">
                  <VideoOff size={24} className="mx-auto mb-1" />
                  <p className="text-xs">비디오 꺼짐</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 채팅 영역 */}
        <div 
          className={`${showChat ? 'block' : 'hidden md:block'} w-full md:w-96 bg-white border-l border-gray-200 flex flex-col h-full md:h-[calc(100vh-64px)]`}
        >
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-medium">실시간 채팅</h2>
            <button 
              onClick={() => setShowChat(false)}
              className="md:hidden p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* 메시지 목록 */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex ${msg.sender === "나" ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] rounded-lg px-3 py-2 ${
                    msg.sender === "나" 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* 메시지 입력 */}
          <form onSubmit={sendMessage} className="p-3 border-t border-gray-200 flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지 입력..."
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button 
              type="submit"
              className="bg-primary text-white rounded-r-lg px-3 py-2"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* 컨트롤 패널 */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto flex items-center justify-center space-x-4">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'} text-white`}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          
          <button 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-700'} text-white`}
          >
            {isVideoOff ? <VideoOff size={24} /> : <VideoIcon size={24} />}
          </button>
          
          <button 
            onClick={() => setShowChat(!showChat)}
            className={`p-3 rounded-full ${showChat ? 'bg-primary' : 'bg-gray-700'} text-white md:hidden`}
          >
            <MessageSquare size={24} />
          </button>
          
          <button 
            className="p-3 rounded-full bg-gray-700 text-white"
            onClick={() => toast.info("화면 공유 기능은 추후 업데이트 예정입니다.")}
          >
            <Share size={24} />
          </button>
          
          <button 
            onClick={endCall}
            className="p-3 rounded-full bg-red-500 text-white"
          >
            <Phone size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoChatPage;
