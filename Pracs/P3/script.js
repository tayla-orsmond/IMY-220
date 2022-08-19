//Tayla Orsmond u21467456
/*
 * Factorial Checker
 *
 */
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
                console.log(i);
            }
            else{
                break;
            }
        }
        if(fact === 1){
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
GenerateFactorial.addEventListener("click", function(e){
    const n = FactorialValue.value;
    var res = checker.printFactorial(n);
    FactorialResult.innerHTML = res;
});

GenerateFactorialList.addEventListener("click", function(e){
    const fact = FactorialInput.value;
    var res = checker.printArray(fact);
    FactorialListResult.innerHTML = res;
})

/*
 * Pig Latin
 *
 */
const vowels = /(A|a|E|e|I|i|O|o|U|u)/;
function PigLatinEncrypt(input){
    //var arr = [...input];
    if(input.search(vowels) === -1){
        input += "ay";
    }
    else if(input.search(vowels) === 0){
        input += "way";
    }
    else{
        var FL = input.substring(0, 1);
        input = input.slice(1);
        input += FL + "ay";
    }
    return input;
}
/* 
 * VARS
 */
//PigLatinEncryption
const SentenceToConvert = document.getElementById("SentenceToConvert");
const PigLatinEncryptBTN = document.getElementById("PigLatinEncrypt");
var PigLatinResult = document.getElementById("PigLatinResult");

PigLatinEncryptBTN.addEventListener("click", function(){
    var input = SentenceToConvert.value;
    var res = PigLatinEncrypt(input);
    PigLatinResult.innerHTML = res;
})