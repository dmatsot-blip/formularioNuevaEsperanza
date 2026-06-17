document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;

  // Ejemplo de credenciales fijas
  if(usuario === "admin" && contrasena === "1234"){
    // Redirige al formulario de Nueva Esperanza
    window.location.href = "formulario.html"; // asegúrate de que el archivo del formulario se llame así
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});