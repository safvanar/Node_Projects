const num1Element = document.getElementById('num1') as HTMLInputElement
const num2Element = document.getElementById('num2') as HTMLInputElement
const addBtn = document.querySelector('button')!

const numResult: number[] /*Array<number>*/ = []
const textResult: string[] = []

//type alias
type NumberOrString = number | string
type Result = { val: number; timestamp: Date }
interface ResultObj {
    val: number;
    timestamp: Date
}

function add(num1: NumberOrString, num2: NumberOrString){
    if(typeof num1 === 'number' && typeof num2 === 'number'){
        return num1 + num2
    }else if(typeof num1 === 'string' && typeof num2 === 'string'){
        return num1 + ' '+ num2
    }
    return +num1 + +num2;
}

function printResult(resultObj: Result /* or ResultObj*/){
    console.log(resultObj.val)
}

addBtn.addEventListener('click', () => {
    const num1 = num1Element.value
    const num2 = num2Element.value
    const result = add(+num1, +num2)
    const stringResult = add(num1, num2)
    numResult.push(result as number)
    textResult.push(stringResult as string)
    printResult({val: result as number, timestamp: new Date()})
    console.log(numResult, textResult)
})

const myPromise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve('It Worked!')
    }, 1000)
})

myPromise.then((result) => {
    console.log(result.split(' '))
})