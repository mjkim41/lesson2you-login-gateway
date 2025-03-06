
import React, { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { format, addDays, subDays } from 'date-fns';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const VideoSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { providerName } = location.state || { providerName: '강사' };
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([
    '2024-08-10-10:00', '2024-08-10-11:00', '2024-08-11-14:00'
  ]);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
  };

  const handleSubmit = () => {
    if (!date) {
      toast.error('날짜를 선택해주세요.');
      return;
    }
    if (!time) {
      toast.error('시간을 선택해주세요.');
      return;
    }

    const selectedDateTime = `${format(date, 'yyyy-MM-dd')} ${time}`;
    toast.success(`${providerName} 님과의 화상 수업이 ${selectedDateTime}에 예약되었습니다!`);
    setTimeout(() => {
      navigate('/video-chat');
    }, 2000);
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let i = 9; i <= 18; i++) {
      const hour = i.toString().padStart(2, '0');
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }
    return times;
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
          <h1 className="text-xl font-bold">{providerName} 님과의 화상 수업 예약</h1>
        </div>
      </header>

      {/* 예약 폼 */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              날짜 및 시간 선택
            </h2>

            {/* 날짜 선택 (Shadcn Calendar) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                날짜
              </label>
              <div className="w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>날짜를 선택하세요</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date || undefined}
                      onSelect={handleDateChange}
                      disabled={(date) => 
                        date < subDays(new Date(), 0) || 
                        date > addDays(new Date(), 30)
                      }
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* 시간 선택 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                시간
              </label>
              <select
                value={time || ''}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="" disabled>시간 선택</option>
                {generateTimeOptions().map((time) => (
                  <option 
                    key={time} 
                    disabled={unavailableTimes.includes(date && time ? `${format(date, 'yyyy-MM-dd')}-${time}` : '')}
                  >
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* 예약 버튼 */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                예약하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSchedulePage;
