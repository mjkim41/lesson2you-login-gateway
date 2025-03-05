
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Star, User, Calendar, MapPin, Clock, MessageCircle, Video, Share, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

type Review = {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
};

const TalentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [showAllDescription, setShowAllDescription] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // 데모 데이터
  const talent = {
    id: Number(id),
    title: "청소년 코딩 멘토링",
    category: "교육",
    provider: "김민준",
    providerAvatar: "https://i.pravatar.cc/150?img=1",
    description: `코딩에 관심있는 청소년들을 위한 1:1 멘토링입니다. 기초부터 차근차근 알려드립니다.

    다룰 수 있는 주제:
    - HTML, CSS, JavaScript 기초
    - 웹 개발 기초 (반응형 웹사이트 제작)
    - Python 기초 및 간단한 앱 만들기
    - 알고리즘 기초 및 문제 풀이
    - 프로그래밍 사고력 기르기
    
    5년간의 웹 개발 경험을 바탕으로 현업에서 실제로 쓰이는 기술들을 알려드립니다. 
    수업은 1:1로 진행되며, 학생의 수준과 관심사에 맞춰 커리큘럼을 조정합니다.
    
    코딩을 처음 접하는 학생도 쉽게 이해할 수 있도록 설명드리니 부담 없이 신청해주세요.`,
    images: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
    ],
    isFriend: true,
    rating: 4.8,
    ratingCount: 24,
    location: "서울 강남구",
    scheduleOptions: ["주 1회, 1시간", "주 2회, 1시간", "협의 가능"],
    tags: ["코딩", "프로그래밍", "웹개발", "Python", "JavaScript"],
    reviews: [
      {
        id: 1,
        userId: 201,
        userName: "박지원",
        userAvatar: "https://i.pravatar.cc/150?img=12",
        rating: 5,
        comment: "정말 쉽게 설명해주셔서 코딩이 재미있어졌어요! 덕분에 웹사이트도 만들 수 있게 되었습니다.",
        date: "2023년 12월 15일"
      },
      {
        id: 2,
        userId: 202,
        userName: "이수진",
        userAvatar: "https://i.pravatar.cc/150?img=13",
        rating: 4,
        comment: "아이가 코딩에 흥미를 가지게 되었습니다. 선생님이 정말 친절하게 알려주셔서 좋았어요.",
        date: "2023년 11월 3일"
      },
      {
        id: 3,
        userId: 203,
        userName: "최준영",
        userAvatar: "https://i.pravatar.cc/150?img=14",
        rating: 5,
        comment: "알고리즘 기초부터 차근차근 알려주셔서 이해하기 쉬웠습니다. 덕분에 코딩 테스트도 통과했어요!",
        date: "2023년 10월 22일"
      }
    ]
  };

  useEffect(() => {
    if (id) {
      // 실제로는 ID를 이용해 데이터를 가져오는 API 호출
      setMounted(true);
    }
  }, [id]);

  // Toggle like function
  const toggleLike = () => {
    setLiked(!liked);
    const action = liked ? '찜 해제' : '찜하기';
    toast.success(`${talent.title}를 ${action}했습니다.`);
  };

  // Rate talent function
  const rateTalent = (rating: number) => {
    toast.success(`${rating}점을 평가해주셨습니다. 감사합니다!`);
  };

  // 화상 미팅 예약 페이지로 이동
  const goToVideoSchedule = () => {
    if (talent.isFriend) {
      navigate("/video-schedule", { state: { donationId: talent.id } });
    } else {
      toast.error("친구 관계인 재능 기부자와만 화상 미팅을 예약할 수 있습니다.");
    }
  };

  // 메시지 보내기
  const sendMessage = () => {
    navigate(`/messages/1`, { state: { recipient: talent.provider } });
  };

  // 공유하기
  const shareTalent = () => {
    // 실제로는 공유 API 사용
    navigator.clipboard.writeText(window.location.href);
    toast.success("링크가 클립보드에 복사되었습니다!");
  };

  // 관련 재능 데이터
  const relatedTalents = [
    {
      id: 10,
      title: "웹 개발 기초 강의",
      provider: "이준호",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
      rating: 4.6
    },
    {
      id: 11,
      title: "Python 프로그래밍 입문",
      provider: "김지영",
      image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2089&q=80",
      rating: 4.7
    },
    {
      id: 12,
      title: "알고리즘 문제 풀이 특강",
      provider: "박재현",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      rating: 4.9
    }
  ];

  if (!talent || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

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
          <h1 className="text-xl font-bold">재능 상세</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* 이미지 갤러리 */}
        <div className="relative overflow-hidden rounded-xl shadow-sm mb-6">
          <div className="relative pb-[60%] bg-gray-100">
            <img 
              src={talent.images[0]} 
              alt={talent.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button 
              onClick={toggleLike}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
              aria-label={liked ? "찜 해제" : "찜하기"}
            >
              <Heart size={20} className={`${liked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
            </button>
          </div>

          <div className="flex overflow-x-auto gap-2 p-2 bg-white">
            {talent.images.map((image, index) => (
              <div 
                key={index}
                className={`w-20 h-14 flex-shrink-0 rounded-md overflow-hidden ${index === 0 ? 'ring-2 ring-primary' : ''}`}
              >
                <img 
                  src={image} 
                  alt={`${talent.title} ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 기본 정보 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
              {talent.category}
            </span>
            
            <h2 className="text-2xl font-bold mb-3">{talent.title}</h2>
            
            <div className="flex items-center mb-4">
              <div className="relative">
                <img 
                  src={talent.providerAvatar} 
                  alt={talent.provider} 
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                {talent.isFriend && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs p-0.5 rounded-full">
                    <User size={10} />
                  </span>
                )}
              </div>
              <div>
                <p className="font-medium">{talent.provider}</p>
                <div className="flex items-center text-sm">
                  <div className="flex items-center text-yellow-500">
                    <Star size={14} className="fill-yellow-500" />
                    <span className="ml-1 text-gray-700">{talent.rating}</span>
                  </div>
                  <span className="mx-1 text-gray-300">|</span>
                  <span className="text-gray-600">{talent.ratingCount} 리뷰</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-4 text-sm">
              <div className="flex items-start">
                <MapPin size={16} className="text-gray-400 mr-2 mt-0.5" />
                <span>{talent.location}</span>
              </div>
              <div className="flex items-start">
                <Calendar size={16} className="text-gray-400 mr-2 mt-0.5" />
                <div>
                  {talent.scheduleOptions.map((option, idx) => (
                    <p key={idx}>{option}</p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {talent.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 상세 설명 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-3">상세 설명</h3>
            <div className={`whitespace-pre-line text-gray-700 ${!showAllDescription && 'line-clamp-5'}`}>
              {talent.description}
            </div>
            {talent.description.split('\n').length > 5 && (
              <button 
                onClick={() => setShowAllDescription(!showAllDescription)}
                className="mt-2 text-primary hover:underline flex items-center"
              >
                {showAllDescription ? (
                  <>
                    접기 <ChevronUp size={16} className="ml-1" />
                  </>
                ) : (
                  <>
                    더 보기 <ChevronDown size={16} className="ml-1" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* 리뷰 섹션 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">리뷰</h3>
              <div className="flex items-center text-sm">
                <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-medium">{talent.rating}</span>
                <span className="text-gray-500 ml-1">({talent.ratingCount})</span>
              </div>
            </div>
            
            {/* 평점 남기기 */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">평점 남기기:</p>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    onClick={() => rateTalent(star)}
                    className="p-1 focus:outline-none"
                  >
                    <Star 
                      size={20} 
                      className={`cursor-pointer hover:text-yellow-500 ${star <= talent.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* 리뷰 목록 */}
            <div className="space-y-4">
              {(showAllReviews ? talent.reviews : talent.reviews.slice(0, 2)).map((review: Review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-start">
                    <img 
                      src={review.userAvatar} 
                      alt={review.userName} 
                      className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{review.userName}</span>
                        <span className="text-gray-400 text-xs ml-2">{review.date}</span>
                      </div>
                      <div className="flex my-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={14} 
                            className={`${star <= review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {talent.reviews.length > 2 && (
                <button 
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="text-primary hover:underline text-sm w-full text-center"
                >
                  {showAllReviews ? "접기" : `더보기 (${talent.reviews.length - 2}개)`}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 관련 재능 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">관련 재능</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTalents.map((related) => (
                <div 
                  key={related.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/talent/${related.id}`)}
                >
                  <div className="h-24 overflow-hidden">
                    <img 
                      src={related.image} 
                      alt={related.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm line-clamp-1">{related.title}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">{related.provider}</span>
                      <div className="flex items-center">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-xs ml-1">{related.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 액션 버튼 */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-2">
          <button
            onClick={sendMessage}
            className="flex-1 py-2 border border-primary text-primary bg-white rounded-md hover:bg-primary/5 transition-colors flex items-center justify-center"
          >
            <MessageCircle size={18} className="mr-1" />
            메시지 보내기
          </button>
          
          <button
            onClick={goToVideoSchedule}
            className={`flex-1 py-2 rounded-md transition-colors flex items-center justify-center ${
              talent.isFriend 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!talent.isFriend}
          >
            <Video size={18} className="mr-1" />
            화상 미팅 예약
          </button>
          
          <button
            onClick={shareTalent}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            aria-label="공유하기"
          >
            <Share size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentDetailPage;
