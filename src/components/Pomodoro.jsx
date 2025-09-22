import {useEffect, useState} from "react";

export default function Pomodoro() {
    const [breakTime, setBreakTime] = useState(5);
    const [workTime, setWorkTime] = useState(25);
    const [currentTime, setCurrentTime] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        if (!timerRunning) return;
        const interval = setInterval(() => {
            setCurrentTime(prev => {
                if (prev <= 1) {
                    setTimerRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timerRunning]);

    const onButtonClickPlus = (event) => {
        if (event.target.value === "breakTimer") {
            setBreakTime(prev => prev + 1);
        } else if (event.target.value === "workTimer") {
            setWorkTime(prev => prev + 1);
        }
    }

    const onButtonClickMinus = (event) => {
        if (event.target.value === "breakTimer") {
            setBreakTime(prev => prev - 1);
        } else if (event.target.value === "workTimer") {
            setWorkTime(prev => prev - 1);
        }
    }

    const onButtonClickStart = () => {
        setCurrentTime(workTime * 60);
        setTimerRunning(true);
    }

    return (
        <>
            <div className={"timerShower"}>
                <p>Countdown: {Math.floor(currentTime / 60)}:{("0" + (currentTime % 60)).slice(-2)}</p>
                <button onClick={onButtonClickStart}>Start</button>
            </div>
            <div className={"timerAdjuster"}>
                <div className={"workTimer"}>
                    <h1>Work Time</h1>
                    <p>{workTime}</p>
                    <button className={"smoothButton roundButton"} value={"workTimer"} onClick={onButtonClickPlus}>+
                    </button>
                    <button className={"smoothButton roundButton"} value={"workTimer"} onClick={onButtonClickMinus}>-
                    </button>
                </div>
                <div className={"breakTimer"}>
                    <h1>Break Time</h1>
                    <p>{breakTime}</p>
                    <button className={"smoothButton roundButton"} value={"breakTimer"} onClick={onButtonClickPlus}>+
                    </button>
                    <button className={"smoothButton roundButton"} value={"breakTimer"} onClick={onButtonClickMinus}>-
                    </button>
                </div>
            </div>

        </>
    );
}