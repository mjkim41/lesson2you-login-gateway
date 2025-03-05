
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, Gift, Users, HeartHandshake, Sparkles } from "lucide-react";
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

  // Featured talent donations
  const featuredDonations = [
    {
      id: 1,
      title: "청소년 코딩 멘토링",
      category: "교육",
      provider: "김민준",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "UX/UI 디자인 기초 지도",
      category: "디자인",
      provider: "이지현",
      image: "https://images.unsplash.com/photo-1542744094-3a99818b5d9e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "진로 상담 및 멘토링",
      category: "상담",
      provider: "박서연",
      image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* 네비게이션 바 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 shadow-sm transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">재능나눔</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a href="#" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">서비스 소개</a>
                <a href="#" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">재능 찾기</a>
                <a href="#" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">재능 등록</a>
                <a href="#" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">커뮤니티</a>
              </div>
            </div>
            <div className="flex items-center">
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
              전문 지식과 기술을 나누며 더 나은 사회를 함께 만들어 가는 재능 나눔 플랫폼입니다
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

        {/* 특징 재능 나눔 섹션 */}
        <section className={`py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">주목할 만한 재능 나눔</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredDonations.map((donation, index) => (
                <div 
                  key={donation.id}
                  className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in delay-${index * 100}`}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={donation.image} 
                      alt={donation.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                      {donation.category}
                    </span>
                    <h3 className="text-lg font-semibold mb-2">{donation.title}</h3>
                    <p className="text-gray-600 text-sm">by {donation.provider}</p>
                    <button className="mt-4 w-full py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                      자세히 보기
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="inline-flex items-center px-6 py-3 bg-transparent text-primary font-medium border-2 border-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                <span>모든 재능 나눔 보기</span>
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto glass-panel p-10 rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">재능을 나눌 준비가 되셨나요?</h2>
              <p className="text-lg text-gray-600 mb-8">
                작은 재능도 누군가에게는 큰 도움이 됩니다.<br />
                당신의 전문성과 경험을 필요한 곳에 나눠보세요.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors w-full sm:w-auto"
                  onClick={() => toast.success("재능 등록 페이지로 이동합니다!")}
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
              <h3 className="text-lg font-semibold mb-4">재능나눔</h3>
              <p className="text-gray-400 text-sm">
                더 나은 사회를 위한 재능 기부 플랫폼입니다.<br />
                함께 만들어가는 따뜻한 세상을 꿈꿉니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">서비스</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">재능 찾기</a></li>
                <li><a href="#" className="hover:text-white transition-colors">재능 등록</a></li>
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
            <p>&copy; 2023 재능나눔. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
