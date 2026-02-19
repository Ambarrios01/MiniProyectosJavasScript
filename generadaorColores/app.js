
const rRange = document.getElementById("rRange");
const gRange = document.getElementById("gRange");
const bRange = document.getElementById("bRange");
const colorDisplay = document.getElementById("colorDisplay");
const rgValue = document.getElementById("rgValue");

function updateColor (){
    const r = rRange.value;
    const g = gRange.value;
    const b = bRange.value;


    const rgbStr = `RGB(${r}, ${g}, ${b})`;
    colorDisplay.style.backgroundColor = rgbStr
    rgValue.textContent = rgbStr

}

rRange.addEventListener("input", updateColor);
gRange.addEventListener("input", updateColor);
bRange.addEventListener("input", updateColor);

updateColor()


const cpyButtton = document.getElementById("cpyButtton")

cpyButtton.addEventListener(("click"), ()=>{
    navigator.clipboard.writeText(rgValue.textContent)
    .then(()=>{
        alert('color copiado al portapales')
    })
    .catch(err => {
        console.alert('Error al copiar el texto', err)
        alert('No se pudo copiar el error')
    })
})