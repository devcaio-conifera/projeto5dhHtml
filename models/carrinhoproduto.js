'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarrinhoProduto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  CarrinhoProduto.init({
    ProdutoId: DataTypes.INTEGER,
    CarrinhoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CarrinhoProduto',
  });
  return CarrinhoProduto;
};