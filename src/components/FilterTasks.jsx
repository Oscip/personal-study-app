import DropDown from "./DropDown.jsx";
import React, {useState} from "react";
import SortArrow from "./SortArrow.jsx";

export default function FilterTasks({filterValue}) {
    const [completed, setCompleted] = useState(false);
    const [category, setCategory] = useState("All");

    const checkCompleted = ({completed}) => {
        setCompleted(completed);
        filterValue({completed, category});
    }

    const checkCategory = ({category}) => {
        setCategory(category);
        filterValue({completed, category});
    }


    return (
        <>
            <div>
                <div className="task-header">
                    <div className="left-panel" id="left-panel-header">
                        <div className="arrow-filter-container">
                            <SortArrow text="Completed" completedValue={checkCompleted}/>
                        </div>
                    </div>
                    <div className="toDoItemContent">
                        <div className="dropdownDiv">
                            <div className="arrow-filter-container-category" id="category-div">
                                <DropDown options={["All", "School", "Free Time", "Home"]}
                                          defaultOption="Category" categoryValue={checkCategory}/>
                            </div>
                        </div>
                        <div className="arrow-filter-container">
                            <p className="task-header-text">Description</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="spanLine"/>
        </>
    )
}