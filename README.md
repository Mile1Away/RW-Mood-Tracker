# Mood Tracker App

A simple web application for tracking your daily moods and visualizing mood patterns over time.

## Features

- **Record Moods**: Select from 6 different moods (Happy, Calm, Neutral, Sad, Angry, Anxious) and add optional notes.
- **View History**: All recorded moods are saved and can be viewed chronologically, with search functionality.
- **Mood Insights**: Visual representations of mood patterns, including a weekly chart, distribution pie chart, and summary statistics.
- **Local Storage**: All data is stored locally in the browser, ensuring privacy and offline functionality.
- **Responsive Design**: Works well on both desktop and mobile devices.

## Technologies Used

- React
- Vite
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization
- Browser Local Storage API

## Getting Started

### Live Demo

You can access the live app at: [https://yourusername.github.io/mood-tracker](https://yourusername.github.io/mood-tracker)

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/mood-tracker.git
   cd mood-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## Usage

1. **Recording Your Mood**:
   - Navigate to the "Record" tab
   - Select one of the six mood options
   - Optionally, add a note about why you're feeling this way
   - Click the "Save Mood" button to record your mood

2. **Viewing Your Mood History**:
   - Click on the "History" tab
   - Browse through your chronological list of recorded moods
   - Use the search bar to filter entries by mood or notes content

3. **Exploring Mood Insights**:
   - Click on the "Insights" tab
   - View visualizations of your mood patterns and statistics

## Data Privacy

All your mood data is stored locally in your browser using the browser's Local Storage feature. Your data stays on your device and is not sent to any server.

## License

MIT

