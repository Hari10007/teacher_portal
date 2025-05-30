function showAlert(message, type = "success", timeout = 3000) {
  const modalLabel = document.getElementById("messageModalLabel");
  const modalBody = document.getElementById("messageModalBody");

  modalBody.textContent = message;

  if (type === "success") {
    modalLabel.textContent = "Success";
    modalLabel.classList.remove("text-danger");
    modalLabel.classList.add("text-success");
  } else if (type === "danger") {
    modalLabel.textContent = "Error";
    modalLabel.classList.remove("text-success");
    modalLabel.classList.add("text-danger");
  } else {
    modalLabel.textContent = "Message";
    modalLabel.classList.remove("text-success", "text-danger");
  }

  const modalElement = document.getElementById("messageModal");
  const messageModal = new bootstrap.Modal(modalElement);
  messageModal.show();

  setTimeout(() => {
    messageModal.hide();
  }, timeout);
}
