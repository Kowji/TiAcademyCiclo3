'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produto extends Model {
  
    static associate(models) {
    
      produto.belongsToMany(models.compra, {
       foreignKey: 'CompraId', through: 'itemCompra', as: 'prod'
      });
      produto.hasMany(models.itemCompra,
        {
        foreignKey: 'ProdutoId', as: 'item_pro'
      });
    }
  };
  produto.init({
  nome: DataTypes.STRING,
  descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'produto',
  });
  return produto;
};