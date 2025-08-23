import DropDown from "./DropDown.jsx";
import React from "react";
export default function FilterTasks() {

    return (
        <>
            <div className="div-width">
                <div className="task-header">
                    <div className="left-panel">
                        <div className="arrow-filter-container">
                            <p className="task-header-text">Completed</p>
                            <div className="select-arrow-filter" id="completed-arrow"></div>
                        </div>
                    </div>
                    <div className="toDoItemContent">
                        <div className="arrow-filter-container">
                            <p className="task-header-text">Description</p>
                            <div className="select-arrow-filter" id="description-arrow"></div>
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