import HeaderItem from "@/app/_components/uiparts/HeaderItem";
import React from "react";
import { FiPause, FiPlay } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";

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
     * executed when the reset 🔄 button is tapped
     */
    onTapResetButton: () => void;
    /**
     * executed when the pause(⏸) button is tapped
     */
    onTapPauseButton: () => void;
    /**
     * executed when the resume(▶) button is tapped
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
    const icon = props.isPaused ? <FiPlay /> : <FiPause />;
    return (
        <div className="m-1" onClick={onTap} onKeyUp={onTap}>
            {icon}
        </div>
    );
};

const Timer = (props: Props) => {
    return (
        <>
            <div className="mx-2">{formatSeconds(props.currentTime)}</div>
            <PauseResumeButton {...props} />
            <div
                className="m-1"
                onClick={props.onTapResetButton}
                onKeyUp={props.onTapResetButton}
            >
                <GrPowerReset />
            </div>
        </>
    );
};

export default Timer;
