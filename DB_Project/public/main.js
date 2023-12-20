const tableButton = document.getElementById('tableBtn')
const tableInputField = document.getElementById('tableInput')
tableButton.addEventListener('click', createTable)
const createColBtn = document.getElementById('createColBtn')
createColBtn.addEventListener('click', createNewColumn)

function createNewColumn(){
    const newInputColumnName = document.createElement("input")
    newInputColumnName.type = "text"
    newInputColumnName.placeholder="Enter the column name..."
    tableInputField.appendChild(newInputColumnName)

    const newInputColumnType = document.createElement('select')
    var option1 = document.createElement('option')
    option1.value = "varchar"
    option1.text = "varchar"
    var option2 = document.createElement('option')
    option2.value = "integer"
    option2.text = "int"
    newInputColumnType.appendChild(option1)
    newInputColumnType.appendChild(option2)
    tableInputField.appendChild(newInputColumnType)
}