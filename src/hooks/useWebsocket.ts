import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

export default function useSocket() {
    const [executingTask, setExecutingTask] = useState<any>(null);
    const [executedTask, setExecutedTask] = useState<any>(null);

    useEffect(() => {
        const handleExecuting = (data: any) => setExecutingTask(data);
        const handleExecuted = (data: any) => setExecutedTask(data);

        socket.on("executingTask", handleExecuting);
        socket.on("executedTask", handleExecuted);

        return () => {
            socket.off("executingTask", handleExecuting);
            socket.off("executedTask", handleExecuted);
        };
    }, []);

    return {
        executingTask,
        executedTask
    };
}
