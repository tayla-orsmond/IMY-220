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


const PigLatinEncrypt = str =>{
	var vowels = "aeiou";
	vowels = vowels.split("");
	var newStr = [];
	str = str.toLowerCase();

    if (vowels.indexOf(str[0]) > -1) {
        newStr = str + "way";
        return newStr;
    } else {
        var firstMatch = str.match(/[aeiou]/g) || 0;
        var vowel = str.indexOf(firstMatch[0]);
        newStr = str.substring(vowel) + str.substring(0, vowel) + "ay";
        return newStr;
    }

}//end PigLatinEncrypt


const checker = new FactorialChecker();

document.getElementById("GenerateFactorial").onclick = function()
{
	document.getElementById("FactorialResult").innerHTML = checker.printFactorial(document.getElementById("FactorialValue").value);
}

document.getElementById("GenerateFactorialList").onclick = function()
{
	document.getElementById("FactorialListResult").innerHTML = checker.fillArray(document.getElementById("FactorialInput").value);
}

document.getElementById("PigLatinEncrypt").onclick = function()
{
	document.getElementById("PigLatinResult").innerHTML = PigLatinEncrypt(document.getElementById("SentenceToConvert").value);
}