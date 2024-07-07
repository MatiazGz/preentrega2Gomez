let mayoredad = true;
let entrada = confirm("Soy Mayor de 18");

while (entrada != mayoredad) {
  alert("Debe ser mayor de edad para cambiar");
  entrada = confirm("Soy Mayor de 18");
}
function cambiar() {
  let valorar = parseInt(document.getElementById("valor").value);
  let resultado = 0;
  let dolar = 40.90;
  let euro = 43.36;
  if (document.getElementById("valor").value) {
    if (document.getElementById("dol").checked) {
      resultado = valorar / dolar;
      Swal.fire(
        "Si cambia esa cantidad en pesos, obtendrá: U$S" + resultado.toFixed(2)
      );
    } else if (document.getElementById("euros").checked) {
      resultado = valorar / euro;
      Swal.fire(
        "Si cambia esa cantidad en pesos, obtendrá: €" + resultado.toFixed(2)
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "Escoja una moneda por favor!",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Algo salió mal",
      text: "Ingrese un monto por favor!",
    });
  }
}
