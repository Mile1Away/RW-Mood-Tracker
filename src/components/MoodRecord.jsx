import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card } from '@/components/ui/card.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { toast } from 'sonner'

const moods = [
  { id: 'happy', emoji: '😊', label: 'Happy', color: '#FFD166' },
  { id: 'calm', emoji: '😌', label: 'Calm', color: '#06D6A0' },
  { id: 'neutral', emoji: '😐', label: 'Neutral', color: '#EBEBEB' },
  { id: 'sad', emoji: '😢', label: 'Sad', color: '#118AB2' },
  { id: 'angry', emoji: '😠', label: 'Angry', color: '#EF476F' },
  { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#9381FF' },
]

export default function MoodRecord() {
  const [selectedMood, setSelectedMood] = useState(null)
  const [notes, setNotes] = useState('')

  const handleSaveMood = () => {
    if (!selectedMood) {
      toast.error('Please select a mood')
      return
    }

    const moodEntry = {
      id: crypto.randomUUID(),
      mood: selectedMood,
      timestamp: new Date().toISOString(),
      notes: notes.trim()
    }

    // Get existing entries from localStorage or initialize empty array
    const existingEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]')
    
    // Add new entry
    const updatedEntries = [moodEntry, ...existingEntries]
    
    // Save back to localStorage
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries))
    
    // Reset form
    setSelectedMood(null)
    setNotes('')
    
    // Show success message
    toast.success('Mood saved successfully!')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-6">How are you feeling?</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {moods.map((mood) => (
          <Card 
            key={mood.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md flex flex-col items-center justify-center ${
              selectedMood === mood.id ? 'ring-2 ring-primary' : ''
            }`}
            style={{ 
              backgroundColor: selectedMood === mood.id ? `${mood.color}20` : 'transparent',
            }}
            onClick={() => setSelectedMood(mood.id)}
          >
            <div className="text-4xl mb-2">{mood.emoji}</div>
            <div className="font-medium">{mood.label}</div>
          </Card>
        ))}
      </div>
      
      <div className="mt-6">
        <Textarea
          placeholder="Add a note (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      
      <Button 
        className="w-full py-6 text-lg"
        onClick={handleSaveMood}
      >
        Save Mood
      </Button>
    </div>
  )
}

