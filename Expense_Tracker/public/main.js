const myForm=document.getElementById('addForm')
const expList=document.getElementById('expense-list')
myForm.addEventListener('submit', addExpense)

document.addEventListener('DOMContentLoaded', domLoad)

function domLoad(){
    let total = 0
    axios.get('/expense/get-expenses')
        .then(response => {
            const data = response.data
            const expenses = data.expenses
            document.getElementById('expense-btn').value = "Add expense"
            //clear existing list
            expList.innerHTML = ''

            expenses.forEach(expense => {
                total += expense.amount
                let newExpense=document.createElement('li')
                newExpense.className="list-group-item"
                newExpense.innerHTML=`${expense.title}::${expense.amount}::${expense.category}`
                let delBtn=document.createElement('button')
                delBtn.innerText="Delete"
                delBtn.className="btn btn-danger btn-sm float-right delete"
                delBtn.addEventListener('click',removeExpense)

                function removeExpense(event){
                    const expId = expense.id

                    axios.delete(`/expense/delete-expense/${expId}`)
                        .then(result => {
                            domLoad()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }

                let edBtn=document.createElement('button')
                edBtn.innerText="Edit"
                edBtn.className="btn btn-success btn-sm float-right"
                edBtn.addEventListener('click',editExpense)

                function editExpense(event){
                    const expId = expense.id

                    document.getElementById('expense').value = expense.amount
                    document.getElementById('desc').value = expense.title
                    document.getElementById('expense-btn').value = "Edit Expense"
                    
                    axios.get(`/expense/edit-expenses/${expId}`)
                        .then(response => {
                          expList.removeChild(newExpense)
                        })
                        .catch(err => {
                            console.log(err)
                        })
            }

            newExpense.appendChild(delBtn)
            newExpense.appendChild(edBtn)
            expList.appendChild(newExpense)
            myForm.reset()
        })
        expList.innerHTML += `<h2><b>Total Expense:<b> ${total}</h2>`
    })
    .catch(err => {
        console.log(err)
    })
}

function addExpense(e){
    e.preventDefault()

    const data ={
        userId: localStorage.getItem('userId'),
        expenseAmount: document.getElementById('expense').value,
        expenseTitle: document.getElementById('desc').value,
        expenseCategory: document.getElementById('category').value
    }

    axios.post('/expense/add-expense', data)
        .then(response => {
            console.log(response)
            domLoad();
        })
        .catch(err => {
            console.log(err)
        })
    
}

