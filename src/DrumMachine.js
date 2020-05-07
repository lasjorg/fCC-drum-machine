import React, { useEffect, useState } from 'react';
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
  const [description, setDescription] = useState('');

  const handleKeyPress = (e) => {
    // test requires the actual audio element to have .play called on it
    // test also expects the key to match the keyCodes for uppercase letters
    // const keyCodes = [ 81, 87, 69, 65, 83, 68, 90, 88, 67 ];
    // i.e. this will pass clip.id === e.key.toUpperCase() this will fail clip.id.toUpperCase() === e.key
    const [audio] = Array.from(document.querySelectorAll('.clip')).filter(
      (clip) => clip.id === e.key.toUpperCase()
    );

    if (audio) {
      setDescription(audio.dataset.name || '');
      audio.currentTime = 0;
      audio.play();

      audio.parentElement.classList.toggle('active');
      setTimeout(() => {
        audio.parentElement.classList.toggle('active');
      }, 300);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleButtonClick = (e) => {
    const audio = e.target.firstElementChild;

    if (audio) {
      setDescription(audio.dataset.name || '');
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <>
      <div id="drum-machine" className="drum-machine" tabIndex="0">
        <div id="display">{description}</div>
        {drumBankWithKeys.map(({ id, link, key, description }) => {
          return (
            <Button
              id={id}
              key={id}
              src={link}
              letter={key}
              desc={description}
              handleClick={handleButtonClick}
            />
          );
        })}
      </div>
    </>
  );
}

export default DrumMachine;
