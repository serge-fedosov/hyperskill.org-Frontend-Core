document.getElementById("send-form").addEventListener("submit", function(event){
    event.preventDefault();

    let inputTask = document.getElementById("input-task");
    let taskList =  document.getElementById("task-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let n = tasks.length;
    tasks[n] = {
        checked: false,
        task: inputTask.value
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));

    let text = `        <li id="element-${n}" class="element">
            <input type="checkbox">
            <span class="task">${inputTask.value}</span>
            <button class="delete-btn" onclick="deleteItem(${n})"><img src="images/button.png" alt="Button image" width="36"></button>
        </li>
`;

    taskList.innerHTML = taskList.innerHTML + text;
    inputTask.value = "";
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
for (let i = 0; i < tasks.length; i++) {

    let taskList =  document.getElementById("task-list");

    let n = i;
    let checked = tasks[i].checked ? " checked" : "";
    let task = tasks[i].task;

    let text = `        <li id="element-${n}" class="element">
            <input type="checkbox"${checked}>
            <span class="task">${task}</span>
            <button class="delete-btn" onclick="deleteItem(${n})"><img src="images/button.png" alt="Button image" width="36"></button>
        </li>
`;

    taskList.innerHTML = taskList.innerHTML + text;
}

function deleteItem(i) {
    let element = document.getElementById("element-" + i);
    element.remove();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    delete tasks[i];
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
