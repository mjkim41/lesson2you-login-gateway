
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UpcomingClassesTab from './UpcomingClassesTab';
import PastClassesTab from './PastClassesTab';

type Class = {
  id: number;
  title: string;
  provider: string;
  date: string;
  time: string;
  duration: string;
  platform: string;
  feedback?: boolean;
};

interface ClassManagementTabProps {
  upcomingClasses: Class[];
  pastClasses: Class[];
}

const ClassManagementTab: React.FC<ClassManagementTabProps> = ({ 
  upcomingClasses, 
  pastClasses 
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'past'>('upcoming');
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">수업 관리</h2>
      
      <Tabs defaultValue="upcoming" value={activeSubTab} onValueChange={(value) => setActiveSubTab(value as 'upcoming' | 'past')}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">예정된 수업</TabsTrigger>
          <TabsTrigger value="past">지난 수업</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <UpcomingClassesTab classes={upcomingClasses} />
        </TabsContent>
        
        <TabsContent value="past">
          <PastClassesTab classes={pastClasses} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassManagementTab;
