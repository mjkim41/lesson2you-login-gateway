
import React from 'react';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Reservation {
  id: number;
  title: string;
  provider: string;
  date: string;
  time: string;
  status: string;
}

interface ConfirmedReservationsTabProps {
  reservations: Reservation[];
}

const ConfirmedReservationsTab: React.FC<ConfirmedReservationsTabProps> = ({ reservations }) => {
  const navigate = useNavigate();
  
  const handleReservationDetail = (id: number) => {
    toast.info("예약 상세 정보를 확인합니다.");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">확정된 예약</h2>
      {reservations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          확정된 예약이 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map(reservation => (
            <div key={reservation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{reservation.title}</h3>
                  <p className="text-sm text-gray-600">by {reservation.provider}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <Calendar size={16} className="mr-1 text-gray-500" />
                    <span>{reservation.date} {reservation.time}</span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-2">
                    예약 확정
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleReservationDetail(reservation.id)}
                    className="px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    상세 정보
                  </button>
                  <button
                    onClick={() => navigate('/video-chat')}
                    className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                  >
                    화상 수업
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

export default ConfirmedReservationsTab;
