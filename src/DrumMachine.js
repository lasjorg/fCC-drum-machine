import React, { useEffect, useState, useRef } from 'react';
import { drumBank } from './drum-bank';
import './App.css';
import { Button } from './Button';

const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

const drumBankWithKeys = drumBank.map((bank, i) => {
  return {
    ...bank,
    key: keys[i],
  };
});

function DrumMachine() {
  const appRef = useRef(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    appRef.current.focus();
  }, []);

  const setFocus = () => {
    appRef.current.focus();
  };

  const handleEvent = (e) => {
    // mouse click
    if (e.type === 'click') {
      const audio = e.target.firstElementChild;
      setDescription(audio.dataset.name || '');

      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
      // keyboard event
    } else if (e.type === 'keydown') {
      // test requires the actual audio element to have .play called on it
      const [audio] = Array.from(document.querySelectorAll('.clip')).filter(
        (clip) => clip.id.toLowerCase() === e.key
      );

      if (audio) {
        setDescription(audio.dataset.name || '');
        audio.parentElement.classList.toggle('active');
        audio.currentTime = 0;
        audio.play();
        setTimeout(() => {
          audio.parentElement.classList.toggle('active');
        }, 300);
      }
    }
  };

  return (
    <>
      <div
        id="drum-machine"
        className="drum-machine"
        ref={appRef}
        tabIndex="0"
        onKeyDown={handleEvent}
        onBlur={setFocus}
      >
        <div id="display">{description}</div>
        {drumBankWithKeys.map(({ id, link, key, description }) => {
          return (
            <Button
              id={id}
              key={id}
              src={link}
              letter={key}
              desc={description}
              handleClick={handleEvent}
            />
          );
        })}
      </div>
    </>
  );
}

export default DrumMachine;
