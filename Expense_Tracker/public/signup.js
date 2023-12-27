const signUpForm = document.getElementById('signupForm')
signUpForm.addEventListener('submit', signUp)

async function signUp(e){
    try{
        e.preventDefault()
        const signUpDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        const response = await axios.post('/user/signup', signUpDetails)
        if(response.status === 201){
            window.location.href = 'login'
        }else{
            throw new Error('failed to login!')
        }
        console.log(signUpDetails)
    }catch(err){
        document.body.innerHTML += `<div style="color: red">Account creation could not be completed!</div>`
    }
    
}