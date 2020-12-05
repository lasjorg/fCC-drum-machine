import React, { useEffect, useState } from 'react';
import './App.css';
import { Button } from './Button';

import { createBank } from './utils/createBank';

function DrumMachine() {
  const [description, setDescription] = useState('');
  const [bank, setBank] = useState(createBank('bank1'));
  const [volume, setVolume] = useState(0.7);

  const handleKeyPress = React.useCallback(
    (e) => {
      // test requires the actual audio element to have .play called on it
      // test also expects the key to match the keyCodes for uppercase letters
      // const keyCodes = [ 81, 87, 69, 65, 83, 68, 90, 88, 67 ];
      // i.e. this will pass clip.id === e.key.toUpperCase() this will fail clip.id.toUpperCase() === e.key
      const [audio] = Array.from(document.querySelectorAll('.clip')).filter(
        (clip) => clip.id === e.key.toUpperCase()
      );

      if (audio) {
        setDescription(audio.dataset.name || '');
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play();

        audio.parentElement.classList.toggle('active');
        setTimeout(() => {
          audio.parentElement.classList.toggle('active');
        }, 300);
      }
    },
    [volume]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleButtonClick = ({ target }) => {
    const button = target;
    const audio = button.firstElementChild;

    if (audio) {
      setDescription(audio.dataset.name || '');
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play();
    }
  };

  const handleBankSwitch = ({ target }, bank) => {
    document
      .querySelectorAll('.sound-banks .pad-button')
      .forEach((button) => button.classList.remove('active'));
    target.classList.add('active');

    setBank(createBank(bank));
  };

  return (
    <>
      <div
        id="drum-machine"
        className="drum-machine drum-machine-container"
        tabIndex="0"
      >
        <div className="pads-display-grid">
          <div className="display" id="display">
            {description}
          </div>
          {bank.map(({ id, link, key, description }) => {
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
        <div className="controls">
          <div className="sound-banks">
            <h3 className="control-heading">Bank selector</h3>
            <button
              className="pad-button active"
              onClick={(e) => handleBankSwitch(e, 'bank1')}
            >
              1
            </button>
            <button
              className="pad-button"
              onClick={(e) => handleBankSwitch(e, 'bank2')}
            >
              2
            </button>
            <button
              className="pad-button"
              onClick={(e) => handleBankSwitch(e, 'bank3')}
            >
              3
            </button>
            <button
              className="pad-button"
              onClick={(e) => handleBankSwitch(e, 'bank4')}
            >
              4
            </button>
          </div>
          <div className="volume">
            <h3 className="control-heading">
              Volume: <span>{Math.round(volume * 100)}</span>
            </h3>
            <input
              type="range"
              name="volume"
              value={Math.round(volume * 100)}
              onChange={(e) => setVolume(e.target.value / 100)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DrumMachine;
