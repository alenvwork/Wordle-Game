import React, { useContext, useCallback, useEffect } from 'react';
import { AppContext } from '../App';
import Key from "./Key";

function Keyboard() {
  const { onEnter, onDelete, onSelectLetter, disabledLetters } = useContext(AppContext);
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onDelete();
    } else {
      [...keys1, ...keys2, ...keys3].forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  }, [onEnter, onDelete, onSelectLetter, keys1, keys2, keys3]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className='keyboard'>
      <div className='line1'>
        {keys1.map((key) => (
          <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)} />
        ))}
      </div>
      <div className='line2'>
        {keys2.map((key) => (
          <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)} />
        ))}
      </div>
      <div className='line3'>
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => (
          <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)} />
        ))}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  );
}

export default Keyboard;
