// On Enter task it added
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

window.onload = function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskUlList = document.querySelector("#task-ul-list");

  tasks.forEach((task) => {
    createTaskElement(taskUlList, task);
  });
};

function addTask() {
  const textInput = document.querySelector("#text-input");
  const dateInput = document.querySelector("#date-input");
  const timeInput = document.querySelector("#time-input");
  const taskUlList = document.querySelector("#task-ul-list");

  if (textInput.value.trim() !== "") {
    const task = {
      text: textInput.value,
      date: dateInput.value,
      time: timeInput.value,
    };

    createTaskElement(taskUlList, task);

    // Save task in local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear input fields
    textInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
  } else {
    alert("You cannot add an empty task.");
  }
}

function createTaskElement(taskUlList, task) {
  // Dynamically creating elements based on user input
  const taskList = document.createElement("li");
  const taskInfo = document.createElement("div");
  const taskInput = document.createElement("p");
  const taskDate = document.createElement("p");
  const taskTime = document.createElement("p");
  const buttonContainer = document.createElement("div");
  const doneButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  // Inserting elements for structure
  taskUlList.appendChild(taskList);
  taskList.appendChild(taskInfo);
  taskInfo.appendChild(taskInput);
  taskInfo.appendChild(taskDate);
  taskInfo.appendChild(taskTime);
  taskList.appendChild(buttonContainer);
  buttonContainer.appendChild(doneButton);
  buttonContainer.appendChild(deleteButton);

  // Setting content and attributes
  taskInput.textContent = task.text;
  taskDate.textContent = task.date;
  taskTime.textContent = task.time;
  doneButton.textContent = "Done";
  deleteButton.textContent = "Delete";

  // Adding classes for styling
  taskList.className = "task-list";
  taskInfo.className = "task-info";
  buttonContainer.className = "button-container";
  doneButton.className = "done-button";
  deleteButton.classList = "delete-button";

  // Event listeners for buttons
  doneButton.addEventListener("click", () => {
    taskInfo.classList.toggle("task-complete");
  });
  deleteButton.addEventListener("click", () => {
    taskUlList.removeChild(taskList); // shown in UI
    removeFromLocalStorage(task);
  });
}

function removeFromLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.text !== task.text); // what is clicking the complememt of that will be again set to the local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
