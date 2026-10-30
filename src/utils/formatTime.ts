export function formatTime(ms: number): string {
    const minutes = Math.floor((ms / 1000 / 60) % 60).toString().padStart(2, "0");
    const seconds = Math.floor((ms /1000) % 60).toString().padStart(2, "0");
    const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, "0");

    return `${minutes}:${seconds},${milliseconds}`;
}