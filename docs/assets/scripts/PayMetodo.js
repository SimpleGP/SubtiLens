document.getElementById("metodo_de_pago").addEventListener("change", function () {
        const metodo = this.value;

        // Ocultar todos
        document.getElementById("mtd-yape").style.display = "none";
        document.getElementById("mtd-tarjeta").style.display = "none";
        document.getElementById("mtd-paypal").style.display = "none";

        // Mostrar el seleccionado
        if (metodo === "yape") {
            document.getElementById("mtd-yape").style.display = "block";
        } else if (metodo === "tarjeta_de_credito") {
            document.getElementById("mtd-tarjeta").style.display = "block";
        } else if (metodo === "paypal") {
            document.getElementById("mtd-paypal").style.display = "block";
        }
    });