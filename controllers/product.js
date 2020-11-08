const { mongoUtils, dataBase } = require("../lib/utils/mongo.js");
const COLLECTION_NAME = "productos";

async function getProducts() {
  const client = await mongoUtils.conn();
  const products = await client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .find({})
    .toArray()
    .finally(() => client.close());
  return products;
}

async function insertProduct(product) {
  const client = await mongoUtils.conn();
  return client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .insertOne(product)
    .finally(() => client.close());
}

async function deleteProduct(id){
  const client = await mongoUtils.conn();
  return client.db(dataBase).collection(COLLECTION_NAME).deleteOne({idproducto: id});
}

async function updateProduct(nProduct) {
  const client = await mongoUtils.conn();
  client.db(dataBase).collection(COLLECTION_NAME).updateOne({idproducto: nProduct.id},{
    $set:{
      nombreProducto: nProduct.nombreProducto,
      idProveedor: nProduct.idProveedor,
      idCategoria: nProduct.idCategoria,
      cantidadPorUnidad: nProduct.cantidadPorUnidad,
      precioUnidad: nProduct.precioUnidad,
      unidadesEnExistencia: nProduct.unidadesEnExistencia,
      unidadesEnPedido: nProduct.unidadesEnPedido,
      nivelNuevoPedido: nProduct.nivelNuevoPedido,
      suspendido: nProduct.suspendido,
      categoriaProducto: nProduct.categoriaProducto
    },
  })
}

exports.getProducts = getProducts;
exports.insertProduct = insertProduct;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
