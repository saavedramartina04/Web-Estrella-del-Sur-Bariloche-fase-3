const app = document.querySelector("#app")

async function cargarVista(vista) {
    try {
        const respuesta = await fetch(`vistas/${vista}.html`)

        if (!respuesta.ok) {
            throw new Error(`No se pudo cargar la vista ${vista}`)
        }

        const html = await respuesta.text()

        app.innerHTML = html

        if (vista === "inicio") {
            await start()
        }

        if (vista === "alta") {
            await startAlta()
        }

        if (vista === "contacto") {
    startContacto()
}

    } catch (error) {
        console.error(error)

        app.innerHTML = `
            <section>
                <h2>Error al cargar la vista</h2>
                <p>Intentá nuevamente.</p>
            </section>
        `
    }
}

document.querySelectorAll("[data-vista]").forEach(link => {
    link.addEventListener("click", async function(e) {
        e.preventDefault()

        const vista = this.dataset.vista
        await cargarVista(vista)
    })
})

cargarVista("inicio")