
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Clock, X, Plus, Check } from "lucide-react";
import { toast } from "sonner";

// 카테고리 및 서브카테고리 데이터
const categoryData = {
  "교육": ["초등학습", "중등학습", "고등학습", "대학/전문", "취미교육"],
  "IT 기술": ["웹개발", "앱개발", "프로그래밍 언어", "데이터 분석", "인공지능"],
  "디자인": ["그래픽디자인", "UI/UX", "일러스트", "제품디자인", "인테리어"],
  "상담": ["진로상담", "심리상담", "학업상담", "취업상담", "재테크상담"],
  "언어": ["영어", "중국어", "일본어", "한국어", "기타 외국어"],
  "음악": ["보컬", "악기연주", "작곡", "믹싱", "음악이론"],
  "요리": ["한식", "양식", "일식", "중식", "베이킹"],
  "운동": ["요가", "필라테스", "웨이트", "러닝", "스포츠"],
  "취미": ["그림", "공예", "사진", "여행", "원예"],
  "기타": ["기타"]
};

interface TalentFormData {
  title: string;
  mainCategory: string;
  subCategory: string;
  description: string;
  schedule: string;
  imagePreview: string | null;
  talentType: "give" | "receive";
}

const TalentRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TalentFormData>({
    title: "",
    mainCategory: "",
    subCategory: "",
    description: "",
    schedule: "",
    imagePreview: null,
    talentType: "give"
  });
  
  const [subCategories, setSubCategories] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 대분류 변경 시 소분류 업데이트
    if (name === "mainCategory") {
      setFormData(prev => ({ ...prev, subCategory: "" }));
      setSubCategories(categoryData[value as keyof typeof categoryData] || []);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({ ...prev, imagePreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 입력 검증
    if (!formData.title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }
    
    if (!formData.mainCategory) {
      toast.error("대분류 카테고리를 선택해주세요.");
      return;
    }
    
    if (!formData.subCategory) {
      toast.error("소분류 카테고리를 선택해주세요.");
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error("설명을 입력해주세요.");
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
            {/* 재능 유형 선택 (주는 재능 / 받는 재능) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                재능 유형
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="talentType"
                    value="give"
                    checked={formData.talentType === "give"}
                    onChange={() => setFormData(prev => ({ ...prev, talentType: "give" }))}
                    className="mr-2"
                  />
                  <span className="text-gray-800">주는 재능</span>
                  <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">나의 재능을 타인에게 제공</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="talentType"
                    value="receive"
                    checked={formData.talentType === "receive"}
                    onChange={() => setFormData(prev => ({ ...prev, talentType: "receive" }))}
                    className="mr-2"
                  />
                  <span className="text-gray-800">받는 재능</span>
                  <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">타인의 재능을 나에게 제공받음</span>
                </label>
              </div>
            </div>

            {/* 이미지 업로드 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                대표 이미지 (선택사항)
              </label>
              <div 
                className={`border-2 border-dashed rounded-lg p-4 text-center ${
                  formData.imagePreview ? 'border-primary' : 'border-gray-300 hover:border-gray-400'
                } transition-colors`}
              >
                {formData.imagePreview ? (
                  <div className="relative">
                    <img 
                      src={formData.imagePreview} 
                      alt="Preview" 
                      className="mx-auto h-48 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, imagePreview: null }))}
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
                      클릭하여 이미지 업로드 (선택사항)
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
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="재능의 제목을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            {/* 카테고리 (대분류) */}
            <div className="mb-4">
              <label htmlFor="mainCategory" className="block text-sm font-medium text-gray-700 mb-1">
                카테고리 (대분류)
              </label>
              <select
                id="mainCategory"
                name="mainCategory"
                value={formData.mainCategory}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              >
                <option value="" disabled>대분류 선택</option>
                {Object.keys(categoryData).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* 카테고리 (소분류) */}
            <div className="mb-4">
              <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700 mb-1">
                카테고리 (소분류)
              </label>
              <select
                id="subCategory"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
                disabled={!formData.mainCategory}
              >
                <option value="" disabled>소분류 선택</option>
                {subCategories.map((subCat) => (
                  <option key={subCat} value={subCat}>{subCat}</option>
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
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="재능에 대한 상세 설명을 입력하세요"
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.description.length}/500자 (최대)
              </p>
            </div>

            {/* 일정 */}
            <div className="mb-6">
              <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">
                일정
              </label>
              <div className="relative">
                <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="schedule"
                  name="schedule"
                  type="text"
                  value={formData.schedule}
                  onChange={handleChange}
                  placeholder="가능한 일정을 입력하세요 (예: 주말 오후, 평일 저녁)"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
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
