function mostrarError(campo, mensaje) {
  const grupo = campo.closest(".input-group")

  let mensajeError = grupo.querySelector(".mensaje-validacion")

  if (!mensajeError) {
    mensajeError = document.createElement("small")
    mensajeError.classList.add("mensaje-validacion")
    grupo.appendChild(mensajeError)
  }

  campo.classList.remove("campo-valido")
  campo.classList.add("campo-invalido")

  mensajeError.textContent = mensaje
  mensajeError.classList.remove("mensaje-correcto")
  mensajeError.classList.add("mensaje-error")

  return false
}

function mostrarCorrecto(campo, mensaje) {
  const grupo = campo.closest(".input-group")

  let mensajeValidacion = grupo.querySelector(".mensaje-validacion")

  if (!mensajeValidacion) {
    mensajeValidacion = document.createElement("small")
    mensajeValidacion.classList.add("mensaje-validacion")
    grupo.appendChild(mensajeValidacion)
  }

  campo.classList.remove("campo-invalido")
  campo.classList.add("campo-valido")

  mensajeValidacion.textContent = mensaje
  mensajeValidacion.classList.remove("mensaje-error")
  mensajeValidacion.classList.add("mensaje-correcto")

  return true
}

function validarNombre() {
  const campo = document.querySelector("#nombre")
  const valor = campo.value.trim()

  if (valor === "") {
    return mostrarError(campo, "El nombre es obligatorio.")
  }

  if (valor.length < 3) {
    return mostrarError(campo, "El nombre debe tener al menos 3 caracteres.")
  }

  return mostrarCorrecto(campo, "Nombre válido.")
}

function validarPrecio() {
  const campo = document.querySelector("#precio")
  const valor = Number(campo.value)

  if (campo.value.trim() === "") {
    return mostrarError(campo, "El precio es obligatorio.")
  }

  if (valor <= 0) {
    return mostrarError(campo, "El precio debe ser mayor que cero.")
  }

  return mostrarCorrecto(campo, "Precio válido.")
}

function validarStock() {
  const campo = document.querySelector("#stock")
  const valor = Number(campo.value)

  if (campo.value.trim() === "") {
    return mostrarError(campo, "El stock es obligatorio.")
  }

  if (!Number.isInteger(valor) || valor < 0) {
    return mostrarError(
      campo,
      "El stock debe ser un número entero igual o mayor que cero."
    )
  }

  return mostrarCorrecto(campo, "Stock válido.")
}

function validarMarca() {
  const campo = document.querySelector("#marca")
  const valor = campo.value.trim()

  if (valor === "") {
    return mostrarError(campo, "La marca es obligatoria.")
  }

  if (valor.length < 2) {
    return mostrarError(campo, "La marca debe tener al menos 2 caracteres.")
  }

  return mostrarCorrecto(campo, "Marca válida.")
}

function validarCategoria() {
  const campo = document.querySelector("#categoria")
  const valor = campo.value.trim()

  if (valor === "") {
    return mostrarError(campo, "La categoría es obligatoria.")
  }

  if (valor.length < 3) {
    return mostrarError(
      campo,
      "La categoría debe tener al menos 3 caracteres."
    )
  }

  return mostrarCorrecto(campo, "Categoría válida.")
}

function validarDescripcionCorta() {
  const campo = document.querySelector("#descripcion-corta")
  const valor = campo.value.trim()

  if (valor === "") {
    return mostrarError(campo, "La descripción corta es obligatoria.")
  }

  if (valor.length < 10) {
    return mostrarError(
      campo,
      "La descripción corta debe tener al menos 10 caracteres."
    )
  }

  return mostrarCorrecto(campo, "Descripción corta válida.")
}

function validarDescripcionLarga() {
  const campo = document.querySelector("#descripcion-larga")
  const valor = campo.value.trim()

  if (valor === "") {
    return mostrarError(campo, "La descripción larga es obligatoria.")
  }

  if (valor.length < 20) {
    return mostrarError(
      campo,
      "La descripción larga debe tener al menos 20 caracteres."
    )
  }

  return mostrarCorrecto(campo, "Descripción larga válida.")
}

function validarEdadDesde() {
  const campo = document.querySelector("#edad-desde")
  const valor = Number(campo.value)

  if (campo.value.trim() === "") {
    return mostrarError(campo, "La edad desde es obligatoria.")
  }

  if (!Number.isInteger(valor) || valor < 0) {
    return mostrarError(
      campo,
      "La edad desde debe ser un número entero igual o mayor que cero."
    )
  }

  return mostrarCorrecto(campo, "Edad desde válida.")
}

function validarEdadHasta() {
  const campo = document.querySelector("#edad-hasta")
  const edadHasta = Number(campo.value)
  const edadDesde = Number(document.querySelector("#edad-desde").value)

  if (campo.value.trim() === "") {
    return mostrarError(campo, "La edad hasta es obligatoria.")
  }

  if (!Number.isInteger(edadHasta) || edadHasta < 0) {
    return mostrarError(
      campo,
      "La edad hasta debe ser un número entero igual o mayor que cero."
    )
  }

  if (edadHasta < edadDesde) {
    return mostrarError(
      campo,
      "La edad hasta no puede ser menor que la edad desde."
    )
  }

  return mostrarCorrecto(campo, "Edad hasta válida.")
}

function validarFoto() {
  const campo = document.querySelector("#foto")
  const archivo = campo.files[0]

  if (!archivo && !fotoActual) {
    return mostrarError(campo, "La foto es obligatoria.")
  }

  if (archivo) {
    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!tiposPermitidos.includes(archivo.type)) {
      return mostrarError(campo, "Elegí una imagen JPG, PNG, WEBP o GIF.")
    }
    if (archivo.size > 5 * 1024 * 1024) {
      return mostrarError(campo, "La imagen no puede superar los 5 MB.")
    }
  }

  return mostrarCorrecto(campo, "Foto válida.")
}

function validarEnvio() {
  const campo = document.querySelector("#envio")

  return mostrarCorrecto(
    campo,
    campo.checked
      ? "El producto tiene envío bonificado."
      : "El producto no tiene envío bonificado."
  )
}

function validarFormulario() {
  const resultados = [
    validarNombre(),
    validarPrecio(),
    validarStock(),
    validarMarca(),
    validarCategoria(),
    validarDescripcionCorta(),
    validarDescripcionLarga(),
    validarEdadDesde(),
    validarEdadHasta(),
    validarFoto(),
    validarEnvio()
  ]

  return resultados.every(resultado => resultado === true)
}

function limpiarValidaciones() {
  document
    .querySelectorAll(".campo-valido, .campo-invalido")
    .forEach(campo => {
      campo.classList.remove("campo-valido", "campo-invalido")
    })

  document.querySelectorAll(".mensaje-validacion").forEach(mensaje => {
    mensaje.remove()
  })
}

//--------------------------------------------------
// Agregar producto
//--------------------------------------------------

let productoEditandoId = null
let fotoActual = ""

function archivoADataUrl(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader()
    lector.onload = () => resolve(lector.result)
    lector.onerror = () => reject(new Error("No se pudo leer la imagen"))
    lector.readAsDataURL(archivo)
  })
}

function mostrarVistaPrevia(origen) {
  const vistaPrevia = document.querySelector("#vista-previa-foto")
  vistaPrevia.src = origen
  vistaPrevia.classList.toggle("oculto", !origen)
}

async function agregar(e) {
  e.preventDefault()

  const formularioValido = validarFormulario()

  if (!formularioValido) {
    alert("Revisá los campos marcados antes de enviar.")
    return
  }

  const archivoFoto = document.querySelector("#foto").files[0]
  const foto = archivoFoto ? await archivoADataUrl(archivoFoto) : fotoActual

  const producto = {
    nombre: document.querySelector("#nombre").value.trim(),
    precio: Number(document.querySelector("#precio").value),
    stock: Number(document.querySelector("#stock").value),
    marca: document.querySelector("#marca").value.trim(),
    categoria: document.querySelector("#categoria").value.trim(),
    descripcionCorta: document
      .querySelector("#descripcion-corta")
      .value.trim(),
    descripcionLarga: document
      .querySelector("#descripcion-larga")
      .value.trim(),
    edadDesde: Number(document.querySelector("#edad-desde").value),
    edadHasta: Number(document.querySelector("#edad-hasta").value),
    foto,
    envio: document.querySelector("#envio").checked
  }

  if (productoEditandoId) {
    await actualizarProducto(productoEditandoId, producto)
  } else {
    await agregarProducto(producto)
  }

  productos = await obtenerProductos()
  representarTablasProductos()

  const formulario = document.querySelector(".alta-form")
  formulario.reset()

  const fueEdicion = Boolean(productoEditandoId)
  productoEditandoId = null
  fotoActual = ""
  mostrarVistaPrevia("")
  formulario.querySelector('button[type="submit"]').textContent = "Agregar un producto"

  limpiarValidaciones()

  alert(fueEdicion ? "Producto actualizado correctamente." : "Producto agregado correctamente.")
}

//--------------------------------------------------
// Tabla
//--------------------------------------------------

function representarTablasProductos() {
  const tabla = document.querySelector("table")

  if (!tabla) return

  let filasTabla = ""

  if (productos.length) {
    filasTabla += `
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Marca</th>
          <th>Categoría</th>
          <th>Descripción corta</th>
          <th>Descripción larga</th>
          <th>Edad desde</th>
          <th>Edad hasta</th>
          <th>Foto</th>
          <th>Envío bonificado</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
    `

    for (const producto of productos) {
      filasTabla += `
        <tr>
          <td>${producto.nombre}</td>
          <td class="centrar">$${producto.precio}</td>
          <td class="centrar">${producto.stock}</td>
          <td>${producto.marca}</td>
          <td>${producto.categoria}</td>
          <td>${producto.descripcionCorta}</td>
          <td>${producto.descripcionLarga}</td>
          <td>${producto.edadDesde}</td>
          <td>${producto.edadHasta}</td>

          <td>
            <img
              width="75"
              src="${producto.foto}"
              alt="${producto.nombre}"
            >
          </td>

          <td class="centrar">
            ${producto.envio ? "Sí" : "No"}
          </td>

          <td>
            <button onclick="cargarEdicion('${producto.id}')">✏️</button>
          </td>

          <td>
            <button onclick="borrarProducto('${producto.id}')">
              🗑️
            </button>
          </td>
        </tr>
      `
    }

    filasTabla += "</tbody>"
  } else {
    filasTabla = `
      <tbody>
        <tr>
          <td colspan="13">
            No se encontraron productos para mostrar.
          </td>
        </tr>
      </tbody>
    `
  }

  tabla.innerHTML = filasTabla
}

//--------------------------------------------------
// Inicio de la vista Alta
//--------------------------------------------------

async function startAlta() {
  productos = await obtenerProductos()

  const formulario = document.querySelector(".alta-form")

  if (!formulario) return

  document
    .querySelector("#nombre")
    .addEventListener("blur", validarNombre)

  document
    .querySelector("#precio")
    .addEventListener("blur", validarPrecio)

  document
    .querySelector("#stock")
    .addEventListener("blur", validarStock)

  document
    .querySelector("#marca")
    .addEventListener("blur", validarMarca)

  document
    .querySelector("#categoria")
    .addEventListener("blur", validarCategoria)

  document
    .querySelector("#descripcion-corta")
    .addEventListener("blur", validarDescripcionCorta)

  document
    .querySelector("#descripcion-larga")
    .addEventListener("blur", validarDescripcionLarga)

  document
    .querySelector("#edad-desde")
    .addEventListener("blur", validarEdadDesde)

  document
    .querySelector("#edad-hasta")
    .addEventListener("blur", validarEdadHasta)

  document
    .querySelector("#foto")
    .addEventListener("change", event => {
      validarFoto()
      const archivo = event.target.files[0]
      if (archivo) mostrarVistaPrevia(URL.createObjectURL(archivo))
    })

  document
    .querySelector("#envio")
    .addEventListener("change", validarEnvio)

  formulario.addEventListener("submit", agregar)

  representarTablasProductos()
}

async function borrarProducto(id) {

    if (!confirm("¿Eliminar este producto?")) return

    await eliminarProducto(id)

    productos = await obtenerProductos()

    representarTablasProductos()
}

function cargarEdicion(id) {
  const producto = productos.find(item => item.id === id)
  if (!producto) return
  productoEditandoId = id
  document.querySelector("#nombre").value = producto.nombre
  document.querySelector("#precio").value = producto.precio
  document.querySelector("#stock").value = producto.stock
  document.querySelector("#marca").value = producto.marca
  document.querySelector("#categoria").value = producto.categoria
  document.querySelector("#descripcion-corta").value = producto.descripcionCorta
  document.querySelector("#descripcion-larga").value = producto.descripcionLarga
  document.querySelector("#edad-desde").value = producto.edadDesde
  document.querySelector("#edad-hasta").value = producto.edadHasta
  document.querySelector("#foto").value = ""
  fotoActual = producto.foto
  mostrarVistaPrevia(fotoActual)
  document.querySelector("#envio").checked = producto.envio
  document.querySelector('.alta-form button[type="submit"]').textContent = "Guardar cambios"
  document.querySelector(".vista-alta").scrollIntoView({ behavior: "smooth" })
}
