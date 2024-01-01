const passwordResetForm = document.getElementById('passwordResetForm')
passwordResetForm.addEventListener('submit', resetPassword)
const newPassword = document.getElementById('newPassword')
const confirmPassword = document.getElementById('confirmPassword')
const email = document.getElementById('email')
const container = document.getElementById('main')

async function resetPassword(e){
    e.preventDefault()
    if(newPassword.value === confirmPassword.value){
        const data = {
            email: email.value,
            newPassword: newPassword.value
        }
        const response = await axios.post('http://localhost:3000/password/resetPassword', data)
        if(response.data.success){
            container.innerHTML = `<h2>Password Changed Succesfully!</h2>
                                    Login here:
                                    <a href = "/login"><button class="btn btn-md btn-success">Login Now</button></a>`
        }
    }else{
        alert('password missmatch!')
    }
}