import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

export default function useSocket() {
    const [executingTask, setExecutingTask] = useState<any>(null);
    const [executedTask, setExecutedTask] = useState<any>(null);
    const [newNotification, setNewNotification] = useState<any>(null);

    useEffect(() => {
        const handleExecuting = (data: any) => setExecutingTask(data);
        const handleExecuted = (data: any) => setExecutedTask(data);
        const handleNewNotification = (data: any) => setNewNotification(data);

        socket.on("executingTask", handleExecuting);
        socket.on("executedTask", handleExecuted);
        socket.on("newNotification", handleNewNotification);

        return () => {
            socket.off("executingTask", handleExecuting);
            socket.off("executedTask", handleExecuted);
            socket.off("newNotification", handleNewNotification);
        };
    }, []);

    return {
        executingTask,
        executedTask,
        newNotification
    };
}
