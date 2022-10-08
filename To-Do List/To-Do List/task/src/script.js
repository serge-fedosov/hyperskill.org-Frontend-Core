document.getElementById("send-form").addEventListener("submit", function(event){
    event.preventDefault();

    let inputTask = document.getElementById("input-task");
    let taskList =  document.getElementById("task-list");

    let max = 0;
    let elements = document.querySelectorAll(".element");
    for (let i = 0; i < elements.length; i++) {
        let m = Number (elements[i].id.substring(8));
        if (max < m) {
            max = m;
        }
    }

    let n = max + 1;
    let text = `        <li id="element-${n}" class="element">
            <input type="checkbox">
            <span class="task">${inputTask.value}</span>
            <button class="delete-btn" onclick="deleteItem(${n})"><img src="images/button.png" alt="Button image" width="36"></button>
        </li>
`;

    taskList.innerHTML = taskList.innerHTML + text;
    inputTask.value = "";
});

function deleteItem(i) {
    let element = document.getElementById("element-" + i);
    element.remove();
}
