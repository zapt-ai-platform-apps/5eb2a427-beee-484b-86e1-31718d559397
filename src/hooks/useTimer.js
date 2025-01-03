import { useState, useEffect } from 'react';

const useTimer = () => {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer(timer => timer + 1);
            }, 1000);
        } else if (!isRunning && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, timer]);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
        }
    };

    const resetTimer = () => {
        setTimer(0);
        setIsRunning(false);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    return { timer, isRunning, startTimer, resetTimer, stopTimer };
};

export default useTimer;