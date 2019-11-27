
var count_id = 1;
var task1 = {
    id: count_id++,
    task: "Submit the project",
    date: "31.08.19",
    time: "12:30"
};
var task2 = {
    id: count_id++,
    task: "Give a compliment to the lecturer :-) ",
    date: "01.09.19",
    time: "20:00"
};
var tasks = [
    task1,
    task2
];

if (localStorage.id) {
    var count_id = JSON.parse(localStorage.id)
}



window.onload = function () {

    if (localStorage.my_task) {
        tasks = JSON.parse(localStorage.my_task);
    }
    onLoadTasks()
}

function myTasks(task) {

    let div_col_3_note = document.createElement("div");
    div_col_3_note.classList.add("col-md-3");
    div_col_3_note.addEventListener("mouseover", function () {
    div_col_3_note.appendChild(div_close);
    
    })
    div_col_3_note.addEventListener("mouseleave", function () {
        div_close.remove();
    })
    let div_close = document.createElement("div");
    div_close.classList.add("btn", "btn-info" ,"close_btn");
    div_close.innerHTML = "X";
    div_close.addEventListener("click", function () {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == task.id) {
                tasks.splice(i, 1)
            }
        }

        div_col_3_note.remove();
        onLoadTasks()
    })

  

    let div_card = document.createElement("div");
    div_card.classList.add("card");
    

    let div_card_body = document.createElement("div");
    div_card_body.classList.add("card-body");

    let p_card_text = document.createElement("p");
    p_card_text.classList.add("card-text", "p-3");

    p_card_text.innerHTML = `ID: ${task.id} <br>`
    p_card_text.innerHTML += `Task: ${task.task}`

    let h5_card_title = document.createElement("h5");
    h5_card_title.classList.add("card-title");
    h5_card_title.innerHTML = `Date: ${task.date} <br>`;
    h5_card_title.innerHTML += `Time: ${task.time} <br>`;

   
    div_col_3_note.appendChild(div_card);

    div_card.appendChild(div_card_body);
    

    div_card_body.appendChild(p_card_text);
    div_card_body.appendChild(h5_card_title);
    return div_col_3_note;
}

function onLoadTasks() {

    localStorage.my_task = JSON.stringify(tasks);
    localStorage.id = JSON.stringify(count_id);
    document.querySelector(".note").innerHTML = ""

    for (let i = 0; i < tasks.length; i++) {
        let my_task = myTasks(tasks[i]);
        document.querySelector(".note").appendChild(my_task);
    }

}

function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
}

function requiredTask() {
    if (
        document.querySelector(".task_date").value == "" ||
        document.querySelector(".task_time").value == "" ||
        document.querySelector(".my_textarea").value == ""

    ) {
        alert("Please enter details of the Task");
        return;
    }
    addTask()
}

function addTask() {

    var d = new Date()
    var get_time = d.getTime();

    var date_of_task = document.querySelector(".task_date").value;
    var num_date_of_task = Date.parse(date_of_task);

    var time_of_task = document.querySelector(".task_time").value;
    var num_time_of_task = timeStringToFloat(time_of_task);
    var num_time_of_task_fit = (num_time_of_task * 60 * 60 * 1000) - (3 * 60 * 60 * 1000);

    var sum_num_date_time = num_date_of_task + num_time_of_task_fit


    if (get_time > sum_num_date_time) {
        alert("Please enter a future date");
    }
    else {
        var new_task = {
            id: count_id++,
            task: document.querySelector(".my_textarea").value,
            date: document.querySelector(".task_date").value,
            time: document.querySelector(".task_time").value,
        }
        tasks.push(new_task);
        onLoadTasks();
        clearTheDetails();
    }

}

function clearTheDetails() {
    document.querySelector(".my_textarea").value = "";
    document.querySelector(".task_date").value = "";
    document.querySelector(".task_time").value = "";
}

function resetBoard() {
    localStorage.clear();
    location.reload();
}

