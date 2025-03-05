
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Star, Heart, Calendar, Video } from "lucide-react";
import { toast } from "sonner";

type TalentItem = {
  id: number;
  title: string;
  category: string;
  provider: string;
  providerAvatar: string;
  description: string;
  image: string;
  liked: boolean;
  rating: number;
  ratingCount: number;
  isFriend: boolean;
  location: string;
  schedule: string;
};

const TalentSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>("latest");
  const [showFriendsOnly, setShowFriendsOnly] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const categories = [
    "전체", "교육", "IT 기술", "디자인", "상담", "언어", "음악", "요리", "운동", "취미"
  ];

  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "rating", label: "평점순" },
    { value: "popular", label: "인기순" }
  ];

  // 더미 데이터 생성
  const [talents, setTalents] = useState<TalentItem[]>([
    {
      id: 1,
      title: "청소년 코딩 멘토링",
      category: "교육",
      provider: "김민준",
      providerAvatar: "https://i.pravatar.cc/150?img=1",
      description: "코딩에 관심있는 청소년들을 위한 1:1 멘토링입니다. 기초부터 차근차근 알려드립니다.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      liked: false,
      rating: 4.8,
      ratingCount: 24,
      isFriend: true,
      location: "서울 강남구",
      schedule: "주 1회, 1시간"
    },
    {
      id: 2,
      title: "UX/UI 디자인 기초 지도",
      category: "디자인",
      provider: "이지현",
      providerAvatar: "https://i.pravatar.cc/150?img=2",
      description: "UI/UX 디자인의 기본 원리와 실무 노하우를 알려드립니다. 포트폴리오 제작도 도와드려요.",
      image: "https://images.unsplash.com/photo-1542744094-3a99818b5d9e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      liked: false,
      rating: 4.5,
      ratingCount: 18,
      isFriend: false,
      location: "서울 마포구",
      schedule: "격주 토요일, 2시간"
    },
    {
      id: 3,
      title: "진로 상담 및 멘토링",
      category: "상담",
      provider: "박서연",
      providerAvatar: "https://i.pravatar.cc/150?img=3",
      description: "취업준비생을 위한 진로상담과 이력서/자소서 첨삭을 제공합니다.",
      image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      liked: false,
      rating: 4.9,
      ratingCount: 32,
      isFriend: true,
      location: "서울 서초구",
      schedule: "협의 가능"
    },
    {
      id: 4,
      title: "영어 회화 스터디",
      category: "언어",
      provider: "최준호",
      providerAvatar: "https://i.pravatar.cc/150?img=4",
      description: "해외 생활 8년 경험을 바탕으로 실전 영어회화를 도와드립니다.",
      image: "https://images.unsplash.com/photo-1554232456-c3c8e497a8a8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      liked: false,
      rating: 4.6,
      ratingCount: 15,
      isFriend: false,
      location: "서울 종로구",
      schedule: "주 2회, 1시간"
    },
    {
      id: 5,
      title: "기타 연주 레슨",
      category: "음악",
      provider: "김하늘",
      providerAvatar: "https://i.pravatar.cc/150?img=5",
      description: "초보자도 쉽게 배울 수 있는 기타 레슨입니다. 취미로 즐길 수 있게 도와드릴게요.",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      liked: false,
      rating: 4.7,
      ratingCount: 22,
      isFriend: true,
      location: "경기 일산",
      schedule: "주말, 2시간"
    }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle like function
  const toggleLike = (id: number) => {
    setTalents(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, liked: !item.liked } 
          : item
      )
    );
    
    const talent = talents.find(t => t.id === id);
    const action = talent?.liked ? '찜 해제' : '찜하기';
    toast.success(`${talent?.title}를 ${action}했습니다.`);
  };

  // Rate talent function
  const rateTalent = (id: number, rating: number) => {
    toast.success(`${rating}점을 평가해주셨습니다.`);
  };

  // 상세 페이지로 이동
  const goToDetail = (id: number) => {
    navigate(`/talent/${id}`);
  };

  // 화상 미팅 예약 페이지로 이동
  const goToVideoSchedule = (id: number) => {
    const talent = talents.find(t => t.id === id);
    
    if (talent?.isFriend) {
      navigate("/video-schedule", { state: { donationId: id } });
    } else {
      toast.error("친구 관계인 재능 기부자와만 화상 미팅을 예약할 수 있습니다.");
    }
  };

  // 필터링된 재능 목록
  const filteredTalents = talents.filter(talent => 
    (!selectedCategory || selectedCategory === "전체" || talent.category === selectedCategory) &&
    (!showFriendsOnly || talent.isFriend) &&
    (searchQuery === "" || 
     talent.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     talent.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
     talent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     talent.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 정렬된 재능 목록
  const sortedTalents = [...filteredTalents].sort((a, b) => {
    if (selectedSort === "rating") {
      return b.rating - a.rating;
    } else if (selectedSort === "popular") {
      return b.ratingCount - a.ratingCount;
    }
    // default: latest (by id in this demo)
    return b.id - a.id;
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
          <h1 className="text-xl font-bold">재능 찾기</h1>
        </div>
      </header>

      {/* 검색 및 필터링 */}
      <div className="container mx-auto px-4 py-4">
        <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="재능, 카테고리, 멘토 검색"
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* 필터 옵션 */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="bg-white p-1 rounded-lg border border-gray-200 flex flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2 ml-auto">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <button
              className={`px-3 py-2 rounded-lg border text-sm font-medium flex items-center gap-1 ${
                showFriendsOnly
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setShowFriendsOnly(!showFriendsOnly)}
            >
              <Filter size={16} />
              <span>친구만</span>
            </button>
          </div>
        </div>

        {/* 재능 목록 */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          {sortedTalents.length > 0 ? (
            sortedTalents.map((talent) => (
              <div
                key={talent.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={talent.image}
                    alt={talent.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(talent.id);
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                    aria-label={talent.liked ? "찜 해제" : "찜하기"}
                  >
                    <Heart
                      size={18}
                      className={`${talent.liked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
                    />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-white/90 text-primary rounded-md">
                      {talent.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 
                      className="text-lg font-semibold line-clamp-1 hover:text-primary cursor-pointer"
                      onClick={() => goToDetail(talent.id)}
                    >
                      {talent.title}
                    </h3>
                    <div className="flex items-center text-sm">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-gray-700">{talent.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-1 mb-2">
                    <div className="relative">
                      <img
                        src={talent.providerAvatar}
                        alt={talent.provider}
                        className="w-6 h-6 rounded-full object-cover mr-2"
                      />
                      {talent.isFriend && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs p-0.5 rounded-full w-3 h-3 flex items-center justify-center">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">{talent.provider}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3 h-10">
                    {talent.description}
                  </p>
                  
                  <div className="flex text-xs text-gray-500 mb-3">
                    <div className="flex items-center mr-3">
                      <span className="mr-1">📍</span>
                      {talent.location}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">🕒</span>
                      {talent.schedule}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors text-sm"
                      onClick={() => goToDetail(talent.id)}
                    >
                      상세 보기
                    </button>
                    <button
                      onClick={() => goToVideoSchedule(talent.id)}
                      className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors text-sm
                        ${talent.isFriend
                          ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                      disabled={!talent.isFriend}
                    >
                      <Video size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              <p className="text-lg mb-2">검색 결과가 없습니다</p>
              <p className="text-sm">다른 검색어나 필터를 시도해보세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TalentSearchPage;
