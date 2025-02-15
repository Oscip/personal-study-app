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

    const createModal = (title, description, completed) => {
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
            createInputText.id = `createInputText${index + 1}`;
            const createLabel = document.createElement("label");
            createLabel.textContent = `${item}`;
            createLabel.htmlFor = `${item}`;
            createInputText.name = `${item}`;
            formDiv.appendChild(createInputText);
            formDiv.appendChild(createLabel);
            createModalUI.appendChild(formDiv);
        });
        const createInputCheckbox = document.createElement("input");
        createInputCheckbox.type = "checkbox";
        createInputCheckbox.onchange = onCheckedHandler; //Check the logic for this
        const createTaskCreaterButton = document.createElement("button");
        createTaskCreaterButton.textContent = "Create";
        createModalUI.appendChild(createInputCheckbox);
        createModalUI.appendChild(createTaskCreaterButton);
        const title = document.getElementById("createInputText1");
        const description = document.getElementById("createInputText2");
        let completed = 0;
        if (createInputCheckbox.checked === true) {
            completed = 1;
        }
        createTaskCreaterButton.onclick = () => createModal(title.value, description.value, completed);
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
                const createLabel = document.createElement("label");
                createLabel.textContent = `${item}`;
                createLabel.htmlFor = `${item}`;
                createModalUI.appendChild(createLabel);
                const createInputText = document.createElement("input");
                createInputText.type = "text";
                createInputText.value = item;
                createInputText.id = `updateInput${index + 1}`;
                createInputText.name = `${item}`;
                createModalUI.appendChild(createInputText);
                console.log(createInputText.id);
            }
        )
        const createSaveButton = document.createElement("button");
        createSaveButton.textContent = "Save";
        createSaveButton.style.backgroundColor = "blue";
        createSaveButton.id = "saveButton";
        createSaveButton.onclick = () => updateModal(id, completed);
        createModalUI.appendChild(createSaveButton);
        const createDeleteButton = document.createElement("button");
        createDeleteButton.textContent = "Delete";
        createDeleteButton.style.backgroundColor = "red";
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


    return (
        <div id="toDoDiv">
            <button onClick={() => onCreateButton()}>Create</button>
            <ul> {tasks.map((task, index) => (
                <li className="toDoItem" /*Style needs to still be adjusted */ key={index}>
                    <strong>{task.title}</strong>
                    {task.description}
                    <input type="checkbox" checked={task.completed} onChange={() => onCheckedHandler(task.id)}/>
                    <button
                        onClick={() => onUpdateButton(task.id, task.title, task.description, task.completed)}>Update
                    </button>
                    <button onClick={() => onDeleteButton(task.id)}>Delete</button>
                </li>
            ))
            }

            </ul>
            <h1>hello</h1>
        </div>
    )
}