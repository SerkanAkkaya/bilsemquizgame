import { useRef } from "react";



export default function Start({ setUsername }) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  return (
    <div className="start">
      <input
        className="startInput"
        placeholder="Adınızı girin"
        ref={inputRef}
      />
      <button className="startButton btn btn-outline-light" onClick={handleClick}>
        Oyuna Başla
      </button>
    </div>
  );
}