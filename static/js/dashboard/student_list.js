function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const CSRF_TOKEN = getCookie("csrftoken");

// Submit new student
document
  .getElementById("add-student-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch("/add_student/", {
      method: "POST",
      headers: { "X-CSRFToken": CSRF_TOKEN },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          showAlert(data.error, "danger");
        } else {
          location.reload();
          showAlert(data.message, "success");
        }
      })
      .catch((err) => console.log(err));
  });

// Update student
function updateStudent(id) {
  const row = document.querySelector(`#student-${id}`);
  const name = row.children[0].textContent.trim();
  const subject = row.children[1].textContent.trim();
  const marks = row.children[2].textContent.trim();

  document.getElementById("edit-student-id").value = id;
  document.getElementById("edit-name").value = name;
  document.getElementById("edit-subject").value = subject;
  document.getElementById("edit-marks").value = marks;

  $("#editStudentModal").modal("show");
}

// Submit updated student
document
  .getElementById("edit-student-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("edit-student-id").value;
    const name = document.getElementById("edit-name").value;
    const subject = document.getElementById("edit-subject").value;
    const marks = parseInt(document.getElementById("edit-marks").value);

    fetch(`/update_student/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": CSRF_TOKEN,
      },
      body: JSON.stringify({ name, subject, marks }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          showAlert(data.error, "danger");
        } else {
          location.reload();
          showAlert(data.message, "success");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// Delete student
let deleteStudentId = null;

function deleteStudent(id) {
  deleteStudentId = id;
  $("#deleteStudentModal").modal("show");
}

document
  .getElementById("confirm-delete-btn")
  ?.addEventListener("click", function () {
    if (!deleteStudentId) return;

    fetch(`/delete_student/${deleteStudentId}/`, {
      method: "DELETE",
      headers: { "X-CSRFToken": CSRF_TOKEN },
    })
      .then((res) => res.json())
      .then((data) => {
        $("#deleteStudentModal").modal("hide");
        location.reload();
      })
      .catch((error) => console.error("Delete failed:", error));
  });
