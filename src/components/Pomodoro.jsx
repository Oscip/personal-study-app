import {useState} from "react";

export default function Pomodoro() {
    const [breakTime, setBreakTime] = useState(5);
    const [workTime, setWorkTime]  = useState(25);

    const onButtonClickPlus = (event) => {
        if (event.target.value === "breakTimer") {
            setBreakTime(prev => prev + 1);
        }
        else if (event.target.value === "workTimer") {
            setWorkTime(prev => prev + 1);
        }
    }

    const onButtonClickMinus = (event) => {
        if (event.target.value === "breakTimer") {
            setBreakTime(prev => prev -1);
        }
        else if (event.target.value === "workTimer") {
            setWorkTime(prev => prev - 1);
        }
    }

    return (
        <>
            <div className={"workTimer"}>
                <h1>Work Time</h1>
                <p>{workTime}</p>
                <button className={"smoothButton roundButton"} value={"workTimer"} onClick={onButtonClickPlus}>+</button>
                <button className={"smoothButton roundButton"} value={"workTimer"} onClick={onButtonClickMinus}>-</button>
            </div>
            <div className={"breakTimer"}>
                <h1>Break Time</h1>
                <p>{breakTime}</p>
                <button className={"smoothButton roundButton"} value={"breakTimer"} onClick={onButtonClickPlus}>+</button>
                <button className={"smoothButton roundButton"} value={"breakTimer"} onClick={onButtonClickMinus}>-</button>
            </div>
        </>
    );
}