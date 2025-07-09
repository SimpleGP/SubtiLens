document.getElementById("continuar").addEventListener("click", function (e) {
                    e.preventDefault();

         autorizo = document.getElementById("autorizo");
         user=document.getElementById("user");


         if(autorizo.checked  && user.value != ""){
          window.location.href = "config.html";
             }    else {
         alert("Por favor, completa todos los campos y acepta los términos.");
             }
});