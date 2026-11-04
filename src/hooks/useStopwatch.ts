import { useState, useRef, useEffect } from "react";

export function useStopwatch() {

    //State yang memengaruhi tampilan UI
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);

    //Ref untuk data di balik layar  (tidak memicu re-render)
    const timerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    // mencegah memori leak
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const start = () => {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;

        // fungsi untuk menjalankan stopwatch
        // update setiap 10 milidetik
        timerRef.current = window.setInterval(() => {
            setElapsedTime(Date.now() - startTimeRef.current);
        }, 10);
    }

    // fungsi untuk menghentikan sementara
    const pause = () => {
        setIsRunning(false);
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
    }


    // function reset
    const reset = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setIsRunning(false);
        setElapsedTime(0);
        setLaps([]); //kosongkan daftar lap
    }

    // fungsi lap
    const lap = () => {
        setLaps((prevLaps) => [elapsedTime, ...prevLaps]);
    };


    return {
        elapsedTime,
        isRunning,
        laps,
        start,
        pause,
        reset,
        lap,
    }
}