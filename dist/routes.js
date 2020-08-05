"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ProdutoController = require("./controller/ProdutoController");

var _CategoriaController = require("./controller/CategoriaController");

var _FornecedorController = require("./controller/FornecedorController");

var _ReceitaController = require("./controller/ReceitaController");

var _ContasController = require("./controller/ContasController");

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use((0, _cors.default)());
routes.get('/', (request, response) => {
  return response.json({
    message: "PRONTO CARALHOOOOO !"
  });
}); //PRODUTOS

routes.get('/get_produtos', _ProdutoController.get_produtos); //feito

routes.get('/get_produto_id/:id', _ProdutoController.get_produto_id); //feito

routes.post('/add_produto', _ProdutoController.add_produto); //feito

routes.delete('/del_produto/:id', _ProdutoController.del_produto); //feito

routes.put('/edit_produto/:id', _ProdutoController.edit_produto); //feito

routes.post('/comprar_produto', _ProdutoController.comprar_produto); //feito

routes.get('/get_qtd_produtos', _ProdutoController.get_qtd_produtos); //feito
//CATEGORIAS

routes.get('/get_categorias', _CategoriaController.get_categorias); //feito

routes.get('/get_categoria_id/:id', _CategoriaController.get_categoria_id); //feito

routes.post('/add_categoria', _CategoriaController.add_categoria); //feito

routes.delete('/del_categoria/:id', _CategoriaController.del_categoria); //feito

routes.put('/edit_categoria/:id', _CategoriaController.edit_categoria); //feito
//FORNECEDORES

routes.get('/get_fornecedores', _FornecedorController.get_fornecedores); //feito

routes.get('/get_fornecedor_id/:id', _FornecedorController.get_fornecedor_id); //feito

routes.post('/add_fornecedor', _FornecedorController.add_fornecedor); //feito

routes.delete('/del_fornecedor/:id', _FornecedorController.del_fornecedor); //feito

routes.put('/edit_fornecedor/:id', _FornecedorController.edit_fornecedor); //feito
//RECEITA

routes.get('/get_receita', _ReceitaController.get_receita); //feito

routes.post('/add_receita', _ReceitaController.add_receita); //feito

routes.delete('/del_receita', _ReceitaController.del_receita); //feito
//CONTAS

routes.get('/get_conta', _ContasController.get_conta); //feito

routes.get('/get_sum_contas', _ContasController.get_sum_contas); //feito

routes.put('/pagar_conta/:id', _ContasController.pagar_conta); //feito

var _default = routes;
exports.default = _default;