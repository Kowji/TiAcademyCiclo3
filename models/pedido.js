'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
   
    static associate(models) {
      
      Pedido.belongsTo(models.Cliente, {
        foreignKey: 'ClienteId', as: 'clientes'});
      Pedido.belongsToMany(models.Servico, {
        foreignKey: 'PedidoId', through: 'ItemPedido', as: 'servicos_ped'
      });
      Pedido.hasMany(models.ItemPedido, 
        {foreignKey: 'PedidoId', as: 'item_pedido'})
    }
  };
  Pedido.init({
    data: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};