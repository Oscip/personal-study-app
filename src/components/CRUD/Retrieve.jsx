import { invoke } from "@tauri-apps/api/core";
import {useEffect, useState} from "react";

export default function Retrieve() {
    const[tasks, setTasks] = useState([]);

    async function retrieve_tasks() {
        try {
            const result = await invoke("get_tasks");
            console.log(result);
            setTasks(result);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const configureTask = (id, title, description, completed) => {
        console.log("onclick activated");
        console.log(id);
        console.log(title);
        console.log(description);
        console.log(completed);
        const array = [title, description];
        const body = document.getElementsByTagName("body")[0];
        const createDiv = document.createElement("div");
        array.forEach((item, index) => {
            const createInputText = document.createElement("input");
            createInputText.type = "text";
            createInputText.value = item;
            createInputText.id = `updateInput${index + 1}`;
            createDiv.appendChild(createInputText);
            console.log(createInputText.id);}
        )
        const createSaveButton = document.createElement("button");
        createSaveButton.textContent = "Save";
        createSaveButton.style.backgroundColor = "blue";
        createSaveButton.id = "saveButton";
        createSaveButton.onclick = () => onSaveButton(id, completed);
        createDiv.appendChild(createSaveButton);
        const createDeleteButton = document.createElement("button");
        createDeleteButton.textContent = "Delete";
        createDeleteButton.style.backgroundColor = "red";
        createDeleteButton.id = "deleteButton";
        createDeleteButton.onclick = () => onDeleteButton(id);
        createDiv.appendChild(createDeleteButton);
        body.appendChild(createDiv);
    }

    useEffect(() => {
        retrieve_tasks();
    }, []);


    async function onSaveButton(id, completed){
        // The whole thing needs to dissapear when done and also it should only allow one edit at a time and it should refresh the actaull tasks and also make only the edit page appear and then when clicked on the side dissapear and then reapear the other sutff so maybe just reload then if possible.

        const title = document.getElementById("updateInput1");
        const description = document.getElementById("updateInput2");
        const saveButton = document.getElementById("saveButton");
        const deleteButton = document.getElementById("deleteButton");
        try {
            const result = await invoke(`update_task(${id}, ${title.value}, ${description.value}, ${completed})`);
            console.log(result);
            title.remove();
            description.remove();
            saveButton.remove();
            deleteButton.remove();
        } catch(error) {
            console.error("Error:", error);
        }
    }

    const onDeleteButton = (id) => {
        //Add the function of invoke rust where the id is given and it deletes it
    }

    const onCheckedHandler = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );

    }


    return(
        <div>
            <ul> {tasks.map((task, index) => (
                <li key={index}>
                    <strong>{task.title}</strong>
                    {task.description}
                    {task.completed ? "Yes" : "No"}
                    <input type="checkbox" checked={task.completed} onChange={() => onCheckedHandler(task.id)}/>
                    <button onClick={() => configureTask(task.id, task.title, task.description, task.completed)}>update</button>
                    <button onClick={() => onDeleteButton(task.id)}>Delete</button>
                </li>
            ))
            }

            </ul>
            <h1>hello</h1>
        </div>
    )
}