'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class itemCompra extends Model {
    
    static associate(models) {
      
      itemCompra.belongsTo(models.compra, 
        {foreignKey: 'CompraId', as: 'compras_'})
       
      itemCompra.belongsTo(models.produto, 
        {foreignKey: 'ProdutoId', as: 'produto_'})
    }    
  }
  itemCompra.init({
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'itemCompra',
  });
  return itemCompra;
};