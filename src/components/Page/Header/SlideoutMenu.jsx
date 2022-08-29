import { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation.jsx';
import './SlideoutMenu.css';

export default function SlideoutMenu({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);


  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;

    const clickHandler = () => setIsOpen(false);
    document.addEventListener('click', clickHandler);

    const keyHandler = (e) => {
      if (e.key !== 'Escape') return;
      clickHandler();
    };
    document.addEventListener('keydown', keyHandler);

    return () => {
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [isOpen]);

  return (
    <button className="SlideoutMenu" onClick={handleClick}>
      <div className="MenuContainer">
        <Navigation navigation={navigation} />
      </div>
    </button>
  );
}
