import { useState, useRef, useEffect } from "react";
import "./App.css";
import { formatTime } from "./utils/formatTime";

function App() {
  //State yang memengaruhi tampilan UI
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);


  //Ref untuk data di balik layar  (tidak memicu re-render)
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const handleStart = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;

    // fungsi untuk menjalankan stopwatch
    // update setiap 10 milidetik
    timerRef.current = window.setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 10);
  }

  // fungsi untuk menghentikan sementara
  const handlePause = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }
  // mencegah memori leak
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // function reset
  const handleReset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]); //kosongkan daftar lap
  }

  // fungsi lap
  const handleLap = () => {
    setLaps((prevLaps) => [elapsedTime, ...prevLaps]);
  };

  return (
    <main className="container">
      <h1>Chronix</h1>

      {/* menampilkan waktu stopwatch */}
      <div className="time-display">
        <h2>{formatTime(elapsedTime)}</h2>
      </div>

      {/* Tombol kontrol */}
      <div className="controls">
        {/* tampilkan daftar lap */}
        {laps.length > 0 && (
          <div className="laps-container">
            <h3>Lap Times</h3>
            <ul className="laps-list">
              {laps.map((lapTime, index) => (
                <li key={index} className="lap-item">
                  <span>Lap {laps.length - index}</span>
                  <span>{formatTime(lapTime)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isRunning ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}

        {isRunning ? (
          <button onClick={handleLap}>Lap</button>
        ) : (
          elapsedTime > 0 && <button onClick={handleReset}>Reset</button>
        )}</div>
    </main>
  )
}

export default App;
