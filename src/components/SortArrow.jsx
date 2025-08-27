import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function SortArrow({text, completedValue}) {
    const [order, setOrder] = useState("asc");


    const sort = () => {
        const newOrder = order === "asc" ? "desc" : "asc";
        setOrder(newOrder);

        const completed = newOrder === "asc"; // asc = true, desc = false
        if (completedValue) {
            completedValue({ completed });
        }
    };
    return (
        <>
            <p className="task-header-text">{text}</p>
            <div className={`select-arrow-filter ${order}`} id="description-arrow" onClick={sort}></div>
        </>
    )
}