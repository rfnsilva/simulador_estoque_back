"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_qtd_produtos = exports.comprar_produto = exports.get_produto_id = exports.get_produtos = exports.edit_produto = exports.del_produto = exports.add_produto = void 0;

var _typeorm = require("typeorm");

var _Produto = require("../entity/Produto");

var _Receita = require("../entity/Receita");

var _Contas = require("../entity/Contas");

//add usuario no banco pelo sistema
const add_produto = async (req, res) => {
  const {
    nome,
    preco,
    categoriaId,
    fornecedorId
  } = req.body;

  try {
    const produto = await (0, _typeorm.getRepository)(_Produto.Produto).query(`
            INSERT INTO "produto"("nome", "preco", "categoriaId", "fornecedorId") VALUES ('${nome}', '${preco}', '${categoriaId}', '${fornecedorId}')  RETURNING "id", "nome", "preco", "categoriaId", "createdAt", "updatedAt"
        `);
    const conta_fornecerdor = await (0, _typeorm.getRepository)(_Contas.Contas).query(`
            SELECT id, valor, "fornecedorId" FROM public.contas WHERE "fornecedorId"='${fornecedorId}'
        `);
    let conta_fornecedor_up = +conta_fornecerdor[0].valor + +preco;
    await (0, _typeorm.getRepository)(_Contas.Contas).query(`
            UPDATE "contas" SET valor=${conta_fornecedor_up} WHERE "fornecedorId"='${fornecedorId}';
        `);
    const receita_add = await (0, _typeorm.getRepository)(_Receita.Receita).find({
      select: ['valor']
    });
    let receita_add_final = +receita_add[0].valor + +preco;
    await (0, _typeorm.getRepository)(_Receita.Receita).query(`
            UPDATE "receita" SET valor=${receita_add_final};
        `);
    const produtos = await (0, _typeorm.getRepository)(_Produto.Produto).find({
      relations: ['categoria', 'fornecedor']
    });
    return res.json(produtos);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao add'
    });
  }
}; //deletar um produto no banco


exports.add_produto = add_produto;

const del_produto = async (req, res) => {
  const id = req.params.id;

  try {
    const resultado = await (0, _typeorm.getRepository)(_Produto.Produto).delete(id);

    if (resultado.affected === 0) {
      return res.status(404).json({
        message: 'erro ao deletar'
      });
    }

    console.log('sucesso ao deletar');
    const produtos = await (0, _typeorm.getRepository)(_Produto.Produto).find({
      relations: ['categoria', 'fornecedor']
    });
    return res.json(produtos);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao deletar'
    });
  }
}; //edita um usuario no banco


exports.del_produto = del_produto;

const edit_produto = async (req, res) => {
  const id = req.params.id;

  try {
    const resultado = await (0, _typeorm.getRepository)(_Produto.Produto).update(id, req.body);

    if (resultado.affected === 0) {
      return res.status(404).json({
        message: 'erro update'
      });
    }

    console.log('sucesso ao editar');
    const produtos = await (0, _typeorm.getRepository)(_Produto.Produto).find({
      relations: ['categoria', 'fornecedor']
    });
    return res.json(produtos);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao update'
    });
  }
}; //retorna todos os produtos


exports.edit_produto = edit_produto;

const get_produtos = async (req, res) => {
  try {
    const produtos = await (0, _typeorm.getRepository)(_Produto.Produto).find({
      relations: ['categoria', 'fornecedor']
    });
    return res.json(produtos);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao peagr todos os produtos'
    });
  }
}; //retorna um produto


exports.get_produtos = get_produtos;

const get_produto_id = async (req, res) => {
  const id = req.params.id;

  try {
    const produto = await (0, _typeorm.getRepository)(_Produto.Produto).findOne({
      where: {
        id
      },
      relations: ['categoria', 'fornecedor']
    });
    return res.json(produto);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao pegar um produto'
    });
  }
};

exports.get_produto_id = get_produto_id;

const comprar_produto = async (req, res) => {
  const {
    valor
  } = req.body;
  let id = valor;

  try {
    const produto_del = await (0, _typeorm.getRepository)(_Produto.Produto).findOne({
      where: {
        id
      },
      relations: ['categoria', 'fornecedor']
    });
    await (0, _typeorm.getRepository)(_Produto.Produto).delete(id);
    const receita_add = await (0, _typeorm.getRepository)(_Receita.Receita).find({
      select: ['valor']
    });
    let receita_add_final = +receita_add[0].valor + +produto_del.preco;
    await (0, _typeorm.getRepository)(_Receita.Receita).query(`
            UPDATE "receita" SET valor=${receita_add_final};
        `);
    return res.json(produto_del);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao add'
    });
  }
}; //retorna todos os produtos


exports.comprar_produto = comprar_produto;

const get_qtd_produtos = async (req, res) => {
  try {
    const soma_estoque_valor = await (0, _typeorm.getRepository)(_Produto.Produto).query(`
            SELECT SUM(preco) FROM produto;
        `);
    let aux_soma = soma_estoque_valor;
    console.log(soma_estoque_valor[0].sum);

    if (soma_estoque_valor[0].sum === 'null') {
      aux_soma = 0;
    }

    const qtd_estoque = await (0, _typeorm.getRepository)(_Produto.Produto).query(`
            SELECT COUNT(id) FROM produto;
        `);
    let aux_1 = {
      soma_valor_prod: +soma_estoque_valor[0].sum,
      qtd_prod: +qtd_estoque[0].count
    };
    console.log(aux_1);
    return res.json(aux_1);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao peagr todos os produtos'
    });
  }
};

exports.get_qtd_produtos = get_qtd_produtos;