
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Calendar, MapPin, Clock, X, Plus, Check } from "lucide-react";
import { toast } from "sonner";

const TalentRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const categories = [
    "교육", "IT 기술", "디자인", "상담", "언어", "음악", "요리", "운동", "취미", "기타"
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 입력 검증
    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }
    
    if (!category) {
      toast.error("카테고리를 선택해주세요.");
      return;
    }
    
    if (!description.trim()) {
      toast.error("설명을 입력해주세요.");
      return;
    }
    
    if (!imagePreview) {
      toast.error("이미지를 업로드해주세요.");
      return;
    }
    
    // 폼 제출 성공
    toast.success("재능 등록이 완료되었습니다!");
    setTimeout(() => {
      navigate("/");
    }, 1500);
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
          <h1 className="text-xl font-bold">재능 등록</h1>
        </div>
      </header>

      {/* 등록 폼 */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            {/* 이미지 업로드 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                대표 이미지
              </label>
              <div 
                className={`border-2 border-dashed rounded-lg p-4 text-center ${
                  imagePreview ? 'border-primary' : 'border-gray-300 hover:border-gray-400'
                } transition-colors`}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="mx-auto h-48 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 bg-white/80 p-1 rounded-full shadow-sm hover:bg-white"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div 
                    className="py-8 cursor-pointer"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <Upload size={36} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      클릭하여 이미지 업로드 (최대 5MB)
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF 지원
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* 제목 */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                제목
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="재능의 제목을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            {/* 카테고리 */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                카테고리
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              >
                <option value="" disabled>카테고리 선택</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* 설명 */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="재능에 대한 상세 설명을 입력하세요"
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {description.length}/500자 (최대)
              </p>
            </div>

            {/* 위치 */}
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                위치
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="활동 지역을 입력하세요 (예: 서울 강남구)"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* 일정 */}
            <div className="mb-4">
              <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">
                일정
              </label>
              <div className="relative">
                <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="schedule"
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="가능한 일정을 입력하세요 (예: 주말 오후, 평일 저녁)"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* 태그 */}
            <div className="mb-6">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                태그 (선택사항)
              </label>
              <div className="flex items-center">
                <input
                  id="tags"
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="태그를 입력하고 Enter 또는 추가 버튼을 누르세요"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-primary/10 text-primary"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 p-0.5 hover:bg-primary/20 rounded-full"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center"
              >
                <Check size={16} className="mr-1" />
                등록하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TalentRegisterPage;
