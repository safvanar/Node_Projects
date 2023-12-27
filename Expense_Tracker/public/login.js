const loginForm = document.getElementById('loginForm')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')

loginForm.addEventListener('submit', loginCheck)

async function loginCheck(e){
    try{
        e.preventDefault()
        const data = {
            email: emailInput.value,
            password: passwordInput.value
        }
        const login = await axios.post('/user/login', data)
        if(login.data.login === 'success'){
            window.location = '/home'
        }else{
            throw new Error('Authentication failed!')        
        }
    }catch(err){
        window.alert('Login failed!')
    }
}