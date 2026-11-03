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

  return (
    <main className="container">
      <h1>Chronix</h1>

      {/* menampilkan waktu stopwatch */}
      <div className="time-display">
        <h2>{formatTime(elapsedTime)}</h2>
      </div>

      {/* Tombol kontrol */}
      <div className="controls">{isRunning ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handleStart}>Start</button>
      )}</div>
    </main>
  )
}

export default App;
