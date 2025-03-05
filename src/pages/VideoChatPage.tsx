
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, 
  Users, Share, MoreVertical, Send, Plus, Smile
} from "lucide-react";
import { toast } from "sonner";

const VideoChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 샘플 채팅 메시지
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "김민준", text: "안녕하세요! 오늘 코딩 멘토링 시간입니다.", time: "10:01", isMe: false },
    { id: 2, sender: "나", text: "네, 안녕하세요! 잘 부탁드립니다.", time: "10:02", isMe: true },
    { id: 3, sender: "김민준", text: "오늘은 React 컴포넌트 설계에 대해 알아볼까요?", time: "10:03", isMe: false },
  ]);

  // 웹캠 설정 (실제 앱에서는 WebRTC를 사용하겠지만, 여기서는 간단히 로컬 웹캠만 표시)
  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        // 실제 앱에서는 여기서 WebRTC 연결을 설정하고
        // remoteVideoRef에 원격 스트림을 연결합니다
        
        // 데모용 지연 시뮬레이션 - 실제 구현에서는 제거
        setTimeout(() => {
          toast.success("김민준님과 연결되었습니다!");
        }, 2000);
        
      } catch (error) {
        console.error("카메라 또는 마이크를 사용할 수 없습니다:", error);
        toast.error("카메라 또는 마이크를 사용할 수 없습니다. 권한을 확인해주세요.");
      }
    };
    
    setupCamera();
    
    // 컴포넌트 언마운트 시 스트림 정리
    return () => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  // 채팅창 자동 스크롤
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isChatOpen]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // 실제 앱에서는 여기서 실제 오디오 트랙 상태를 변경합니다
    toast.info(isMuted ? "마이크가 켜졌습니다." : "마이크가 꺼졌습니다.");
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    // 실제 앱에서는 여기서 실제 비디오 트랙 상태를 변경합니다
    toast.info(isVideoOff ? "비디오가 켜졌습니다." : "비디오가 꺼졌습니다.");
  };

  const endCall = () => {
    // 실제 앱에서는 여기서 연결을 종료합니다
    toast.info("통화가 종료되었습니다.");
    navigate("/");
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: "나",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessage("");
      
      // 응답 시뮬레이션 (실제 앱에서는 실시간 메시지 수신 로직으로 대체)
      setTimeout(() => {
        const response = {
          id: chatMessages.length + 2,
          sender: "김민준",
          text: "네, 알겠습니다. 그 부분에 대해 좀 더 자세히 설명해 드릴게요.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false
        };
        setChatMessages(prev => [...prev, response]);
      }, 3000);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* 상단 네비게이션 */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 p-1.5 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white"
            aria-label="뒤로 가기"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-white font-medium">화상 미팅</h1>
            <p className="text-gray-400 text-xs">김민준님과 통화 중</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white">
            <Users size={18} />
          </button>
          <button className="p-1.5 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white">
            <Share size={18} />
          </button>
          <button className="p-1.5 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
      
      {/* 비디오 영역 */}
      <div className="flex-1 flex relative">
        {/* 메인 비디오 (상대방) */}
        <div className="w-full h-full bg-black flex items-center justify-center">
          <video 
            ref={remoteVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted // 실제 앱에서는 muted 속성 제거
          >
            {/* 비디오가 없을 때 대체 콘텐츠 */}
            {isVideoOff && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="bg-gray-700 rounded-full p-10">
                  <Users size={48} className="text-white" />
                </div>
              </div>
            )}
          </video>
          
          {/* 상대방 이름 */}
          <div className="absolute bottom-5 left-5 bg-black/50 px-3 py-1 rounded-lg text-white text-sm">
            김민준
          </div>
        </div>
        
        {/* 자신의 비디오 (PIP) */}
        <div className="absolute bottom-5 right-5 w-40 h-28 md:w-64 md:h-44 rounded-lg overflow-hidden border-2 border-gray-800 shadow-lg">
          <video 
            ref={localVideoRef}
            className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`}
            autoPlay
            playsInline
            muted
          />
          {isVideoOff && (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <Users size={32} className="text-white" />
            </div>
          )}
        </div>
        
        {/* 채팅 사이드바 (열릴 때만 표시) */}
        {isChatOpen && (
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-white shadow-lg flex flex-col h-full">
            <div className="p-3 border-b flex justify-between items-center">
              <h3 className="font-medium">채팅</h3>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft size={16} />
              </button>
            </div>
            
            {/* 메시지 영역 */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-3 space-y-3"
            >
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[75%] rounded-lg p-2 ${
                      msg.isMe 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {!msg.isMe && <p className="text-xs font-medium mb-1">{msg.sender}</p>}
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 메시지 입력 */}
            <form onSubmit={sendMessage} className="p-3 border-t flex items-center gap-2">
              <button 
                type="button"
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <Plus size={18} />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지 입력..."
                className="flex-1 py-2 px-3 border rounded-full focus:ring-1 focus:ring-primary focus:border-primary"
              />
              <button 
                type="button"
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <Smile size={18} />
              </button>
              <button 
                type="submit"
                className="p-1.5 rounded-full bg-primary text-white hover:bg-primary/90"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
      
      {/* 하단 컨트롤 */}
      <div className="bg-gray-800 px-6 py-4 flex items-center justify-center gap-4">
        <button 
          onClick={toggleMute}
          className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
        >
          {isMuted ? <MicOff size={20} className="text-white" /> : <Mic size={20} className="text-white" />}
        </button>
        <button 
          onClick={toggleVideo}
          className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
        >
          {isVideoOff ? <VideoOff size={20} className="text-white" /> : <Video size={20} className="text-white" />}
        </button>
        <button 
          onClick={endCall}
          className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
        >
          <PhoneOff size={20} className="text-white" />
        </button>
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`p-3 rounded-full ${isChatOpen ? 'bg-primary' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
        >
          <MessageSquare size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default VideoChatPage;
