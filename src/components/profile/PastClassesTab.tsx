
import React from 'react';
import { Calendar, Clock, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ClassItem {
  id: number;
  title: string;
  provider: string;
  date: string;
  time: string;
  duration: string;
  platform: string;
  feedback: boolean;
}

interface PastClassesTabProps {
  classes: ClassItem[];
}

const PastClassesTab: React.FC<PastClassesTabProps> = ({ classes }) => {
  const navigate = useNavigate();
  
  const handleFeedback = (id: number) => {
    toast.info("피드백을 작성할 수 있는 페이지로 이동합니다.");
  };
  
  const handleMessageProvider = (providerName: string) => {
    navigate('/messages', { state: { recipient: providerName } });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">지난 수업</h2>
      {classes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          지난 수업 내역이 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {classes.map(classItem => (
            <div key={classItem.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{classItem.title}</h3>
                  <p className="text-sm text-gray-600">by {classItem.provider}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <Calendar size={16} className="mr-1 text-gray-500" />
                    <span>{classItem.date} {classItem.time}</span>
                  </div>
                  <div className="flex items-center mt-1 text-sm">
                    <Clock size={16} className="mr-1 text-gray-500" />
                    <span>진행 시간: {classItem.duration}</span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mt-2">
                    수업 완료
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  {!classItem.feedback ? (
                    <button
                      onClick={() => handleFeedback(classItem.id)}
                      className="px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    >
                      피드백 작성
                    </button>
                  ) : (
                    <span className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-md">
                      피드백 완료
                    </span>
                  )}
                  <button
                    onClick={() => handleMessageProvider(classItem.provider)}
                    className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                  >
                    메시지 보내기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastClassesTab;
