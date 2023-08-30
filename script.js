"use strict";
var input=document.getElementById('input'),
    number=document.querySelectorAll('.numbers div'),
    operator=document.querySelectorAll('.operators div'),
    result=document.getElementById('result'),
    clear=document.getElementById('clear'),
    resultDisplayed=false;

// adding click handlers to number buttons
for (var i=0;i<number.length; i++){
    number[i].addEventListener("click",function(e){
        var currentString=input.innerHTML;
        var lastChar=currentString[currentString.length-1];

        if(resultDisplayed === false ){
            input.innerHTML+=e.target.innerHTML;
        }
        else if(resultDisplayed === true&& lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar ==="÷"){
            resultDisplayed=false;
            input.innerHTML+=e.target.innerHTML;
        }
        else{
            resultDisplayed=false;
            input.innerHTML ="";
            input.innerHTML +=e.target.innerHTML
        }
    });
}
// adding click handlers to number buttons
for (var i=0;i<operator.length;i++){
    operator[i].addEventListener("click",function(e){
        var currentString=input.innerHTML;
        var lastChar = currentString[currentString.length-1];
        if(lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷"){
            var newString=currentString.substring(0,currentString.length-1)+e.target.innerHTML;
            input.innerHTML=newString;
        }else if(currentString.length==0){
            console.log("enter 1st number");
        }else{
            input.innerHTML +=e.target.innerHTML;
        }
    });
}

// on click equal button
result.addEventListener("click",function(){
    var inputString=input.innerHTML;
    var numbers=inputString.split(/\+|\-|\×|\÷/g)
    var operators=inputString.replace(/[0-9]|\./g,"").split("");
    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");

    var div=operators.indexOf("÷");
    while(div!=-1){
        numbers.splice(div,2,numbers[div]/numbers[div+1]);
        operators.splice(div,1);
        div=operators.indexOf("÷");
    }

    var mul=operators.indexOf("×");
    while(mul!=-1){
        numbers.splice(mul,2,numbers[mul]*numbers[mul+1]);
        operators.splice(mul,1);
        mul=operators.indexOf("×");
    }

    var min=operators.indexOf("-");
    while(min!=-1){
        numbers.splice(min,2,numbers[min]-numbers[min+1]);
        operators.splice(min,1);
        min=operators.indexOf("-");
    }

    var add=operators.indexOf("+");
    while(add!=-1){
        numbers.splice(add,2,parseFloat(numbers[add])+parseFloat(numbers[add+1]));
        operators.splice(add,1);
        add=operators.indexOf("+");
    }
input.innerHTML=numbers[0];
resultDisplayed=true;
});

clear.addEventListener("click",function(){
    input.innerHTML="";
})