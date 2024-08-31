import type { Timer } from "@/app/_models/Timer";
import {
	subscribeToRoomTimer,
	updateTimer,
} from "@/app/_repositories/timerRepository";
import { useEffect, useRef, useState } from "react";

export const useTimer = (roomId: string) => {
	const [timer, setTimer] = useState<Timer | null>(null);
	const [remainingTime, setRemainingTime] = useState<number>(0);
	const timerRef = useRef<number | null>(null);

	useEffect(() => {
		const unsubscribe = subscribeToRoomTimer(roomId, (newTimer) => {
			setTimer(newTimer);
			setRemainingTime(newTimer.time);
			if (newTimer.operationType === "resume" && timerRef.current === null) {
				startLocalTimer();
			} else if (newTimer.operationType === "pause") {
				stopLocalTimer();
			} else if (newTimer.operationType === "reset") {
				stopLocalTimer();
				setRemainingTime(0);
			}
		});

		return () => {
			unsubscribe();
			stopLocalTimer();
		};
	}, [roomId]);

	const startLocalTimer = () => {
		timerRef.current = window.setInterval(() => {
			setRemainingTime((prevTime) => prevTime + 1000);
		}, 1000);
	};

	const stopLocalTimer = () => {
		if (timerRef.current !== null) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
	};

	const startTimer = async () => {
		await updateTimer("resume", roomId, remainingTime);
	};

	const pauseTimer = async () => {
		await updateTimer("pause", roomId, remainingTime);
	};

	const resetTimer = async () => {
		await updateTimer("reset", roomId, 0);
	};

	return {
		timer,
		remainingTime,
		startTimer,
		pauseTimer,
		resetTimer,
	};
};
