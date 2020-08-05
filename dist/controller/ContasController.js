"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_sum_contas = exports.pagar_conta = exports.get_conta = void 0;

var _typeorm = require("typeorm");

var _Contas = require("../entity/Contas");

var _Receita = require("../entity/Receita");

//retorna conta
const get_conta = async (req, res) => {
  try {
    const contas = await (0, _typeorm.getRepository)(_Contas.Contas).find({
      relations: ['fornecedor']
    });
    return res.json(contas);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao pegar contas'
    });
  }
}; //pagar conta


exports.get_conta = get_conta;

const pagar_conta = async (req, res) => {
  const {
    valor
  } = req.body;
  const id = req.params.id;

  try {
    const conta_fornecerdor = await (0, _typeorm.getRepository)(_Contas.Contas).query(`
      SELECT id, valor, "fornecedorId" FROM public.contas WHERE "id"='${id}'
    `);
    let conta_fornecedor_up = +conta_fornecerdor[0].valor - +valor;
    await (0, _typeorm.getRepository)(_Contas.Contas).query(`
        UPDATE "contas" SET valor=${conta_fornecedor_up} WHERE "id"='${id}';
    `);
    const receita_add = await (0, _typeorm.getRepository)(_Receita.Receita).find({
      select: ['valor']
    });
    console.log(receita_add);
    let receita_add_final = +receita_add[0].valor - +valor;
    console.log(receita_add_final);
    await (0, _typeorm.getRepository)(_Receita.Receita).query(`
        UPDATE "receita" SET valor=${receita_add_final};
    `);
    const contas = await (0, _typeorm.getRepository)(_Contas.Contas).find();
    console.log(contas);
    return res.json(contas);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao pegar contas'
    });
  }
};

exports.pagar_conta = pagar_conta;

const get_sum_contas = async (req, res) => {
  try {
    const receita_sum = await (0, _typeorm.getRepository)(_Contas.Contas).query(`
      SELECT SUM(valor) FROM contas;
    `);
    return res.json(receita_sum);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao pegar soma das contas'
    });
  }
};

exports.get_sum_contas = get_sum_contas;