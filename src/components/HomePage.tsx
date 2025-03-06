import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, Gift, Users, HeartHandshake, Sparkles, MessageSquare, Video, Heart, Star, User, Code, Book, Music } from "lucide-react";
import { toast } from "sonner";

const HomePage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  // Categories for talent donation
  const categories = [
    { id: 1, name: "교육", icon: <Gift size={24} />, count: 128 },
    { id: 2, name: "IT 기술", icon: <Sparkles size={24} />, count: 95 },
    { id: 3, name: "디자인", icon: <Users size={24} />, count: 67 },
    { id: 4, name: "상담", icon: <HeartHandshake size={24} />, count: 54 }
  ];

  // Featured talent exchanges with likes, ratings and desired talents in return
  const [featuredDonations, setFeaturedDonations] = useState([
    {
      id: 1,
      title: "청소년 코딩 멘토링",
      category: "교육",
      subCategory: "고등학습",
      provider: "김민준",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      liked: false,
      rating: 4.8,
      ratingCount: 24,
      isFriend: true,
      talentType: "give", // 제공하는 재능
      wantedTalent: "음악 레슨", // 받고 싶은 재능
      wantedIcon: <Music size={18} /> // 받고 싶은 재능 아이콘
    },
    {
      id: 2,
      title: "UX/UI 디자인 기초 지도",
      category: "디자인",
      subCategory: "UI/UX",
      provider: "이지현",
      image: null, // 이미지 없음
      liked: false,
      rating: 4.5,
      ratingCount: 18,
      isFriend: false,
      talentType: "give", // 제공하는 재능
      wantedTalent: "프로그래밍 도움", // 받고 싶은 재능
      wantedIcon: <Code size={18} /> // 받고 싶은 재능 아이콘
    },
    {
      id: 3,
      title: "영어 회화 연습이 필요해요",
      category: "언어",
      subCategory: "영어",
      provider: "박서연",
      image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      liked: false,
      rating: 4.9,
      ratingCount: 32,
      isFriend: true,
      talentType: "receive", // 원하는 재능
      wantedTalent: "진로 상담", // 제공할 수 있는 재능
      wantedIcon: <Book size={18} /> // 제공할 수 있는 재능 아이콘
    }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle like function
  const toggleLike = (id: number) => {
    setFeaturedDonations(donations => 
      donations.map(donation => 
        donation.id === id 
          ? { ...donation, liked: !donation.liked } 
          : donation
      )
    );
    
    const donation = featuredDonations.find(d => d.id === id);
    const action = donation?.liked ? '찜 해제' : '찜하기';
    toast.success(`${donation?.title}를 ${action}했습니다.`);
  };

  // Rate donation function
  const rateDonation = (id: number, rating: number) => {
    // In a real app, this would be an API call
    toast.success(`${rating}점을 평가해주셨습니다. 감사합니다!`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`"${searchQuery}" 검색 결과를 찾고 있습니다...`);
      // 실제 구현에서는 검색 결과 페이지로 이동
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToMyProfile = () => {
    navigate("/my-profile");
    // 여기서는 현재 프로필 페이지가 없어서 임시로 토스트 메시지를 표시합니다
    toast.info("내 프로필 페이지로 이동합니다.");
  };

  const goToTalentSearch = () => {
    navigate("/talent-search");
  };

  const goToTalentRegister = () => {
    navigate("/talent-register");
  };

  const goToMessages = () => {
    navigate("/messages");
  };

  const handleDonationVideoSchedule = (event: React.MouseEvent, donationId: number) => {
    event.preventDefault();
    event.stopPropagation();
    
    const donation = featuredDonations.find(d => d.id === donationId);
    
    if (donation?.isFriend) {
      navigate("/video-schedule", { state: { donationId, providerName: donation.provider } });
    } else {
      toast.error("친구 관계인 재능 기부자와만 화상 미팅을 예약할 수 있습니다.");
    }
  };

  const goToTalentDetail = (id: number) => {
    navigate(`/talent/${id}`);
  };

  // Default placeholder image for when no images are provided
  const placeholderImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* 네비게이션 바 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 shadow-sm transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">재능나눔</span>
            </div>
            
            {/* 주요 메뉴 - 재능찾기, 재능등록만 유지 */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="/talent-search" 
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  goToTalentSearch();
                }}
              >
                재능 찾기
              </a>
              <a 
                href="/talent-register" 
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  goToTalentRegister();
                }}
              >
                재능 등록
              </a>
            </div>
            
            {/* 아이콘 메뉴 - 메시지함, 내 프로필 */}
            <div className="flex items-center space-x-3">
              {/* 메시지함 아이콘 */}
              <button 
                onClick={goToMessages}
                className="relative p-2 text-gray-700 hover:text-primary rounded-full hover:bg-gray-100 transition-colors"
                aria-label="메시지함"
              >
                <MessageSquare size={20} />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
              </button>
              
              {/* 내 프로필 아이콘 */}
              <button 
                onClick={goToMyProfile}
                className="p-2 text-gray-700 hover:text-primary rounded-full hover:bg-gray-100 transition-colors"
                aria-label="내 프로필"
              >
                <User size={20} />
              </button>
              
              <button 
                onClick={goToLogin}
                className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 나머지 홈페이지 콘텐츠는 그대로 유지 */}
      <main className="flex-grow pt-16">
        {/* 히어로 섹션 */}
        <section className={`relative py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                당신의 재능으로
              </span>
              <br /> 세상을 변화시키세요
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              전문 지식과 기술을 나누고 교환하며 더 나은 사회를 함께 만들어 가는 재능 교환 플랫폼입니다
            </p>
            
            {/* 검색 폼 */}
            <form 
              onSubmit={handleSearch}
              className={`relative max-w-md mx-auto transition-all duration-300 transform ${isSearchFocused ? "scale-105" : "scale-100"}`}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="필요한 재능을 검색해보세요"
                  className="input-animated pl-10 pr-14 py-4 w-full rounded-full focus:ring-2 focus:ring-primary"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <span className="bg-primary text-white p-1 rounded-full hover:bg-primary/90 transition-colors">
                    <ArrowRight size={20} />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* 카테고리 섹션 */}
        <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">인기 재능 카테고리</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div 
                  key={category.id}
                  className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer animate-fade-in delay-${index * 100}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      {category.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-500">{category.count}개 활동</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                  <div className="mt-4 flex justify-end">
                    <ArrowRight size={16} className="text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 특징 재능 교환 섹션 - 찜하기, 평점 및 원하는 재능 추가 */}
        <section className={`py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">주목할 만한 재능 교환</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredDonations.map((donation, index) => (
                <div 
                  key={donation.id}
                  className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in delay-${index * 100}`}
                  onClick={() => goToTalentDetail(donation.id)}
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {donation.image ? (
                      <img 
                        src={donation.image} 
                        alt={donation.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                          src={placeholderImage}
                          alt={donation.title}
                          className="w-full h-full object-cover opacity-50 transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-medium text-gray-700 bg-white/80 px-4 py-2 rounded-md">
                            이미지 없음
                          </span>
                        </div>
                      </div>
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(donation.id);
                      }}
                      className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                      aria-label={donation.liked ? "찜 해제" : "찜하기"}
                    >
                      <Heart size={20} className={`${donation.liked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      {/* 재능 유형 표시 */}
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        donation.talentType === "give" 
                          ? "bg-primary/10 text-primary" 
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {donation.talentType === "give" ? "제공하는 재능" : "원하는 재능"}
                      </div>
                      
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {donation.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">{donation.title}</h3>
                    <p className="text-gray-600 text-sm">by {donation.provider}</p>
                    
                    {/* 재능 교환 표시 */}
                    <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-xs font-medium text-gray-700 mb-1">
                        {donation.talentType === "give" 
                          ? "교환으로 원하는 재능:" 
                          : "교환으로 제공 가능한 재능:"}
                      </p>
                      <div className="flex items-center">
                        {donation.wantedIcon}
                        <span className="ml-1 text-sm font-medium">{donation.wantedTalent}</span>
                      </div>
                    </div>
                    
                    {/* 평점 표시 */}
                    <div className="flex items-center mt-3">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button 
                            key={star} 
                            onClick={(e) => {
                              e.stopPropagation();
                              rateDonation(donation.id, star);
                            }}
                            className="p-0.5 focus:outline-none"
                          >
                            <Star 
                              size={16} 
                              className={`${star <= Math.round(donation.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          </button>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {donation.rating} ({donation.ratingCount})
                      </span>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button 
                        className="flex-1 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToTalentDetail(donation.id);
                        }}
                      >
                        자세히 보기
                      </button>
                      <button 
                        onClick={(e) => handleDonationVideoSchedule(e, donation.id)}
                        className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors
                          ${donation.isFriend 
                            ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        disabled={!donation.isFriend}
                      >
                        <Video size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button 
                onClick={() => navigate('/talent-search')}
                className="inline-flex items-center px-6 py-3 bg-transparent text-primary font-medium border-2 border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
              >
                <span>모든 재능 교환 보기</span>
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto glass-panel p-10 rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">재능을 교환할 준비가 되셨나요?</h2>
              <p className="text-lg text-gray-600 mb-8">
                당신의 재능을 공유하고, 필요한 다른 재능을 얻어보세요.<br />
                함께 성장하는 새로운 방식의 교환 문화에 참여하세요.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors w-full sm:w-auto"
                  onClick={() => navigate('/talent-register')}
                >
                  재능 등록하기
                </button>
                <button 
                  className="px-6 py-3 bg-transparent text-primary font-medium border border-primary rounded-md hover:bg-primary/10 transition-colors w-full sm:w-auto"
                  onClick={() => toast.info("서비스 소개 페이지로 이동합니다!")}
                >
                  서비스 더 알아보기
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className={`bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8 transition-all duration-700 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">재능교환</h3>
              <p className="text-gray-400 text-sm">
                더 나은 사회를 위한 재능 교환 플랫폼입니다.<br />
                함께 만들어가는 따뜻한 세상을 꿈꿉니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">서비스</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/talent-search" className="hover:text-white transition-colors">재능 찾기</a></li>
                <li><a href="/talent-register" className="hover:text-white transition-colors">재능 등록</a></li>
                <li><a href="#" className="hover:text-white transition-colors">커뮤니티</a></li>
                <li><a href="#" className="hover:text-white transition-colors">성공 사례</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">회사</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">소개</a></li>
                <li><a href="#" className="hover:text-white transition-colors">팀</a></li>
                <li><a href="#" className="hover:text-white transition-colors">블로그</a></li>
                <li><a href="#" className="hover:text-white transition-colors">연락처</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">법적 정보</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
                <li><a href="#" className="hover:text-white transition-colors">개인정보 처리방침</a></li>
                <li><a href="#" className="hover:text-white transition-colors">쿠키 정책</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2023 재능교환. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
