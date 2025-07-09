function restablecerContrasena(event){
                event.preventDefault();

                nueva=document.getElementById("nueva").value;
                confirmar=document.getElementById("confirmar").value;

                if(nueva !== confirmar){
                    alert("Las contraseñas no coinciden, por favor intente de nuevo.");
                    return false;
                } else {
                    alert("Contraseña restablecida correctamente.");
                }

                window.location.href = "login.html"; 
            }