

const cartel = ['imagenError', 'imagenInicial', 'parrafoResultado', 'tituloResultado']
const iconos = ["Alura", "warning", "imagenError", "imagenInicial", "icono_tema", "icono_info"];
const bloques = ["bloque_principal", "bloque_secundario", "bloque_botones", "titulo"]
const boton_tema = document.getElementById("boton_tema");



//######################################################################################
//main

const temaGuardado = localStorage.getItem('tema') || 'oscuro';
document.documentElement.setAttribute('tema', temaGuardado);


//######################################################################################
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


//funcion de limpiar
document.getElementById("limpiar").addEventListener("click", function() {
    document.getElementById('campoEntrada').value = "";
    return;
})


//Funcion de cambio de tema
boton_tema.addEventListener("click", function () {
    boton_tema.disabled = true;
    desaparecerBloques();
    esconderIconos();
    const temaActual = document.documentElement.getAttribute('tema');
    const temaNuevo = temaActual === 'oscuro' ? 'claro' : 'oscuro';
    document.querySelector("main").style.transition = "background-color 1s";
    document.querySelector("body").style.transition = "background-color 1s";
    setTimeout(() => {
        document.documentElement.setAttribute('tema', temaNuevo);
        actualizarIconos();
        aparecerBloques();
        aparecerIconos();
        boton_tema.disabled = false;
    }, 1100);
    localStorage.setItem('tema', temaNuevo);
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
        // Fallback for older browsers
        campo.select();
        campo.setSelectionRange(0, 99999); // For mobile devices

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


//Transicion a otra pagina
document.addEventListener('DOMContentLoaded', (event) => {
    const delayedLinks = document.querySelectorAll('.delayed-link');
    const allLinks = document.querySelectorAll('a'); // Seleccionar todos los enlaces

    delayedLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = this.getAttribute('href');

            // Desactivar todos los enlaces
            allLinks.forEach(l => l.classList.add('disabled'));

            // Añadir la clase de transición
            desaparecerBloques();
            esconderIconos();

            setTimeout(() => {
                window.location.href = href;
            }, 1200);
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    actualizarIconos();
    aparecerBloques();
    aparecerIconos();

});




//####################################################################################
//Funciones visuales






function rechazar() {
    const bloque = document.getElementById("bloque_secundario");
    bloque.style.animationDelay = "0s";
    bloque.classList.remove("oculto");
    bloque.classList.remove("aparecer_rapido");
    bloque.classList.add("desaparecer_rapido");

    setTimeout(() => {

        let parrafo = document.getElementById('parrafoResultado');
        let titulo = document.getElementById('tituloResultado');
        document.getElementById('imagenInicial').style.display = "none";
        document.getElementById('copiar').style.visibility = "hidden";
        document.getElementById('contenedor_salida').style.display = "none";
        document.getElementById('imagenError').style.display = "inline";
        parrafo.style.display = "block";
        titulo.style.display = "block";
        parrafo.innerHTML = "No se permiten <strong>mayusculas</strong>, <strong>tildes</strong> ni <strong>caracteres especiales</strong>."
        titulo.textContent = "Algo anduvo mal."


        bloque.classList.remove("desaparecer_rapido");
        bloque.classList.add("aparecer_rapido");
        bloque.classList.add("oculto");

        setTimeout(() => {
            bloque.classList.remove("aparecer_rapido");
            bloque.style.animationDelay = "0.6s";
        }, 1000);

    }, 300);


}


function ocultarCartel() {
    const bloque = document.getElementById("bloque_secundario");
    bloque.style.animationDelay = "0s";
    bloque.classList.remove("oculto");
    bloque.classList.remove("aparecer_rapido");
    bloque.classList.add("desaparecer_rapido");

    setTimeout(() => {
        document.getElementById('imagenError').style.display = "none";
        document.getElementById('imagenInicial').style.display = "none";
        document.getElementById('parrafoResultado').style.display = "none";
        document.getElementById('tituloResultado').style.display = "none";
        mostrarResultado();

        bloque.classList.remove("desaparecer_rapido");
        bloque.classList.add("aparecer_rapido");
        bloque.classList.add("oculto");
        setTimeout(() => {
            bloque.classList.remove("aparecer_rapido");
            bloque.style.animationDelay = "0.6s";
        }, 1000);
    }, 300);


    return;
}


function mostrarResultado() {
    document.getElementById('copiar').style.visibility = "visible";
    document.getElementById('contenedor_salida').style.display = "block";
    return;
}





function actualizarIconos() {
    if (oscuro()) {
        for (let icono of iconos) {
            oscurecer(document.getElementById(icono));
            boton_tema.setAttribute("texto-cartel", "Tema claro")
        }
    } else {
        for (let icono of iconos) {
            enclarecer(document.getElementById(icono));
            boton_tema.setAttribute("texto-cartel", "Tema oscuro")
        }
    }

    return 0;
}




function enclarecer(elemento) {
    elemento.src = elemento.src.replace(/(\.[^/.]+)$/, '_claro$1');
    return;
}


function oscurecer(elemento) {
    elemento.src = elemento.src.replace(/_claro(\.[^/.]+)$/, '$1');
    return;
}


function aparecerBloques() {
    for (const elemento of bloques) {
        document.getElementById(elemento).classList.add("oculto");
        document.getElementById(elemento).classList.remove("desaparecer");
        document.getElementById(elemento).classList.add("aparecer");
    }
}


function desaparecerBloques() {
    for (const elemento of bloques) {
        document.getElementById(elemento).classList.remove("oculto");
        document.getElementById(elemento).classList.remove("aparecer");
        document.getElementById(elemento).classList.add("desaparecer");
    }
}


function esconderIconos() {
    let botones = document.querySelectorAll(".menu__boton");
    for (const elemento of botones) {
        elemento.classList.remove("fuera_de_pantalla");
        elemento.classList.remove("aparecer_de_pantalla");
        elemento.classList.add("salir_de_pantalla");
    }
}

function aparecerIconos() {
    let botones = document.querySelectorAll(".menu__boton");
    for (const elemento of botones) {
        elemento.classList.add("fuera_de_pantalla");
        elemento.classList.remove("salir_de_pantalla");
        elemento.classList.add("aparecer_de_pantalla");
    }
}

//###############################################################################
//Funciones de procesamiento y otras funciones





function oscuro() {
    return document.documentElement.getAttribute('tema') === "oscuro";
}


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
