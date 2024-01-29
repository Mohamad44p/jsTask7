document.addEventListener("DOMContentLoaded", function() {
  loadTasks();
});

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value.trim();

  if (taskText !== "") {
      var listItem = document.createElement("li");
      listItem.innerText = taskText;

      var removeButton = document.createElement("button");
      removeButton.innerHTML = '<span class="box">delete!</span>';
      removeButton.onclick = function() {
          listItem.remove();
          saveTasks();
      };
      listItem.appendChild(removeButton);

      var tasksList = document.getElementById("tasks");
      tasksList.appendChild(listItem);

      taskInput.value = "";

      saveTasks();
  }
}

function saveTasks() {
  var tasks = Array.from(document.getElementById("tasks").children);

  var tasksText = tasks.map(function(task) {
      return task.innerText.replace("delete!", "").trim();
  });

  localStorage.setItem("tasks", JSON.stringify(tasksText));
}

function loadTasks() {
  var tasksText = localStorage.getItem("tasks");

  if (tasksText) {
      var tasksArray = JSON.parse(tasksText);

      tasksArray.forEach(function(taskText) {
          var listItem = document.createElement("li");
          listItem.innerText = taskText;

          var removeButton = document.createElement("button");
          removeButton.innerHTML = '<span class="box">delete!</span>';
          removeButton.onclick = function() {
              listItem.remove();
              saveTasks();
          };
          listItem.appendChild(removeButton);

          var tasksList = document.getElementById("tasks");
          tasksList.appendChild(listItem);
      });
  }
}
