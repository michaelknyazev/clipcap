type Timestamp = number;

export function formatDuration(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        remainingSeconds.toString().padStart(2, '0'),
    ].join(':');
}

export function elapsedTime(timestamp: Timestamp): string {
    const now = new Date().getTime();
    const elapsedTime = now - timestamp;

    return formatDuration(elapsedTime);
}