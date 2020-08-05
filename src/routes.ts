import { Router, Request, Response } from 'express';

import { get_produto_id, get_qtd_produtos, comprar_produto, get_produtos, add_produto, del_produto, edit_produto } from './controller/ProdutoController';
import { get_categoria_id, get_categorias, add_categoria, del_categoria, edit_categoria } from './controller/CategoriaController';
import { get_fornecedor_id, get_fornecedores, add_fornecedor, del_fornecedor, edit_fornecedor } from './controller/FornecedorController';
import { get_receita, add_receita, del_receita } from './controller/ReceitaController';
import { get_conta, pagar_conta, get_sum_contas } from './controller/ContasController'

import cors from 'cors'

const routes = Router();

routes.use(cors());

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: "PRONTO CARALHOOOOO !" })
});

//PRODUTOS
routes.get('/get_produtos', get_produtos); //feito
routes.get('/get_produto_id/:id', get_produto_id); //feito
routes.post('/add_produto', add_produto); //feito
routes.delete('/del_produto/:id', del_produto); //feito
routes.put('/edit_produto/:id', edit_produto); //feito
routes.post('/comprar_produto', comprar_produto); //feito
routes.get('/get_qtd_produtos', get_qtd_produtos); //feito

//CATEGORIAS
routes.get('/get_categorias', get_categorias); //feito
routes.get('/get_categoria_id/:id', get_categoria_id); //feito
routes.post('/add_categoria', add_categoria); //feito
routes.delete('/del_categoria/:id', del_categoria); //feito
routes.put('/edit_categoria/:id', edit_categoria); //feito

//FORNECEDORES
routes.get('/get_fornecedores', get_fornecedores); //feito
routes.get('/get_fornecedor_id/:id', get_fornecedor_id); //feito
routes.post('/add_fornecedor', add_fornecedor); //feito
routes.delete('/del_fornecedor/:id', del_fornecedor); //feito
routes.put('/edit_fornecedor/:id', edit_fornecedor); //feito

//RECEITA
routes.get('/get_receita', get_receita); //feito
routes.post('/add_receita', add_receita); //feito
routes.delete('/del_receita', del_receita); //feito

//CONTAS
routes.get('/get_conta', get_conta); //feito
routes.get('/get_sum_contas', get_sum_contas); //feito
routes.put('/pagar_conta/:id', pagar_conta); //feito


export default routes;