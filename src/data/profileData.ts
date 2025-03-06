
export const wishlistItems = [
  {
    id: 1,
    title: "파이썬 프로그래밍 기초",
    provider: "정상혁",
    category: "IT 기술",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    title: "영어 회화 수업",
    provider: "김지영",
    category: "교육",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    title: "웹디자인 기초",
    provider: "이현우",
    category: "디자인",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

export const pendingReservations = [
  {
    id: 101,
    title: "자바스크립트 코딩 튜터링",
    provider: "강민준",
    date: "2024-08-15",
    time: "14:00",
    status: 'pending'
  },
  {
    id: 102,
    title: "포트폴리오 리뷰",
    provider: "이서현",
    date: "2024-08-18",
    time: "10:30",
    status: 'pending'
  }
];

export const confirmedReservations = [
  {
    id: 201,
    title: "UI/UX 디자인 멘토링",
    provider: "박승우",
    date: "2024-08-20",
    time: "16:00",
    status: 'confirmed'
  },
  {
    id: 202,
    title: "미디어 마케팅 상담",
    provider: "김태희",
    date: "2024-08-25",
    time: "13:30",
    status: 'confirmed'
  }
];

export const upcomingClasses = [
  {
    id: 301,
    title: "리액트 기초 실습",
    provider: "홍길동",
    date: "2024-08-22",
    time: "15:00",
    duration: "90분",
    platform: "Zoom"
  },
  {
    id: 302,
    title: "UI/UX 디자인 트렌드",
    provider: "이민지",
    date: "2024-08-27",
    time: "13:00",
    duration: "60분",
    platform: "Google Meet"
  }
];

export const pastClasses = [
  {
    id: 401,
    title: "SQL 데이터베이스 기초",
    provider: "김철수",
    date: "2024-07-15",
    time: "14:00",
    duration: "120분",
    platform: "Zoom",
    feedback: false
  },
  {
    id: 402,
    title: "인터랙티브 디자인 워크샵",
    provider: "장미영",
    date: "2024-07-20",
    time: "10:00",
    duration: "180분",
    platform: "Google Meet",
    feedback: true
  }
];
