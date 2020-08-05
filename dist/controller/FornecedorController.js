"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_fornecedor_id = exports.get_fornecedores = exports.edit_fornecedor = exports.del_fornecedor = exports.add_fornecedor = void 0;

var _typeorm = require("typeorm");

var _Fornecedor = require("../entity/Fornecedor");

var _Contas = require("../entity/Contas");

//add usuario no banco pelo sistema
const add_fornecedor = async (req, res) => {
  const {
    nome,
    categoriaId
  } = req.body;

  try {
    const fornecedor = await (0, _typeorm.getRepository)(_Fornecedor.Fornecedor).query(`
            INSERT INTO "fornecedor"("nome", "categoriaId") VALUES ('${nome}', '${categoriaId}')  RETURNING "id", "nome", "categoriaId", "createdAt", "updatedAt"
        `);
    let v = 0;
    let f = fornecedor[0].id;
    await (0, _typeorm.getRepository)(_Contas.Contas).query(`
            INSERT INTO "contas"("valor", "fornecedorId") VALUES ('${v}', '${f}')  RETURNING "id", "valor", "fornecedorId", "createdAt", "updatedAt"
        `);
    const fornecedores = await (0, _typeorm.getRepository)(_Fornecedor.Fornecedor).find({
      relations: ['produtos', 'categoria', 'conta']
    });
    return res.json(fornecedores);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao add'
    });
  }
}; //deletar um produto no banco


exports.add_fornecedor = add_fornecedor;

const del_fornecedor = async (req, res) => {
  const id = req.params.id;

  try {
    const resultado = await (0, _typeorm.getRepository)(_Fornecedor.Fornecedor).delete(id);

    if (resultado.affected === 0) {
      console.log('sucesso ao deletar');
      return res.status(404).json({
        message: 'erro ao deletar'
      });
    }

    console.log('sucesso ao deletar');
    const fornecedor = await (0, _typeorm.getRepository)(_Fornecedor.Fornecedor).find({
      relations: ['produtos', 'categoria']
    });
    return res.json(fornecedor);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao deletar'
    });
  }
}; //edita um usuario no banco


exports.del_fornecedor = del_fornecedor;

const edit_fornecedor = async (req, res) => {
  const id = req.params.id;

  try {
    const resultado = await (0, _typeorm.getRepository)(_Fornecedor.Fornecedor).update(id, req.body);

    if (resultado.affected === 0) {
      return res.status(404).json({
        message: 'erro update'
      });
    }

    console.log('sucesso ao editar');
    const fornecedor = await (0, _typeorm.getRepository)(_Fornecedor.Fornecedor).find({
      relations: ['produtos', 'categoria']
    });
    return res.json(fornecedor);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao update'
    });
  }
}; //retorna todos os produtos


exports.edit_fornecedor = edit_fornecedor;

const get_fornecedores = async (req, res) => {
  try {
    const fornecedores = await (0, _typeorm.getRepository)(_Fornecedor.Fornecedor).find({
      relations: ['categoria', 'produtos']
    });
    return res.json(fornecedores);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao peagr todos os fornecedores'
    });
  }
}; //retorna um produto


exports.get_fornecedores = get_fornecedores;

const get_fornecedor_id = async (req, res) => {
  const id = req.params.id;

  try {
    const fornecedor = await (0, _typeorm.getRepository)(_Fornecedor.Fornecedor).findOne({
      where: {
        id
      },
      relations: ['categoria', 'produtos']
    });
    return res.json(fornecedor);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao pegar um fornecedor'
    });
  }
};

exports.get_fornecedor_id = get_fornecedor_id;