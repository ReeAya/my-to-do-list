$(document).ready(function () {
  console.log("dom ready");

  let getAndDisplayAllTasks = function () {
    $.ajax({
      type: "GET",
      url: "https://fewd-todolist-api.onrender.com/tasks?api_key=61",
      dataType: "json",
      success: function (response, textStatus) {
        console.log(response);
        $("#todo-list").empty();

        response.tasks.forEach(function (task) {
          $("#todo-list").append(
            '<div class="row d-flex justify-content-between todo-row"><p class="col-xs-8 d-inline-block mb-4">' +
              task.content +
              '</p><label><input type="checkbox" class="mb-4 mark-complete" data-id="' +
              task.id +
              '"' +
              (task.completed ? "checked" : "") +
              ">Completed?</label><button class='btn btn-danger btn-sm rounded w-100 delete' data-id='" +
              task.id +
              "'>Delete</button>"
          );
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  let createTask = function () {
    $.ajax({
      type: "POST",
      url: "https://fewd-todolist-api.onrender.com/tasks?api_key=61",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        task: {
          content: $("#new-task-content").val(),
        },
      }),
      success: function (response, textStatus) {
        $("#new-task-content").val("");
        getAndDisplayAllTasks();
      },
      error: function (response, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };
  let deleteTask = function (id) {
    $.ajax({
      type: "DELETE",
      url: "https://fewd-todolist-api.onrender.com/tasks/" + id + "?api_key=61",
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (response, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  let markTaskComplete = function (id) {
    $.ajax({
      type: "PUT",
      url:
        "https://fewd-todolist-api.onrender.com/tasks/" +
        id +
        "/mark_complete?api_key=61",
      dataType: "json",
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  let markTaskActive = function (id) {
    $.ajax({
      type: "PUT",
      url:
        "https://fewd-todolist-api.onrender.com/tasks/" +
        id +
        "/mark_active?api_key=61",
      dataType: "json",
      success: function (response, textStatus) {
        // console.log(response);
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  $(document).on("change", ".mark-complete", function () {
    if (this.checked) {
      markTaskComplete($(this).data("id"));
    } else {
      markTaskActive($(this).data("id"));
    }
    console.log(this.checked);
  });

  $(document).on("click", ".delete", function () {
    deleteTask($(this).data("id"));
  });

  $("#create-task").on("submit", function (e) {
    e.preventDefault();
    createTask();
  });
  getAndDisplayAllTasks();
});
