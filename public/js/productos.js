let productos = []

function representarCardsProductos() {
    const contenedor = document.querySelector('.section-cards-body')

    if (!contenedor) return

    let cards = ''

    for (let producto of productos) {
        cards += `
            <section class="card">
                <div class="info-visible">
                    <img src="${producto.foto}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio}</p>
                    <p>Stock: ${producto.stock}</p>
                    <button class="btn-carrito" data-nombre="${producto.nombre}">Agregar al carrito                    </button>
                </div>

                <div class="info">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcionCorta}</p>
                    <p>${producto.descripcionLarga}</p>
                    <p>Marca: ${producto.marca}</p>
                    <p>Categoría: ${producto.categoria}</p>
                    <p>Edad: ${producto.edadDesde} a ${producto.edadHasta} años</p>
                    <p>Envío: ${producto.envio ? 'Sí' : 'No'}</p>
                </div>
            </section>
        `
    }

    contenedor.innerHTML = cards;

    document.querySelectorAll(".btn-carrito").forEach(boton => {
    boton.addEventListener("click", () => {
        const nombre = boton.dataset.nombre

        const producto = productos.find(p => p.nombre == nombre)

        console.log("Nombre del botón:", nombre)
        console.log("Producto encontrado:", producto)

        agregarAlCarrito(producto)
        })
    })

}