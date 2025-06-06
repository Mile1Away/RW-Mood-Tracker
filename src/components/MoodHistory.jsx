import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Search } from 'lucide-react'

const moods = {
  'happy': { emoji: '😊', label: 'Happy', color: '#FFD166' },
  'calm': { emoji: '😌', label: 'Calm', color: '#06D6A0' },
  'neutral': { emoji: '😐', label: 'Neutral', color: '#EBEBEB' },
  'sad': { emoji: '😢', label: 'Sad', color: '#118AB2' },
  'angry': { emoji: '😠', label: 'Angry', color: '#EF476F' },
  'anxious': { emoji: '😰', label: 'Anxious', color: '#9381FF' },
}

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  
  // Check if date is today
  if (date.toDateString() === now.toDateString()) {
    return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }
  
  // Check if date is yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }
  
  // Otherwise return full date
  return date.toLocaleDateString([], { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function MoodHistory() {
  const [moodEntries, setMoodEntries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    // Load mood entries from localStorage
    const loadedEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]')
    setMoodEntries(loadedEntries)
  }, [])
  
  // Filter entries based on search term
  const filteredEntries = moodEntries.filter(entry => {
    const moodLabel = moods[entry.mood]?.label.toLowerCase() || ''
    const notes = entry.notes.toLowerCase()
    const searchLower = searchTerm.toLowerCase()
    
    return moodLabel.includes(searchLower) || notes.includes(searchLower)
  })

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search moods or notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {filteredEntries.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          {moodEntries.length === 0 ? (
            <p>No mood entries yet. Start by recording your mood!</p>
          ) : (
            <p>No entries match your search.</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map(entry => (
            <Card key={entry.id}>
              <CardHeader className="pb-2">
                <div className="font-medium text-sm text-muted-foreground">
                  {formatDate(entry.timestamp)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{moods[entry.mood]?.emoji}</span>
                  <span className="font-semibold">{moods[entry.mood]?.label}</span>
                </div>
                {entry.notes && (
                  <p className="text-muted-foreground">{entry.notes}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

