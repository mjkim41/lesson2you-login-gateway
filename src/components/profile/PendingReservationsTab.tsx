
import React from 'react';
import { Calendar, MessageSquare, X } from 'lucide-react';
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

interface PendingReservationsTabProps {
  reservations: Reservation[];
}

const PendingReservationsTab: React.FC<PendingReservationsTabProps> = ({ reservations }) => {
  const navigate = useNavigate();
  
  const handleMessageProvider = (providerName: string) => {
    navigate('/messages', { state: { recipient: providerName } });
  };
  
  const handleCancelReservation = (id: number) => {
    toast.success("예약이 취소되었습니다.");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">대기 중인 예약</h2>
      {reservations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          대기 중인 예약이 없습니다.
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
                  <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full mt-2">
                    승인 대기 중
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleMessageProvider(reservation.provider)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                    aria-label="메시지 보내기"
                  >
                    <MessageSquare size={18} />
                  </button>
                  <button
                    onClick={() => handleCancelReservation(reservation.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    aria-label="예약 취소"
                  >
                    <X size={18} />
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

export default PendingReservationsTab;
