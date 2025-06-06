import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { PieChart, Pie, LineChart, Line, XAxis, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const moods = {
  'happy': { emoji: '😊', label: 'Happy', color: '#FFD166' },
  'calm': { emoji: '😌', label: 'Calm', color: '#06D6A0' },
  'neutral': { emoji: '😐', label: 'Neutral', color: '#EBEBEB' },
  'sad': { emoji: '😢', label: 'Sad', color: '#118AB2' },
  'angry': { emoji: '😠', label: 'Angry', color: '#EF476F' },
  'anxious': { emoji: '😰', label: 'Anxious', color: '#9381FF' },
}

// Helper function to get last 7 days
const getLast7Days = () => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push({
      date,
      label: date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)
    })
  }
  return days
}

export default function MoodInsights() {
  const [moodEntries, setMoodEntries] = useState([])
  const [moodDistribution, setMoodDistribution] = useState([])
  const [weeklyMoods, setWeeklyMoods] = useState([])
  
  useEffect(() => {
    // Load mood entries from localStorage
    const loadedEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]')
    setMoodEntries(loadedEntries)
    
    // Calculate mood distribution
    const distribution = {}
    loadedEntries.forEach(entry => {
      distribution[entry.mood] = (distribution[entry.mood] || 0) + 1
    })
    
    const distributionData = Object.keys(distribution).map(mood => ({
      name: moods[mood]?.label || mood,
      value: distribution[mood],
      color: moods[mood]?.color || '#CCCCCC'
    }))
    
    setMoodDistribution(distributionData)
    
    // Calculate weekly mood data
    const last7Days = getLast7Days()
    const weeklyData = last7Days.map(day => {
      // Find mood entries for this day
      const dayEntries = loadedEntries.filter(entry => {
        const entryDate = new Date(entry.timestamp)
        return entryDate.toDateString() === day.date.toDateString()
      })
      
      // Get the most frequent mood for the day
      let moodValue = 0
      if (dayEntries.length > 0) {
        // Map moods to numeric values (happy: 5, calm: 4, neutral: 3, sad: 2, angry: 1, anxious: 0)
        const moodValues = {
          'happy': 5,
          'calm': 4,
          'neutral': 3,
          'sad': 2,
          'angry': 1,
          'anxious': 0
        }
        
        // Calculate average mood value
        const sum = dayEntries.reduce((acc, entry) => acc + (moodValues[entry.mood] || 0), 0)
        moodValue = dayEntries.length > 0 ? sum / dayEntries.length : 0
      }
      
      return {
        name: day.label,
        value: moodValue,
        // Get the color based on the mood value
        color: getMoodColor(moodValue)
      }
    })
    
    setWeeklyMoods(weeklyData)
  }, [])
  
  // Helper function to get color based on mood value
  const getMoodColor = (value) => {
    if (value >= 4.5) return moods.happy.color
    if (value >= 3.5) return moods.calm.color
    if (value >= 2.5) return moods.neutral.color
    if (value >= 1.5) return moods.sad.color
    if (value >= 0.5) return moods.angry.color
    return moods.anxious.color
  }
  
  // Find most and least frequent moods
  const getMostFrequentMood = () => {
    if (moodDistribution.length === 0) return null
    const mostFrequent = [...moodDistribution].sort((a, b) => b.value - a.value)[0]
    return {
      name: mostFrequent.name,
      percentage: Math.round((mostFrequent.value / moodEntries.length) * 100)
    }
  }
  
  const getLeastFrequentMood = () => {
    if (moodDistribution.length === 0) return null
    const leastFrequent = [...moodDistribution].sort((a, b) => a.value - b.value)[0]
    return {
      name: leastFrequent.name,
      percentage: Math.round((leastFrequent.value / moodEntries.length) * 100)
    }
  }
  
  const mostFrequent = getMostFrequentMood()
  const leastFrequent = getLeastFrequentMood()

  return (
    <div className="space-y-6">
      {moodEntries.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <p>No mood data available yet. Start by recording your mood!</p>
        </div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Weekly Mood Chart</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyMoods}>
                  <XAxis dataKey="name" />
                  <Tooltip 
                    formatter={(value) => {
                      const moodNames = ['Anxious', 'Angry', 'Sad', 'Neutral', 'Calm', 'Happy']
                      return moodNames[Math.round(value)] || 'Unknown'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4A90E2" 
                    strokeWidth={2}
                    dot={{ stroke: '#4A90E2', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#4A90E2' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Mood Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moodDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {moodDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold">{moodEntries.length}</span>
                  <span className="text-sm text-muted-foreground">Total Entries</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Mood Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {mostFrequent && (
                <p className="mb-2">Most frequent: <strong>{mostFrequent.name}</strong> ({mostFrequent.percentage}%)</p>
              )}
              {leastFrequent && (
                <p>Least frequent: <strong>{leastFrequent.name}</strong> ({leastFrequent.percentage}%)</p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

