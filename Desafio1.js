class ProductManager{
    constructor (){
     this.products=[]
    }
 getProducts () {
    return this.products;
 }
 getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
        return product;
    } else {
        console.log("Not found");
    }
}
addProduct(p) {
    // Validar que todos los campos sean obligatorios
    if (!p.title || !p.description || !p.price || !p.thumbnail || !p.code || !p.stock) {
        console.log("Todos los campos son obligatorios");
        return; // Detener la ejecución del método
    }

    // Validar que el campo 'code' no se repita
    const codigoExistente = this.products.find(producto => producto.code === p.code);
    if (codigoExistente) {
        console.log("El código del producto ya existe");
        return; // Detener la ejecución del método
    }

    const nuevoProducto = {
        id: this.products.length + 1,
        title: p.title,
        description: p.description,
        price: p.price,
        thumbnail: p.thumbnail,
        code: p.code,
        stock: p.stock,
        fecha: p.fecha ? new Date(p.fecha) : new Date()
    }

    this.products.push(nuevoProducto);
}
}
  // Crear una instancia de ProductManager
const productManager = new ProductManager();
// Crear productos de pastelería
const producto1 = {
    title: "Tarta de manzana",
    description: "Deliciosa tarta de manzana",
    price: 1200,
    thumbnail: "tarta_manzana.jpg",
    code: "BC001",
    stock: 10,
    fecha: "2023-06-09"
};

const producto2 = {
    title: "Croissant",
    description: "Croissant relleno de jamón y queso",
    price: 800,
    thumbnail: "croissant_chocolate.jpg",
    code: "BC002",
    stock: 20,
    fecha: "2023-06-09"
};

const producto3 = {
    title: "Cupcake de vainilla",
    description: "Cupcake de vainilla con cobertura de chocolate",
    price: 600,
    thumbnail: "cupcake_vainilla.jpg",
    code: "BC003",
    stock: 15,
    fecha: "2023-06-09"
};

const producto4 = {
    title: "Donut glaseado",
    description: "Donut con glaseado de colores",
    price: 450,
    thumbnail: "donut_glaseado.jpg",
    code: "BC004",
    stock: 30,
    fecha: "2023-06-09"
};

// Agregar los productos al ProductManager
productManager.addProduct(producto1);
productManager.addProduct(producto2);
productManager.addProduct(producto3);
productManager.addProduct(producto4);
// Obtener el arreglo de productos
const productos = productManager.getProducts();
// Mostrar los productos por consola
console.log(productManager);
console.log (productManager.getProductById(5));