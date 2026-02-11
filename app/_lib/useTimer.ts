import { useRef, useState } from "react";

export function useTimer() {
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isPaused, setIsPaused] = useState(true);
    const timerId = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (timerId.current) {
            clearInterval(timerId.current);
        }
        const created = setInterval(() => {
            setCurrentTime((current) => current + 1);
        }, 1000);
        timerId.current = created;
        setIsPaused(false);
        return () => clearInterval(created);
    };

    const clearTimer = () => {
        if (timerId.current) {
            clearInterval(timerId.current);
            timerId.current = null;
            setIsPaused(true);
        }
    };

    const handleResumeTimer = (resumeFrom: number) => {
        setCurrentTime(resumeFrom);
        startTimer();
    };

    const handlePauseTimer = (time: number) => {
        setCurrentTime(time);
        clearTimer();
    };

    const handleResetTimer = () => {
        clearTimer();
        setCurrentTime(0);
        startTimer();
    };

    return {
        currentTime,
        isPaused,
        handleResetTimer,
        handlePauseTimer,
        handleResumeTimer,
    };
}
