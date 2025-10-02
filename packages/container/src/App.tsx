import React from 'react';
import './App.css';
const Header = React.lazy(() => import('remote/Header'));
const Footer = React.lazy(() => import('footer/Footer'));
const GlobalButton = React.lazy(() => import('footer/GlobalButton'));


function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<h1>Loading Header...</h1>}>
        <Header />
      </React.Suspense>

      <React.Suspense fallback={<h1>Loading Button...</h1>}>
        <GlobalButton />
      </React.Suspense>

      <React.Suspense fallback={<h1>Loading Footer...</h1>}>
        <Footer />
      </React.Suspense>
    </div>
  );
}

export default App;
