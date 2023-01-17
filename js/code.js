let row = 1;

let table = document.getElementById("tableData");
let itemList = document.getElementById("items");
let itemsList = []

// Collect form information
todoNameItem = document.getElementById("todoName").value;
todoDueDate = document.getElementById("pikeDueDate").value;

// Date Measurement
let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let createdDate = year + "-" + month + "-" + day;

// Status cell value
let urgent = 1;
let comingUp = 3;

let days = 1000 * 60 * 60 * 24;
let oneDayLeft = days * urgent;
let threeDaysLeft = days * comingUp;
let currentDate = Date.now();

function urgencyTester(createDate, dueDate) {
  dateCurrent = new Date();
  dateDue = new Date(dueDate);
  milliDiff = dateDue.getTime() - dateCurrent.getTime();
  return milliDiff / (1000 * 60 * 60 * 24)
}


// Always pull from localstorage first
setUptable()

let todoEntry = document.getElementById("mySubmitButton");
todoEntry.addEventListener("click", addItem);

/*=======================================================
  Add to list
=======================================================*/
function addItem(e) {
  e.preventDefault();
  todoNameItem = document.getElementById("todoName").value;
  todoDueDate = document.getElementById("pikeDueDate").value;

  // Add to list validation
  // ----------------------------------------------------
  if (!todoNameItem) {
    alert("Please Enter To Do Info");
    return;
  } else if (!todoDueDate) {
    alert("Please select date");
    return;
  }

  createRowAndCell()
  location.reload();
  // setUptable()
  itemsList.push({ itemName, createdDate, dueDate, statusActivity, actions });
  addToStorage(itemsList);

  // Clear forms
  // ----------------------------------------------------
  document.getElementById("todoName").value = "";
  document.getElementById("pikeDueDate").value = "";
}

/*=======================================================
  Local Storage
========================================================*/
function addToStorage(itemArray) {
  localStorage.setItem("storageItemsList", JSON.stringify(itemArray));
}

function retrieveFromStorage() {
  return localStorage.getItem("storageItemsList");
}

// My cell and row
function createRowAndCell() {
  tableData = document.getElementById("tableData");
  newRow = tableData.insertRow(row);

  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);
  let cell4 = newRow.insertCell(3);
  let cell5 = newRow.insertCell(4);

  itemName = cell1.innerHTML = todoNameItem;
  dateCreated = cell2.innerHTML = createdDate;
  dueDate = cell3.innerHTML = todoDueDate;

  // Check for number of days left - status
  if (urgencyTester(cell4.innerHTML, dueDate) < 2) {
    statusActivity = cell4.innerHTML = "<div id='urgent'>Urgent</div>";
  } else if (urgencyTester(cell4.innerHTML, dueDate) <= 3) {
    statusActivity = cell4.innerHTML = "<div id='comingup'>Coming Up</div>";
  } else {
    statusActivity = cell4.innerHTML = "<div id='relax'>Relax</div>";
  }
  // Action colom
  actions = cell5.innerHTML = "<button id='editContent'; >Edit</button><button id='deleteMe'; >Delete</button>";
}

function setUptable() {
  // retrieve the Data from local storage
  if (localStorage.getItem('storageItemsList')) {
    itemsList = JSON.parse(localStorage.getItem('storageItemsList'));
  }

  if (localStorage.getItem('storageItemsList')) {
    itemsList.forEach(function (elem) {
      tableData = document.getElementById("tableData");
      newRow = tableData.insertRow(-1);

      let cell1 = newRow.insertCell(0);
      let cell2 = newRow.insertCell(1);
      let cell3 = newRow.insertCell(2);
      let cell4 = newRow.insertCell(3);
      let cell5 = newRow.insertCell(4);

      itemName = cell1.innerHTML = elem.itemName;
      dateCreated = cell2.innerHTML = elem.createdDate;
      dueDate = cell3.innerHTML = elem.dueDate;

      // Check for number of days left - status
      if (urgencyTester(cell4.innerHTML, elem.dueDate) < 2) {
        statusActivity = cell4.innerHTML = "<div id='urgent'>Urgent</div>";
      } else if (urgencyTester(cell4.innerHTML, elem.dueDate) <= 3) {
        statusActivity = cell4.innerHTML = "<div id='comingup'>Coming Up</div>";
      } else {
        statusActivity = cell4.innerHTML = "<div id='relax'>Relax</div>";
      }
      // Action colom
      actions = cell5.innerHTML = "<button id='editContent'; >Edit</button><button id='deleteMe'; class='button'; >Delete</button>";

    })
  }
}


// Variable for deleting and editing //
let buttons = document.querySelectorAll('button');
/*=============================================================
  Edit Item Button
===============================================================*/

Array.prototype.forEach.call(buttons, function (button) {
  button.addEventListener("click", function () {
    if (button.textContent == "Edit") {


      let editList = button.parentNode.parentNode;

      editList.addEventListener("click", function () {
        console.log(editList)

        let itemEdit = document.querySelector('#item-edit')
        let datepickerEdit = document.querySelector('#datepicker-edit')
        itemEdit.value = elem.name
        datepickerEdit.value = elem.dueDate
      })
      // let addList = document.querySelectorAll('#editContent')
      // for (let i = 0; i < addList.length; i++) {
      //   addList[i].addEventListener('click', function () {
      //     console.log(addList[i]);
      //   });
      // }
    }
  })
})


/*=============================================================
  Delete Item Button
===============================================================*/

let tableRow = document.querySelectorAll("tr")

Array.prototype.forEach.call(buttons, function (button) {
  button.addEventListener("click", function () {
    if (button.textContent == "Delete") {
      let row = button.parentNode.parentNode

      if (confirm(`===============================
Click OK to DELETE!  ||  CANCEL to cancel action 
===============================
      `)) {  
       row.parentNode.removeChild(button.parentNode.parentNode);        
      } else {

      }
    }
  })
})
