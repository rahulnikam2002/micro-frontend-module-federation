import React from 'react';
import './App.css';
const Header = React.lazy(() => import('remote/Header'));


function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<h1>Loading Header...</h1>}>
        <Header />
      </React.Suspense>
    </div>
  );
}

export default App;
