import React from 'react';

export const Button = ({ id, src, letter, handleClick, desc }) => {
  return (
    <button id={id} className="drum-pad" onClick={handleClick}>
      {letter}
      <audio className="clip" id={letter} src={src} data-name={desc} />
    </button>
  );
};
