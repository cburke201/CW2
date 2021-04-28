
let selectedRow = null

function onFormSubmit() {
    if (validate()) {
        let formData = readFormData();
        if (selectedRow == null) {
            insertNewRecord(formData);
        } else  {
            updateRecord(formData);
        }
        resetForm();
    }
}

function readFormData() {
    let formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["goal"] = document.getElementById("goal").value;
    formData["duration"] = document.getElementById("duration").value;
    formData["date"] = document.getElementById("date").value;
    formData["completed"] = document.getElementById("completed").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("trainingGoal").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.goal;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.duration;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.date;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.completed;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("goal").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("date").value = "";
    document.getElementById("completed".value = "");
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("goal").value = selectedRow.cells[1].innerHTML;
    document.getElementById("duration").value = selectedRow.cells[2].innerHTML;
    document.getElementById("date").value = selectedRow.cells[3].innerHTML;
    document.getElementById("completed").value = selectedRow.cells[4].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.goal;
    selectedRow.cells[2].innerHTML = formData.duration;
    selectedRow.cells[3].innerHTML = formData.date;
    selectedRow.cells[4].innerHTML = formData.completed;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("trainingGoal").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("name").value == "") {
        isValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nameValidationError").classList.contains("hide"))
            document.getElementById("nameValidationError").classList.add("hide");
    }
    return isValid;
}