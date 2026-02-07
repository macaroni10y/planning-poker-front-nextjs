import { Pause, Play, RotateCcw } from "lucide-react";

interface Props {
    /**
     * time to display as second(s)
     */
    currentTime: number;
    /**
     * whether this timer is paused or not (used to toggle pause/play button)
     */
    isPaused: boolean;
    /**
     * executed when the reset button is tapped
     */
    onTapResetButton: () => void;
    /**
     * executed when the pause button is tapped
     */
    onTapPauseButton: () => void;
    /**
     * executed when the resume button is tapped
     */
    onTapResumeButton: () => void;
}

/**
 * convert seconds to hh:mm:ss
 * @param seconds
 * @return seconds >= 0 ? hh:mm:ss : --:--:--
 */
const formatSeconds = (seconds: number): string => {
    if (seconds < 0) return "--:--:--";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const PauseResumeButton = (props: Props) => {
    const onTap = props.isPaused
        ? props.onTapResumeButton
        : props.onTapPauseButton;
    const icon = props.isPaused ? <Play size={16} /> : <Pause size={16} />;
    return (
        <button
            type="button"
            className="m-1 border-none bg-transparent p-0 cursor-pointer"
            onClick={onTap}
            aria-label={props.isPaused ? "再開" : "一時停止"}
        >
            {icon}
        </button>
    );
};

const Timer = (props: Props) => {
    return (
        <>
            <div className="mx-2">{formatSeconds(props.currentTime)}</div>
            <PauseResumeButton {...props} />
            <button
                type="button"
                className="m-1 border-none bg-transparent p-0 cursor-pointer"
                onClick={props.onTapResetButton}
                aria-label="reset timer"
            >
                <RotateCcw size={16} />
            </button>
        </>
    );
};

export default Timer;
