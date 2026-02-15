const btnElement = document.querySelector("button");
const spanElemet = document.getElementById("updateContent");

btnElement.onclick = function(){
    const yourName = prompt("Por favor Digita Tu Nombre");
    spanElemet.textContent = yourName;
}