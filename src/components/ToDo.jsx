import {invoke} from "@tauri-apps/api/core";
import {useEffect, useState} from "react";
import React from "react";

export default function ToDo() {
    const [tasks, setTasks] = useState([]);
    const Category = {
        School: "School",
        FreeTime: "Free Time",
        Home: "Home",
    }

    const modal = () => {
        const toDoDiv = document.getElementById("toDoDiv");
        toDoDiv.style.display = "none";
        const container = document.getElementsByClassName("container")[0];
        const createModalFrame = document.createElement("div");
        createModalFrame.id = "createModalFrame";
        createModalFrame.className = "modalFrame";
        const createModalUI = document.createElement("div");
        createModalUI.id = "createModalUI";
        createModalUI.className = "modalUI";
        const closeButton = document.createElement("button");
        closeButton.textContent = "X";
        closeButton.className = "closeButton";
        closeButton.onclick = closeModal;
        createModalFrame.appendChild(createModalUI);
        createModalUI.appendChild(closeButton);
        container.appendChild(createModalFrame);
    }

    async function retrieve_tasks() {
        try {
            const result = await invoke("get_tasks");
            console.log(result);
            setTasks(result);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    async function create_task(title, description, completed, category) {
        try {
            await invoke("create_task",
                {
                    title: title,
                    description: description,
                    completed: completed,
                    category: category,
                });
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    async function update_task(id, title, description, completed, category) {
        try {
            if (category === "Free Time") {
                category = "FreeTime";
            }
            await invoke("update_task", {
                id: id,
                title: title,
                description: description,
                completed: completed,
                category: category,
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function delete_task(id) {
        try {
            await invoke("delete_task", {
                id: id,
            });
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const closeModal = () => {
        const container = document.getElementsByClassName("container")[0];
        const modalFrame = document.getElementById("createModalFrame");
        const toDoDiv = document.getElementById("toDoDiv");
        container.removeChild(modalFrame);
        toDoDiv.style.display = "block";
    }

    const createModal = (title, description, category) => {
        const completeButton = document.getElementById("completeButton");
        let completed = 0;
        if (completeButton.textContent === "Completed") {
            completed = 1;
            console.log("it worked");
        } else if (completeButton.textContent === "Uncompleted") {
            completed = 0;
        }

        if (category === "Free Time") {
            console.log("Free Time category");
            category = "FreeTime";
        }
        console.log(category);
        create_task(title, description, completed, category);
        retrieve_tasks();
        closeModal();
    }

    const onCreateButton = () => {
        modal();
        const array = ["Title", "Description"];
        const categoryArray = ["School", "Free Time", "Home"];
        const createModalUI = document.getElementById("createModalUI");
        const createSelection = document.createElement("select");
        createSelection.className = "selectCategory";
        createSelection.id = "createSelection";
        createSelection.onchange = (event) => onCreatCategoryChange(event);
        const createSelectionDiv = document.createElement("div");
        createSelectionDiv.className = "selectContainer";
        createSelectionDiv.appendChild(createSelection);

        array.forEach((item, index) => {
            const formDiv = document.createElement("div");
            formDiv.className = "formDiv";
            const createInputText = document.createElement("input");
            createInputText.type = "text";
            createInputText.placeholder = `${item}`;
            createInputText.className = "modalInput";
            createInputText.id = `createInputText${index + 1}`;
            const createLabel = document.createElement("label");
            createLabel.textContent = `${item}`;
            createLabel.htmlFor = `${item}`;
            createLabel.className = "modalLabel";
            formDiv.appendChild(createInputText);
            formDiv.appendChild(createLabel);
            createModalUI.appendChild(formDiv);
        });
        categoryArray.forEach((category, index) => {
            console.log("test");
            const createCategory = document.createElement("option");
            createCategory.value = category;
            createCategory.textContent = category;
            createSelection.appendChild(createCategory);
            console.log(`This worked ${index}`);
        });
        const completeButton = document.createElement("button");
        completeButton.id = "completeButton";
        completeButton.className = "smoothButton completeButton";
        completeButton.textContent = "Uncompleted";
        completeButton.onclick = () => onClickCompleteButton();
        const createTaskCreaterButton = document.createElement("button");
        createTaskCreaterButton.className = "smoothButton";
        createTaskCreaterButton.textContent = "Create";
        createTaskCreaterButton.id = "createButton";
        createModalUI.appendChild(createSelectionDiv);
        createModalUI.appendChild(completeButton);
        createModalUI.appendChild(createTaskCreaterButton);
        const title = document.getElementById("createInputText1");
        const description = document.getElementById("createInputText2");
        const selection = document.getElementById("createSelection");
        createTaskCreaterButton.onclick = () => createModal(title.value, description.value, selection.value);
    }

    const updateModal = (id, completed, category) => {
        const titleInput = document.getElementById("updateInput1");
        const descriptionInput = document.getElementById("updateInput2");
        update_task(id, titleInput.value, descriptionInput.value, completed, category);
        retrieve_tasks();
        closeModal();
    }

    const onUpdateButton = (id, title, description, completed, category) => {
        modal();
        const arrayValue = [title, description];
        const arrayHelp = ["Title", "Description"];
        const createModalUI = document.getElementById("createModalUI");
        arrayValue.forEach((item, index) => {
                const formDiv = document.createElement("div");
                formDiv.className = "formDiv";
                const createLabel = document.createElement("label");
                createLabel.textContent = `${arrayHelp[index]}`;
                createLabel.htmlFor = `updateInput${index + 1}`;
                createLabel.className = "modalLabel";
                const createInputText = document.createElement("input");
                createInputText.type = "text";
                createInputText.className = "modalInput";
                createInputText.value = item;
                createInputText.id = `updateInput${index + 1}`;
                createInputText.name = `updateInput${index + 1}`;
                formDiv.appendChild(createLabel);
                formDiv.appendChild(createInputText);
                createModalUI.appendChild(formDiv);
                console.log(createInputText.id);
            }
        )
        const createSaveButton = document.createElement("button");
        createSaveButton.className = "smoothButton";
        createSaveButton.textContent = "Save";
        createSaveButton.id = "saveButton";
        createSaveButton.onclick = () => updateModal(id, completed, category);
        createModalUI.appendChild(createSaveButton);
        const createDeleteButton = document.createElement("button");
        createDeleteButton.className = "smoothButton";
        createDeleteButton.textContent = "Delete";
        createDeleteButton.id = "deleteButton";
        createDeleteButton.onclick = () => onDeleteButton(id);
        createModalUI.appendChild(createDeleteButton);
    }

    useEffect(() => {
        retrieve_tasks();
    }, []);

    const onDeleteButton = (id) => {
        delete_task(id);
        retrieve_tasks();
        closeModal();
    }

    const onCheckedHandler = (id, title, description, category, event) => {
        let completed = 0;
        console.log(event.target.checked);
        if (event.target.checked) {
            completed = 1;
        } else if (!event.target.checked) {
            completed = 0;
        }
        console.log(id);
        console.log(title);
        console.log(description);
        console.log(completed);
        update_task(id, title, description, completed, category);
        retrieve_tasks();
    }

    const onClickCompleteButton = () => {
        const completeButton = document.getElementById("completeButton");
        if (completeButton.textContent === "Uncompleted") {
            completeButton.style.backgroundColor = "var(--success)";
            completeButton.textContent = "Completed";
        } else {
            completeButton.textContent = "Uncompleted";
            completeButton.style.backgroundColor = "var(--danger)";
        }
    }

    const onCreatCategoryChange = (event) => {
        const createSelection = document.getElementById("createSelection");
        console.log(createSelection.value);
        createSelection.value = event.target.value;
        console.log(createSelection.value);
    }

    const onCategoryChange = (id, event) => {
        let category = event.target.value === "Free Time" ? "FreeTime" : event.target.value;

        const task = tasks.find(task => task.id === id);
        if (task) {
            update_task(id, task.title, task.description, task.completed, category)
                .then(() => {
                    setTasks(tasks.map(task =>
                        task.id === id ? { ...task, category: category } : task
                    ));
                })
                .catch(error => {
                    console.error("Error updating category:", error);
                });
        }
    };



    return (
        <div id="toDoDiv">
            <ul> {tasks.map((task, index) => (
                <React.Fragment key={task.id}>
                    <li className="toDoItem" key={task.id}>
                        <div className="left-panel">
                            <label className="checkbox-container">
                                <input className="custom-checkbox" type="checkbox" checked={task.completed}
                                       onChange={(event) => onCheckedHandler(task.id, task.title, task.description, task.category, event)}/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="toDoItemContent">
                            <div className="toDoText">
                                <strong>{task.title}</strong>
                                <p>{task.description}</p>
                            </div>
                            <div className="selectContainer">
                                <select
                                    className={"selectCategory"}
                                    value={task.category === "FreeTime" ? "Free Time" : task.category}
                                    onChange={(event) => onCategoryChange(task.id, event)}
                                >
                                    {Object.values(Category).map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <div className="select-arrow"></div>
                            </div>
                            <div className="toDoButtons">
                                <button className="smoothButton updateButton"
                                        onClick={() => onUpdateButton(task.id, task.title, task.description, task.completed, task.category)}>Update
                                </button>
                                <button className="smoothButton deleteButton"
                                        onClick={() => onDeleteButton(task.id)}><p>Delete</p>
                                </button>
                            </div>
                        </div>
                    </li>
                    <p className={"spanLine"}></p>
                </React.Fragment>

            ))}
            </ul>
            <div className="createButtonDiv">
                <button className="smoothButton createButton" onClick={() => onCreateButton()}><p>Create</p></button>
            </div>
        </div>
    )
}