//--------------------------------------------------
//variables globales
//--------------------------------------------------


//--------------------------------------------------
//funciones globales
//--------------------------------------------------

async function start() {
    productos = await obtenerProductos()
    console.log("Primer producto:", productos[0])
console.log("ID:", productos[0].id)
    representarCardsProductos()
}
