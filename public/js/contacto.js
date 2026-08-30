function obtenerMensajeContacto(campo) {
    const grupo = campo.closest(".input-group")
    let mensaje = grupo.querySelector(".mensaje-validacion")

    if (!mensaje) {
        mensaje = document.createElement("small")
        mensaje.classList.add("mensaje-validacion")
        grupo.appendChild(mensaje)
    }

    return mensaje
}

function marcarContacto(campo, esValido, texto) {
    const mensaje = obtenerMensajeContacto(campo)

    campo.classList.toggle("campo-valido", esValido)
    campo.classList.toggle("campo-invalido", !esValido)

    mensaje.textContent = texto
    mensaje.classList.toggle("mensaje-correcto", esValido)
    mensaje.classList.toggle("mensaje-error", !esValido)

    return esValido
}

function validarNombreContacto() {
    const campo = document.querySelector("#contacto-nombre")
    const valor = campo.value.trim()

    if (valor === "") {
        return marcarContacto(campo, false, "El nombre es obligatorio.")
    }

    if (valor.length < 3) {
        return marcarContacto(
            campo,
            false,
            "El nombre debe tener al menos 3 caracteres."
        )
    }

    return marcarContacto(campo, true, "Nombre válido.")
}

function validarEmailContacto() {
    const campo = document.querySelector("#contacto-email")
    const valor = campo.value.trim()
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (valor === "") {
        return marcarContacto(campo, false, "El email es obligatorio.")
    }

    if (!formatoEmail.test(valor)) {
        return marcarContacto(
            campo,
            false,
            "Ingresá un email válido, por ejemplo nombre@correo.com."
        )
    }

    return marcarContacto(campo, true, "Email válido.")
}

function validarComentariosContacto() {
    const campo = document.querySelector("#contacto-comentarios")
    const valor = campo.value.trim()

    if (valor === "") {
        return marcarContacto(
            campo,
            false,
            "Los comentarios son obligatorios."
        )
    }

    if (valor.length < 10) {
        return marcarContacto(
            campo,
            false,
            "El comentario debe tener al menos 10 caracteres."
        )
    }

    return marcarContacto(campo, true, "Comentario válido.")
}

function validarFormularioContacto() {
    const resultados = [
        validarNombreContacto(),
        validarEmailContacto(),
        validarComentariosContacto()
    ]

    return resultados.every(resultado => resultado === true)
}

function limpiarValidacionesContacto() {
    document
        .querySelectorAll(
            ".contacto-form .campo-valido, .contacto-form .campo-invalido"
        )
        .forEach(campo => {
            campo.classList.remove("campo-valido", "campo-invalido")
        })

    document
        .querySelectorAll(".contacto-form .mensaje-validacion")
        .forEach(mensaje => mensaje.remove())
}

function mostrarResultadoContacto(texto, esExito) {
    let mensaje = document.querySelector("#resultado-contacto")

    if (!mensaje) {
        mensaje = document.createElement("p")
        mensaje.id = "resultado-contacto"

        const formulario = document.querySelector(".contacto-form")
        formulario.before(mensaje)
    }

    mensaje.textContent = texto
    mensaje.classList.toggle("resultado-exito", esExito)
    mensaje.classList.toggle("resultado-error", !esExito)
}

function enviarContacto(e) {
    e.preventDefault()

    if (!validarFormularioContacto()) {
        mostrarResultadoContacto(
            "Revisá los campos marcados antes de enviar.",
            false
        )
        return
    }

    const formulario = document.querySelector(".contacto-form")

    mostrarResultadoContacto(
        "Formulario enviado correctamente.",
        true
    )

    formulario.reset()
    limpiarValidacionesContacto()
}

function startContacto() {
    const formulario = document.querySelector(".contacto-form")

    if (!formulario) return

    document
        .querySelector("#contacto-nombre")
        .addEventListener("blur", validarNombreContacto)

    document
        .querySelector("#contacto-email")
        .addEventListener("blur", validarEmailContacto)

    document
        .querySelector("#contacto-comentarios")
        .addEventListener("blur", validarComentariosContacto)

    formulario.addEventListener("submit", enviarContacto)
}