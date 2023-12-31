const myForm = document.getElementById('addForm')
const expList = document.getElementById('expense-list')
const premiumDiv = document.getElementById('premiumDiv')
const premiumBtn = document.getElementById('premiumBtn')
const leaderBorad = document.getElementById('leaderBoard')

myForm.addEventListener('submit', addExpense)
expList.addEventListener('click', addOrDeleteExpense)
document.addEventListener('DOMContentLoaded', domLoad)
premiumBtn.addEventListener('click', activateSubscription)

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function domLoad(){
    leaderBorad.style.display = 'none'
    let total = 0
    const token = localStorage.getItem('token')

    // const userStatus = await axios.get(`/user/getStatus`, {headers: {'Authorization': token}})
    if(parseJwt(token).isPremiumUser){
        premiumBtn.style.display = 'none'
        premiumDiv.innerHTML = `<h2 style="color: gold;">You Are a premium user!</h2>
                                <button class="btn btn-dark" style="color: gold;" onclick = "showLeaderboard()">Leaderboad</button>`
    }

    console.log(token)
    axios.get('/expense/get-expenses', {headers: {'Authorization': token}})
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
                newExpense.innerHTML=`${expense.title}::<b style="color: red;">${expense.amount}</b>::${expense.category}`

                //Creating a delete button for each expense items

                let delBtn=document.createElement('button')
                delBtn.innerText="Delete"
                delBtn.className="btn btn-danger btn-sm float-right delete"
                delBtn.id = expense.id

                //Creating an edit button for each expense items

                let edBtn=document.createElement('button')
                edBtn.innerText="Edit"
                edBtn.className="btn btn-success btn-sm float-right edit"
                edBtn.id = expense.id
            
                //appending buttons to the newly created expense item and adding whole item with buttons to the list

                newExpense.appendChild(delBtn)
                newExpense.appendChild(edBtn)
                expList.appendChild(newExpense)
                myForm.reset()
        })
        expList.innerHTML += `<h2>Total Expense: <b style="color: red;">${total}</b></h2>`
    })
    .catch(err => {
        console.log(err)
    })
}

function addExpense(e){
    e.preventDefault()
    const token = localStorage.getItem('token')
    const data ={
        expenseAmount: document.getElementById('expense').value,
        expenseTitle: document.getElementById('desc').value,
        expenseCategory: document.getElementById('category').value
    }

    if(document.getElementById('expense-btn').value === 'Add expense'){
        axios.post('/expense/add-expense', data, {headers: {'Authorization': token}})
        .then(response => {
            domLoad();
        })
        .catch(err => {
            console.log(err.message)
            domLoad();
        })
    }else{
        data['expId'] = localStorage.getItem('itemToEdit')
        axios.put(`/expense/edit-expense`, data, {headers: {'Authorization': token}})
        .then(response => {
            console.log(response.data)
            domLoad();
        })
        .catch(err => {
            console.log(err)
        })
    }
    
}

async function addOrDeleteExpense(e){

    try{
        const token = localStorage.getItem('token')
        e.preventDefault()
        const expId = e.target.id
        if(e.target.classList.contains('delete')){
            console.log(expId)
            await axios.delete(`/expense/delete-expense/${expId}`, {headers: {'Authorization': token}})
            domLoad()
        }else if(e.target.classList.contains('edit')){
            const editItem = await axios.get(`/expense/get-expense/${expId}`, {headers: {'Authorization': token}})
            
            document.getElementById('expense').value = editItem.data.expense.amount
            document.getElementById('desc').value = editItem.data.expense.title
            document.getElementById('category').value = editItem.data.expense.category
            document.getElementById('expense-btn').value = "Edit Expense"
            localStorage.setItem('itemToEdit', expId)
                        
            e.target.parentElement.remove()
        }
    }catch(err){
        console.log(err)
    }
    
}

async function activateSubscription(e){
    try{
        e.preventDefault()
        const token = localStorage.getItem('token')
        // console.log(token)
        const response = await axios.get('/purchase/premiumMembership', {headers: {'Authorization': token}})
        // console.log(response)
        var options = {
            "key": response.data.key_id,
            "order_id": response.data.order.id,
            "handler": async function(response){
                try{
                    const subscription = await axios.post('/purchase/updateTransactionStatus', {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id
                    }, {headers: {'Authorization': token}})
                    localStorage.setItem('token', subscription.data.token)
                    alert('You are a premium user now!')
                    domLoad()
                }catch(err){
                    console.log(err)
                }
            }
        }

        const rzp = new Razorpay(options)
        rzp.open()

        rzp.on('payment.failed', async function(response){
            try{
                await axios.post('/purchase/updateFailedTransactionStatus', {
                    order_id: options.order_id,
                    payment_id: 'failed'
                }, {headers: {'Authorization': token}})
                alert('Payment failed!')
            }catch(err){
                console.log(err)
            }
        })
    }catch(err){
        console.log(err)
    }
    
}

async function showLeaderboard(){
    try{
        const token = localStorage.getItem('token')
        const response = await axios.get('/premium/showLeaderBoard', {headers: {'Authorization': token}})
        const users = response.data.users
        console.log(users)
        leaderBorad.style.display = 'block'
        const tableBody = document.querySelector('#leaderboardTable tbody');
        tableBody.innerHTML = ''
        users.forEach(user => {
            // Create a new row
            const row = document.createElement('tr');

            // Create cells for each user property
            const nameCell = document.createElement('td');
            nameCell.textContent = user.name;

            const totalSpendingCell = document.createElement('td');
            totalSpendingCell.textContent = user.totalSpending;
            totalSpendingCell.style.color = 'green'

            // Append cells to the row
            row.appendChild(nameCell);
            row.appendChild(totalSpendingCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        })
    }catch(err){
        console.log(err)
    }
}


