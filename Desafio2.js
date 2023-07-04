const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.log('Error al cargar los productos:', error);
    }
  }

  async saveProducts() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
      console.log('Productos guardados correctamente.');
    } catch (error) {
      console.log('Error al guardar los productos:', error);
    }
  }

  async addProduct(product) {
    // Validar que todos los campos sean obligatorios
    const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
    const missingFields = requiredFields.filter(field => !product[field]);
    if (missingFields.length > 0) {
      console.log('Todos los campos son obligatorios:', missingFields);
      return;
    }

    // Asignar un id autoincrementable al producto
    const id = this.products.length + 1;
    product.id = id;

    // Agregar el producto al arreglo
    this.products.push(product);

    // Guardar los productos en el archivo
    await this.saveProducts();
  }

  async getProducts() {
    await this.loadProducts();
    return this.products;
  }

  async getProductById(id) {
    await this.loadProducts();
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.log('Producto no encontrado.');
    }
  }

  async updateProduct(id, updatedFields) {
    await this.loadProducts();
    const product = this.products.find(product => product.id === id);
    if (product) {
      // Actualizar los campos del producto
      Object.assign(product, updatedFields);
      await this.saveProducts();
      console.log('Producto actualizado correctamente.');
    } else {
      console.log('Producto no encontrado.');
    }
  }

  async deleteProduct(id) {
    await this.loadProducts();
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      // Eliminar el producto del arreglo
      this.products.splice(index, 1);
      await this.saveProducts();
      console.log('Producto eliminado correctamente.');
    } else {
      console.log('Producto no encontrado.');
    }
  }
}

// Crear una instancia de ProductManager
const productManager = new ProductManager('../productos.json');

//Ejemplo de uso:
//async function ejemplo() {
//await productManager.addProduct({
// title: 'Tarta de manzana',
//description: 'Deliciosa tarta de manzana',
//price: 1200,
// thumbnail: 'tarta_manzana.jpg',
//code: 'BC001',
 //stock: 10
//});

  //const productos = await productManager.getProducts();
  //console.log(productos);

  //const producto = await productManager.getProductById(1);
  //console.log(producto);

  //await productManager.updateProduct(1, { price: 1500 });

  //await productManager.deleteProduct(1);
//}

//ejemplo();

module.exports = new ProductManager('../productos.json');
