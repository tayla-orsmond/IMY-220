//Tayla Orsmond u21467456
function FactorialChecker(){
    this.printFactorial = function(n){
        var factorial = 1;
        for(var i = 1; i <=n; i++){
            factorial *= i;
        }
        return factorial;
    }
    this.printArray = function(fact){
        var i = 1;
        var arr = [];
        for(; ; i++){
            if(fact % i === 0){
                fact = parseInt(fact/i);
                arr.push(i);
            }
            else{
                break;
            }
        }
        if(i === 1){
            return arr;
        }
        else{
            return "This is not a factorial";
        }
    }
}

/* 
 * VARS
 */
//printFactorial
const FactorialValue = document.getElementById("FactorialValue"); 
const GenerateFactorial = document.getElementById("GenerateFactorial");
var FactorialResult = document.getElementById("FactorialResult");

//fillArray
const FactorialInput = document.getElementById("FactorialInput");
const GenerateFactorialList = document.getElementById("GenerateFactorialList");
var FactorialListResult = document.getElementById("FactorialListResult");
//checker
const checker = new FactorialChecker();

/* 
 * EVENT LISTENERS
 */
GenerateFactorial.onclick(function(e){
    const n = FactorialValue.value;
    var res = checker.printFactorial(n);
    FactorialResult.innerHTML(res);
});

GenerateFactorialList.onclick(function(e){
    const fact = FactorialInput.value;
    var res = checker.printArray(fact);
    FactorialListResult.innerHTML(res);
})