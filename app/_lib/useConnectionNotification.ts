import { useEffect, useRef } from "react";
import { Bounce, toast } from "react-toastify";

export function useConnectionNotification(
    connectionState:
        | "connecting"
        | "connected"
        | "disconnected"
        | "reconnecting",
) {
    const hasConnectedOnce = useRef(false);

    useEffect(() => {
        if (connectionState === "connected") {
            if (hasConnectedOnce.current) {
                toast.success("Reconnected", {
                    position: "bottom-center",
                    autoClose: 3000,
                    theme: "light",
                    transition: Bounce,
                });
            }
            hasConnectedOnce.current = true;
        }
        if (connectionState === "disconnected" && hasConnectedOnce.current) {
            toast.warning("Connection lost. Reconnecting...", {
                position: "bottom-center",
                autoClose: 3000,
                theme: "light",
                transition: Bounce,
            });
        }
    }, [connectionState]);
}
