import React, { useState } from "react";

export default function SortArrow({text}) {
    const [order, setOrder] = useState("asc");

    const sort = () => {
        setOrder(order === "asc" ? "desc" : "asc");
    }
    return (
        <>
            <p className="task-header-text">{text}</p>
            <div className={`select-arrow-filter ${order}`} id="description-arrow" onClick={sort}></div>
        </>
    )
}