"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.del_receita = exports.add_receita = exports.get_receita = void 0;

var _typeorm = require("typeorm");

var _Receita = require("../entity/Receita");

//retorna receita
const get_receita = async (req, res) => {
  try {
    const receita = await (0, _typeorm.getRepository)(_Receita.Receita).find();
    return res.json(receita);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao peagr receita'
    });
  }
}; //add receita


exports.get_receita = get_receita;

const add_receita = async (req, res) => {
  const {
    valor
  } = req.body;

  try {
    const receita = await (0, _typeorm.getRepository)(_Receita.Receita).save({
      valor
    });
    const receita_get = await (0, _typeorm.getRepository)(_Receita.Receita).find();
    return res.json(receita_get);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao add receita'
    });
  }
}; //del receita


exports.add_receita = add_receita;

const del_receita = async (req, res) => {
  try {
    await (0, _typeorm.getRepository)(_Receita.Receita).query(`
      DELETE FROM "receita"
    `);
    await (0, _typeorm.getRepository)(_Receita.Receita).query(`
      DELETE FROM "produto"
    `);
    await (0, _typeorm.getRepository)(_Receita.Receita).query(`
      DELETE FROM "contas"
    `);
    await (0, _typeorm.getRepository)(_Receita.Receita).query(`
      DELETE FROM "fornecedor"
    `);
    await (0, _typeorm.getRepository)(_Receita.Receita).query(`
      DELETE FROM "categoria"
    `);
    const receita = await (0, _typeorm.getRepository)(_Receita.Receita).find();
    return res.json(receita);
  } catch (error) {
    return res.status(404).json({
      message: 'erro ao del receita'
    });
  }
};

exports.del_receita = del_receita;