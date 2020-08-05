"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_categoria_id = exports.get_categorias = exports.edit_categoria = exports.del_categoria = exports.add_categoria = void 0;

var _typeorm = require("typeorm");

var _Categoria = require("../entity/Categoria");

//add usuario no banco pelo sistema
const add_categoria = async (req, res) => {
  const {
    nome
  } = req.body;

  try {
    const categoria = await (0, _typeorm.getRepository)(_Categoria.Categoria).save({
      nome
    });
    const categorias = await (0, _typeorm.getRepository)(_Categoria.Categoria).find({
      relations: ['produtos', 'fornecedor']
    });
    return res.json(categorias);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao add'
    });
  }
}; //deletar um produto no banco


exports.add_categoria = add_categoria;

const del_categoria = async (req, res) => {
  const id = req.params.id;

  try {
    const resultado = await (0, _typeorm.getRepository)(_Categoria.Categoria).delete(id);

    if (resultado.affected === 0) {
      return res.status(404).json({
        message: 'erro ao deletar'
      });
    }

    console.log('sucesso ao deletar');
    const categorias = await (0, _typeorm.getRepository)(_Categoria.Categoria).find({
      relations: ['produtos', 'fornecedor']
    });
    return res.json(categorias);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao deletar'
    });
  }
}; //edita um usuario no banco


exports.del_categoria = del_categoria;

const edit_categoria = async (req, res) => {
  const id = req.params.id;

  try {
    const resultado = await (0, _typeorm.getRepository)(_Categoria.Categoria).update(id, req.body);

    if (resultado.affected === 0) {
      return res.status(404).json({
        message: 'erro update'
      });
    }

    console.log('sucesso ao editar');
    const categorias = await (0, _typeorm.getRepository)(_Categoria.Categoria).find({
      relations: ['produtos', 'fornecedor']
    });
    return res.json(categorias);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao update'
    });
  }
}; //retorna todos os produtos


exports.edit_categoria = edit_categoria;

const get_categorias = async (req, res) => {
  try {
    const categorias = await (0, _typeorm.getRepository)(_Categoria.Categoria).find({
      relations: ['produtos']
    });
    return res.json(categorias);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao peagr todos as categorias'
    });
  }
}; //retorna um produto


exports.get_categorias = get_categorias;

const get_categoria_id = async (req, res) => {
  const id = req.params.id;

  try {
    const categoria = await (0, _typeorm.getRepository)(_Categoria.Categoria).findOne({
      where: {
        id
      },
      relations: ['produtos', 'fornecedor']
    });
    return res.json(categoria);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao pegar uma categoria'
    });
  }
};

exports.get_categoria_id = get_categoria_id;