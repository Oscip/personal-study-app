import {invoke} from "@tauri-apps/api/core";
import {useEffect, useState} from "react";

export default function ToDo() {
    const [tasks, setTasks] = useState([]);

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

    async function create_task(title, description, completed) {
        try {
            await invoke("create_task",
                {
                    title: title,
                    description: description,
                    completed: completed,
                });
        } catch (error) {
            console.error("Error: ", Error);
        }
    }

    async function update_task(id, title, description, completed){
        try {
            await invoke("update_task", {
                id: id,
                title: title,
                description: description,
                completed: completed
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Create Function for delete for better clarity

    async function delete_task(id) {
        try {
            await invoke("delete_task", {
                id: id,
            });
        } catch(error) {
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

    const createModal = (title, description) => {
        const completeButton = document.getElementById("completeButton");
        let completed = 0;
        if (completeButton.textContent === "Completed") {
            completed = 1;
            console.log("it worked");
        }
        else if (completeButton.textContent === "Uncompleted") {
            completed = 0;
        }
        create_task(title, description, completed);
        closeModal();
        retrieve_tasks();
    }

    const onCreateButton = () => {
        modal();
        const array = ["Title", "Description"];
        const createModalUI = document.getElementById("createModalUI");

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
        const completeButton = document.createElement("button");
        completeButton.id = "completeButton";
        completeButton.className = "smoothButton";
        completeButton.textContent = "Uncompleted";
        completeButton.onclick = () => onClickCompleteButton();
        const createTaskCreaterButton = document.createElement("button");
        createTaskCreaterButton.className = "smoothButton";
        createTaskCreaterButton.textContent = "Create";
        createTaskCreaterButton.id = "createButton";
        createModalUI.appendChild(completeButton);
        createModalUI.appendChild(createTaskCreaterButton);
        const title = document.getElementById("createInputText1");
        const description = document.getElementById("createInputText2");
        createTaskCreaterButton.onclick = () => createModal(title.value, description.value);
    }

    const updateModal = (id, completed) => {
        const titleInput = document.getElementById("updateInput1");
        const descriptionInput = document.getElementById("updateInput2");
        update_task(id, titleInput.value, descriptionInput.value, completed);
        closeModal();
        retrieve_tasks();
    }

    const onUpdateButton = (id, title, description, completed) => {
        modal();
        const array = [title, description];
        const createModalUI = document.getElementById("createModalUI");
        array.forEach((item, index) => {
                const formDiv = document.createElement("div");
                formDiv.className = "formDiv";
                const createLabel = document.createElement("label");
                createLabel.textContent = `${item}`;
                createLabel.htmlFor = `${item}`;
                const createInputText = document.createElement("input");
                createInputText.type = "text";
                createInputText.value = item;
                createInputText.id = `updateInput${index + 1}`;
                createInputText.name = `${item}`;
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
        createSaveButton.onclick = () => updateModal(id, completed);
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
    }

    const onCheckedHandler = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? {...task, completed: !task.completed} : task
            )
        );
    }

    const onClickCompleteButton = () => {
        const completeButton = document.getElementById("completeButton");
        if (completeButton.textContent === "Uncompleted") {
            completeButton.textContent = "Completed";
        } else {
            completeButton.textContent = "Uncompleted";
        }
    }


    return (
        <div id="toDoDiv">
            <button  className="smoothButton createButton" onClick={() => onCreateButton()}>Create</button>
            <ul> {tasks.map((task, index) => (
                <li className="toDoItem" /*Style needs to still be adjusted */ key={index}>
                    <strong>{task.title}</strong>
                    {task.description}
                    <input type="checkbox" checked={task.completed} onChange={() => onCheckedHandler(task.id)}/>
                    <button className="smoothButton updateButton"onClick={() => onUpdateButton(task.id, task.title, task.description, task.completed)}>Update
                    </button>
                    <button className="smoothButton deleteButton" onClick={() => onDeleteButton(task.id)}>Delete</button>
                </li>
            ))
            }

            </ul>
            <h1>hello</h1>
        </div>
    )
}