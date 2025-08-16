import {useState} from "react";
export default function FilterTasks() {

    const [currentCategory, setCurrentCategory] = useState("");



    const categoryCreator = () => {
        const selectCategory = document.createElement("select");
        selectCategory.id = "select-category";

        const defaultOption = document.createElement("option");
        defaultOption.text = "Category"

        const homeOption = document.createElement("option");
        homeOption.text = "Home";

        const schoolOption = document.createElement("option");
        schoolOption.text = "School";

        const freeTimeOption = document.createElement("option");
        freeTimeOption.text = "Free Time";

        const parentDiv = document.getElementById("category-div");

        const categoryParagraph = document.getElementById("category-paragraph");

        const createCategoryParagraph = document.createElement("p");
        createCategoryParagraph.text = "Category";
        createCategoryParagraph.className = "task-header-text";

        const categoryArrow = document.getElementById("category-arrow");

        selectCategory.add(defaultOption);
        selectCategory.add(homeOption);
        selectCategory.add(schoolOption);
        selectCategory.add(freeTimeOption);
        parentDiv.removeChild(categoryParagraph);
        parentDiv.insertBefore(selectCategory, categoryArrow);

        console.log("category created");
    }

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
                            <div className="select-arrow-filter"></div>
                        </div>
                        <div className="arrow-filter-container-category" id="category-div">
                            <p className="task-header-text" id="category-paragraph">Category</p>
                            <div className="select-arrow-filter" id="category-arrow" onClick={categoryCreator}></div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="spanLine"/>
        </>
    )
}