'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class compra extends Model {
    
    static associate(models) {
      
      compra.belongsTo(models.Cliente, 
        {foreignKey: 'ClienteId', as: 'compras_cliente'})
      compra.belongsToMany(models.produto,
        {forengkey: 'ProdutiId', through: 'itemCompra'})
      compra.hasMany(models.itemCompra,
        {forengkey: 'CompraId', as: 'compra_itemcompra'})
       
    }
  };
  compra.init({
    data: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'compra',
  });
  return compra;
};