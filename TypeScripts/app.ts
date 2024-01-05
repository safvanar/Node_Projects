const num1Element = document.getElementById('num1') as HTMLInputElement
const num2Element = document.getElementById('num2') as HTMLInputElement
const addBtn = document.querySelector('button')

function addfunction(num1: number, num2: number){
    return num1+num2;
}

addBtn.addEventListener('click', () => {
    const num1 = num1Element.value
    const num2 = num2Element.value
    const result = addfunction(+num1, +num2)
    console.log(result)
})