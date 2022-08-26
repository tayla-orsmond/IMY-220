class FactorialChecker {
	printFactorial = num => {
		let fact = 1;
		for (let i = 1; i <= num; i++) 
		{
			fact *= i;
		}
		return `The factorial of ${num} is ${fact}`;

	}//end function

	fillArray = num => {
		const start = num;
		let init = 1; 
		let i = 1; 
		const arr = []; 
		let fac = true; 
		while (true){
			init = init*i; 
		  	if (init%2==0 || init==1){        
				if(init>start){
				  	fac=false;
					break;
			  	}
			arr.push(i);
			i++; 
			if(init==start)
				break; 
		  }
		}
		if (fac) return `The values that make up the factorial of ${num}: ${arr}`;
		else return "This is not a factorial";
	}//end function

}//end FactorialChecer

const vowels = /(A|a|E|e|I|i|O|o|U|u)/;
const PigLatinEncrypt = input => {
	const original = input;
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
    return `The result when converting ${original} to Pig Latin is: ${input}`;
}//end PigLatinEncrypt



const checker = new FactorialChecker();

document.getElementById("GenerateFactorial").onclick = () =>
{
	document.getElementById("FactorialResult").innerHTML = checker.printFactorial(document.getElementById("FactorialValue").value);
}

document.getElementById("GenerateFactorialList").onclick = () =>
{
	document.getElementById("FactorialListResult").innerHTML = checker.fillArray(document.getElementById("FactorialInput").value);
}

document.getElementById("PigLatinEncrypt").onclick = () =>
{
	document.getElementById("PigLatinResult").innerHTML = PigLatinEncrypt(document.getElementById("SentenceToConvert").value);
}