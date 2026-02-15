function calcultelove() {
  const name1 = document.getElementById("Nombre").value;
  const name2 = document.getElementById("Nombre2").value;

  if (name1 && name2) {
    const hash = (name1 + name2)
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const lovePorcentage = hash % 101;

    document.getElementById("result").style.color = "green";
    document.getElementById("result").textContent =
      `Tiene un ${lovePorcentage}% de compatibilidad 💖`;
  } else {
    document.getElementById("result").style.color = "red";
    document.getElementById("result").textContent =
      "Por favor, digite los nombres correctamente 💔";
  }
}
