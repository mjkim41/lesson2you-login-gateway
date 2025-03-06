
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PendingReservationsTab from './PendingReservationsTab';
import ConfirmedReservationsTab from './ConfirmedReservationsTab';

type Reservation = {
  id: number;
  title: string;
  provider: string;
  date: string;
  time: string;
  status: string;
};

interface ReservationManagementTabProps {
  pendingReservations: Reservation[];
  confirmedReservations: Reservation[];
}

const ReservationManagementTab: React.FC<ReservationManagementTabProps> = ({ 
  pendingReservations, 
  confirmedReservations 
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'pending' | 'confirmed'>('pending');
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">예약 관리</h2>
      
      <Tabs defaultValue="pending" value={activeSubTab} onValueChange={(value) => setActiveSubTab(value as 'pending' | 'confirmed')}>
        <TabsList className="mb-6">
          <TabsTrigger value="pending">대기 중인 예약</TabsTrigger>
          <TabsTrigger value="confirmed">확정된 예약</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <PendingReservationsTab reservations={pendingReservations} />
        </TabsContent>
        
        <TabsContent value="confirmed">
          <ConfirmedReservationsTab reservations={confirmedReservations} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReservationManagementTab;
