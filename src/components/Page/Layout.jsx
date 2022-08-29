import { Outlet } from 'react-router-dom';
import Header from './Header/Header.jsx';
import { useState, useEffect } from 'react';
// import './reset.css';
// import './global.css';
import './Layout.css';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default function Layout() {
  return (
    <>
      <div className="Layout">
        <Header />
        <main className="currentpage">
          <Outlet />
        </main>
      </div>
    </>
  );
}