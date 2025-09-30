import {useEffect, useState} from "react";

export default function Pomodoro() {
    const [breakTime, setBreakTime] = useState(5);
    const [workTime, setWorkTime] = useState(25);
    const [currentTime, setCurrentTime] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const [sequenceCounter, setSequenceCounter] = useState(1);
    const [temporaryBreakTime, setTemporaryBreakTime] = useState(0);
    const [temporaryWorkTime, setTemporaryWorkTime] = useState(0);
    const [temporarySequenceCounter, setTemporarySequenceCounter] = useState(0);

    useEffect(() => {
        if (!timerRunning) return;
        const interval = setInterval(() => {
            setCurrentTime(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    if (onBreak) {
                        if (temporarySequenceCounter === 0) {
                            setOnBreak(false);
                            setTimerRunning(false);
                        } else {
                            setTemporarySequenceCounter(prev => prev -1);
                            return temporaryWorkTime * 60;
                        }

                        return 0;
                    } else if (!onBreak) {
                        setOnBreak(true);
                        return(temporaryBreakTime * 60)
                    }

                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timerRunning]);

    const onButtonClickPlus = (event) => {
        if (event.target.value === "breakTimer") {
            setBreakTime(prev => Math.max(prev + 1));
        } else if (event.target.value === "workTimer") {
            setWorkTime(prev => Math.max(prev + 1));
        } else if (event.target.value === "sequenceCounter") {
            setSequenceCounter(prev => Math.max(prev + 1));
        }
    }

    const onButtonClickMinus = (event) => {
        if (event.target.value === "breakTimer") {
            setBreakTime(prev => Math.max(prev - 1, 0));
        } else if (event.target.value === "workTimer") {
            setWorkTime(prev => Math.max(prev - 1, 0));
        } else if (event.target.value === "sequenceCounter") {
            setSequenceCounter(prev => Math.max(prev - 1, 0));
        }
    }

    const onButtonClickStart = () => {
        setTemporaryWorkTime(workTime);
        setTemporaryBreakTime(breakTime);
        setTemporarySequenceCounter(sequenceCounter);
        setCurrentTime(workTime * 60);
        setTimerRunning(true);
    }

    return (
        <>
            <div className={"timerShower"}>
                <p>Countdown: {Math.floor(currentTime / 60)}:{("0" + (currentTime % 60)).slice(-2)}</p>
                <button className={"smoothButton roundButton"} onClick={onButtonClickStart}>Start</button>
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
                <div className={"sequenceCounter"}>
                    <h1>Sequence</h1>
                    <p>{sequenceCounter}</p>
                    <button className={"smoothButton roundButton"} value={"sequenceCounter"} onClick={onButtonClickPlus}>+
                    </button>
                    <button className={"smoothButton roundButton"} value={"sequenceCounter"} onClick={onButtonClickMinus}>-
                    </button>
                </div>
            </div>
        </>
    );
}