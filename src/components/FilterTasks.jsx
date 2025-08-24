import DropDown from "./DropDown.jsx";
import React from "react";
import SortArrow from "./SortArrow.jsx";
export default function FilterTasks() {

    return (
        <>
            <div className="div-width">
                <div className="task-header">
                    <div className="left-panel">
                        <div className="arrow-filter-container">
                            <SortArrow text="Completed"/>
                        </div>
                    </div>
                    <div className="toDoItemContent">
                        <div className="arrow-filter-container">
                            <p className="task-header-text">Description</p>
                        </div>
                        <div className="arrow-filter-container-category" id="category-div">
                            <DropDown options={["All", "School", "Free Time", "Home"]}
                                      defaultOption="Category"/>
                        </div>
                    </div>
                </div>
            </div>
            <p className="spanLine"/>
        </>
    )
}