import React from "react";
import { GrPowerReset } from "react-icons/gr";
import { HiOutlinePlayPause } from "react-icons/hi2";

interface Props {
	currentTime: number;
	onTapResetButton: () => void;
	onTapPauseButton: () => void;
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

const Timer = (props: Props) => {
	return (
		<div className="flex-1 bg-gray-600 rounded flex items-center cursor-pointer md:text-xl m-2">
			<div className="mx-2">{formatSeconds(props.currentTime)}</div>
			<div
				className="m-1"
				onClick={props.onTapPauseButton}
				onKeyUp={props.onTapPauseButton}
			>
				<HiOutlinePlayPause />
			</div>
			<div
				className="m-1"
				onClick={props.onTapResetButton}
				onKeyUp={props.onTapResetButton}
			>
				<GrPowerReset />
			</div>
		</div>
	);
};

export default Timer;
