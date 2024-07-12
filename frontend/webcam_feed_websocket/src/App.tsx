import React from 'react';
import VideoStream from './VideoStream';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Live Stream</h1>
      </header>
      <main>
        <VideoStream />
      </main>
    </div>
  );
};

export default App;
