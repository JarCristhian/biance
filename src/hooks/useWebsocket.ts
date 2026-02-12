import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

export default function useSocket() {
    const [newNotification, setNewNotification] = useState<any>(null);

    useEffect(() => {
        const handleNewNotification = (data: any) => setNewNotification(data);

        socket.on("newNotification", handleNewNotification);

        return () => {
            socket.off("newNotification", handleNewNotification);
        };
    }, []);

    return {
        newNotification
    };
}
