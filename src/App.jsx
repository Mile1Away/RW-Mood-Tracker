import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { SmilePlus, History, BarChart3 } from 'lucide-react'
import './App.css'

// Import our custom components (to be created)
import MoodRecord from './components/MoodRecord'
import MoodHistory from './components/MoodHistory'
import MoodInsights from './components/MoodInsights'

function App() {
  const [activeTab, setActiveTab] = useState("record")

  return (
    <div className="min-h-screen max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Mood Tracker</h1>
      
      <Tabs defaultValue="record" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="record" className="flex items-center gap-2">
            <SmilePlus className="h-4 w-4" />
            <span>Record</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Insights</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="record">
          <MoodRecord />
        </TabsContent>
        
        <TabsContent value="history">
          <MoodHistory />
        </TabsContent>
        
        <TabsContent value="insights">
          <MoodInsights />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App

