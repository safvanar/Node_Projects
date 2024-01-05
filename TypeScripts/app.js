var num1Element = document.getElementById('num1');
var num2Element = document.getElementById('num2');
var addBtn = document.querySelector('button');
function addfunction(num1, num2) {
    return num1 + num2;
}
addBtn.addEventListener('click', function () {
    var num1 = num1Element.value;
    var num2 = num2Element.value;
    var result = addfunction(+num1, +num2);
    console.log(result);
});
