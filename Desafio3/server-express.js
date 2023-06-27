const express = require('express');
const ProductManager = require('../Desafio2');
const app = express();

app.get('/products', async (req, res) => {
    try {
    const limit = parseInt(req.query.limit) || null
    const products = await ProductManager.getProducts();

    let limitedProducts = products
    if(limit && Number.isInteger(limit) && limit>0){
      limitedProducts = products.slice(0, limit)
    
    } 
    res.json(limitedProducts)
    }


    catch (error) {
        console.log('Error al obtener los productos', error)
    res.status(500).json({error: 'Error al obtener los productos'})
  }
})
    
app.get('/products/:pid', async (req,res) =>{
    try{
      const productId = parseInt(req.params.pid)
      const products = await ProductManager.getProductById(productId);
      if(products){
        res.json(productos)
      }
      else{
        res.status(404).json({error: 'Producto no encontrado'})
      }
    }
    catch(error){
      console.log('Error al obtener los productos', error)
      res.status(500).json({error: 'Error al obtener los productos'})
    }

  })
  
  app.listen(8080,()=>{
    console.log('escuchando server')
  })