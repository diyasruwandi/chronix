interface ControlsProps {
    isRunning: boolean;
    hasStarted: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
    onLap: () => void;
}

export function Controls({
    isRunning,
    hasStarted,
    onStart,
    onPause,
    onReset,
    onLap,
}: ControlsProps) {
    return (
        <div className="controls">
            {isRunning ? (
                <button onClick={onPause}>Pause</button>
            ) : (
                <button onClick={onStart}>Start</button>
            )}

            {isRunning ? (
                <button onClick={onLap}>Lap</button>
            ) : (
                hasStarted && <button onClick={onReset}>Reset</button>
            )}
        </div>
    )
}