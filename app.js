//Eventos de botones

//funcion de encriptar
document.getElementById("encriptar").addEventListener("click", function() {
    let texto = document.getElementById("campoEntrada").value;
    document.getElementById("campoSalida").value = encriptarTexto(texto) || "";
    return;
})


//funcion de desencriptar
document.getElementById("desencriptar").addEventListener("click", function() {
    let texto = document.getElementById("campoEntrada").value;
    document.getElementById("campoSalida").value = desencriptarTexto(texto) || "";
    return;
})


//funcion de copiar
document.getElementById('copiar').addEventListener('click', function() {
    this.disabled = true;
    const campo = document.getElementById('campoSalida');
    const textoCopiar = campo.value;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(textoCopiar).then(() => {
            console.log('Texto copiado al portapapeles');
        }).catch(err => {
            console.error('Error al intentar copiar el texto: ', err);
        });
    } else {
        campo.select();
        campo.setSelectionRange(0, 99999);

        try {
            const exitoso = document.execCommand('copy');
            const mensaje = exitoso ? 'Texto copiado al portapapeles' : 'Error al copiar el texto';
            console.log(mensaje);
        } catch (err) {
            console.error('Error al intentar copiar el texto: ', err);
        }

        window.getSelection().removeAllRanges();
    }

    this.textContent = "¡COPIADO!";
    this.classList.add("exitoso");
    setTimeout(() => {
        this.classList.remove("exitoso");
        this.textContent = "copiar";
        this.disabled = false;
    }, 1000);
});


//####################################################################################
//Control de mensajes e imagenes


function rechazar() {
    let parrafo = document.getElementById('parrafoResultado');
    let titulo = document.getElementById('tituloResultado');
    document.getElementById('copiar').style.visibility = "hidden";
    document.getElementById('campoSalida').style.display = "none";
    document.getElementById('cerrojo').style.display = "block";
    document.getElementById('cerrojo_imagen').src = "Recursos/error.png";
    document.getElementById('texto_cerrojo').style.display = "block";
    parrafo.innerHTML = "No se permiten <strong>mayusculas</strong>, <strong>tildes</strong> ni <strong>caracteres especiales</strong>."
    titulo.textContent = "Algo anduvo mal."

}


function ocultarCartel() {
    document.getElementById('cerrojo').style.display = "none";
    document.getElementById('texto_cerrojo').style.display = "none";
    mostrarResultado();
    return;
}


function mostrarResultado() {
    document.getElementById('copiar').style.visibility = "visible";
    document.getElementById('campoSalida').style.display = "block";
    return;
}

//###############################################################################
//Otras funciones



function ilegal(str) {
    /*La expresion regular no incluye exclamaciones ni preguntas
    debido a que tecnicamente estos se consideran caracteres especiales*/
    const regular = /[^a-z0-9 ,.\n\r]/;
    return regular.test(str);
}




const a = 'ai';
const e = 'enter';
const li = 'imes';
const o = 'ober';
const u = 'ufat';

function encriptarTexto(texto) {

    if (ilegal(texto)) {
        rechazar();
        return
    }

    if (texto !== "" && document.getElementById("parrafoResultado").style.display !== "none") {
        ocultarCartel();
    }


    let resultado = "";

    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];

        switch (char) {
            case 'a':
                resultado += a;
                break;
            case 'e':
                resultado += e;
                break;
            case 'i':
                resultado += li;
                break;
            case 'o':
                resultado += o;
                break;
            case 'u':
                resultado += u;
                break;
            default:
                resultado += char;
        }
    }

    return resultado;
}



function desencriptarTexto(texto) {
    let resultado = "";

    if (ilegal(texto)) {
        rechazar();
        return
    }

    if (texto !== "" && document.getElementById("parrafoResultado").style.display !== "none") {
        ocultarCartel();
    }

    for (let i = 0; i < texto.length; ) {
        if (texto.startsWith(a, i)) {
            resultado += 'a';
            i += a.length;
        } else if (texto.startsWith(e, i)) {
            resultado += 'e';
            i += e.length;
        } else if (texto.startsWith(li, i)) {
            resultado += 'i';
            i += li.length;
        } else if (texto.startsWith(o, i)) {
            resultado += 'o';
            i += o.length;
        } else if (texto.startsWith(u, i)) {
            resultado += 'u';
            i += u.length;
        } else {
            resultado += texto[i];
            i++;
        }
    }

    return resultado;
}
