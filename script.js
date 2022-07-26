"use strict";

const addTodoBtn = document.querySelector("#add-new-todo-btn");
const newTodoInput = document.querySelector("#new-todo-input");
const ulTodoList = document.querySelector("#todo-list");
const checkAllTodos = document.querySelector("#check-all-todos");
const clear = document.querySelector(".clear");
const alert = document.querySelector("#alert");

function addTodo() {
  let inputValue = newTodoInput.value;
  inputValue = inputValue.trim();

  // Alert message
  function alertMessageDisplay(message) {
    alert.innerText = message;
    alert.style.display = "block";
    setTimeout(() => {
      alert.innerText = "";
      alert.style.display = "none";
    }, 3000);
  }

  if (inputValue === "") {
    alertMessageDisplay("Please Enter Your Todo");
    return;
  } else {
    let itemExists = false;
    const allTodoTexts = document.querySelectorAll(".single-todo-text");
    allTodoTexts.forEach((todoText) => {
      if (todoText.value === inputValue) {
        itemExists = true;
        alertMessageDisplay("It already exists");
        newTodoInput.value = "";
        newTodoInput.focus();
      }
    });

    if (!itemExists) {
      alert.innerText = "";
      const listItem = document.createElement("li");
      listItem.classList.add("single-todo");

      // Create checkbox
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("class", "single-todo-check");
      checkbox.addEventListener("click", (e) => {
        const checkedState = e.target.checked;
        checkbox.nextElementSibling.classList.toggle("completed");
      });

      //todo input
      const todoText = document.createElement("input");
      todoText.setAttribute("class", "single-todo-text");
      todoText.setAttribute("readonly", "readonly");
      todoText.value = inputValue;

      //Edit button
      const editBtn = document.createElement("button");
      editBtn.classList.add("edit");

      // Edit icon
      const editIcon = document.createElement("i");
      editIcon.setAttribute("class", "edit bi bi-pencil-square");
      editBtn.appendChild(editIcon);

      // Save or update icon
      const saveIcon = document.createElement("i");
      saveIcon.setAttribute("class", "bi bi-arrow-clockwise");
      let editState = true;
      editBtn.addEventListener("click", function () {
        if (editState) {
          todoText.focus();
          todoText.removeAttribute("readonly", "readonly");
          editBtn.firstElementChild.remove();
          editBtn.appendChild(saveIcon);
          saveIcon.style.color = "black";
          saveIcon.style.fontWeight = "900";
          editState = false;
          console.log(editState);
        } else {
          if (todoText.value === "") {
            alertMessageDisplay("Please Enter New Todo to Update");
            return;
          } else {
            editBtn.firstElementChild.remove();
            editBtn.appendChild(editIcon);
            todoText.setAttribute("readonly", "readonly");
            editState = true;
          }
        }
      });

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("class", "delete");

      // Delete icon
      const deleteIcon = document.createElement("i");
      deleteIcon.setAttribute("class", "bi bi-trash3-fill");
      deleteBtn.appendChild(deleteIcon);

      deleteBtn.addEventListener("click", () => {
        deleteBtn.parentElement.remove();
      });

      listItem.append(checkbox, todoText, editBtn, deleteBtn);
      ulTodoList.append(listItem);

      newTodoInput.value = "";
      newTodoInput.focus();
    }
  }
}

// Clear the whole list
const clearBtn = document.createElement("button");
clearBtn.innerText = "Clear All";
clearBtn.classList.add("btn-clear");

clearBtn.addEventListener("click", function (e) {
  e.target.parentElement.previousElementSibling.replaceChildren();
});
clear.appendChild(clearBtn);

//Check all todos
checkAllTodos.addEventListener("click", function (e) {
  const allCheckboxes = document.querySelectorAll(".single-todo-check");
  allCheckboxes.forEach((checkbox) => {
    if (checkbox.checked === false) {
      checkbox.checked = true;
      checkbox.nextElementSibling.classList.toggle("completed");
    } else {
      checkbox.checked = false;
      checkbox.nextElementSibling.classList.toggle("completed");
    }
  });
});

addTodoBtn.addEventListener("click", addTodo);
