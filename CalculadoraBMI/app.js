

function calculateBMI() {
    const peso = parseFloat(document.getElementById("weight").value);
    const altura = parseFloat(document.getElementById("height").value) / 100;
    

    if (peso && altura){
        const bmi = (peso / (altura * altura)).toFixed(2);
        document.getElementById("result").textContent = `tu BMI es ${bmi}`;
    }else {
        document.getElementById("result").style.color = 'red';
        document.getElementById("result").textContent = 'por favor, introducir bien los datos'
    }

}