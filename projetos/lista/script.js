let input = document.getElementById ("taskInput");
let button = document.getElementById ("addTaskBtn");
let list = document.getElementById ("taskList");

button.addEventListener("click", () => {
    if(input.value == ""){
        alert("Digite sua tarefa!")
    } else {
        let li = document.createElement("li");
        li.innerHTML = input.value;
        list.appendChild(li)
        let button = document.createElement("button");
        button.innerHTML = "x";
        li.appendChild(button)

        button.addEventListener("click", () => {
            li.remove();
        } )
    }
});