import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Produto } from '../entity/Produto';
import { Receita } from '../entity/Receita';
import { Contas } from '../entity/Contas';

//add usuario no banco pelo sistema
export const add_produto = async(req: Request, res: Response) => {
    const { nome, preco, categoriaId, fornecedorId } = req.body;

    try {
        const produto = await getRepository(Produto).query(`
            INSERT INTO "produto"("nome", "preco", "categoriaId", "fornecedorId") VALUES ('${nome}', '${preco}', '${categoriaId}', '${fornecedorId}')  RETURNING "id", "nome", "preco", "categoriaId", "createdAt", "updatedAt"
        `);
        
        const conta_fornecerdor = await getRepository(Contas).query(`
            SELECT id, valor, "fornecedorId" FROM public.contas WHERE "fornecedorId"='${fornecedorId}'
        `);
        let conta_fornecedor_up = +conta_fornecerdor[0].valor + +preco;

        await getRepository(Contas).query(`
            UPDATE "contas" SET valor=${conta_fornecedor_up} WHERE "fornecedorId"='${fornecedorId}';
        `);

        const receita_add = await getRepository(Receita).find({
            select: ['valor']
        });

        let receita_add_final = +receita_add[0].valor + +preco;

        await getRepository(Receita).query(`
            UPDATE "receita" SET valor=${receita_add_final};
        `);

        const produtos = await getRepository(Produto).find({
            relations: ['categoria', 'fornecedor']
        });

        return res.json(produtos);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao add' })
    }
}

//deletar um produto no banco
export const del_produto = async(req: Request, res: Response) => {
    const id  = req.params.id;

    try {
        const resultado = await getRepository(Produto).delete(id);

        if (resultado.affected === 0) {
            return res.status(404).json({ message: 'erro ao deletar' })
        }
        console.log('sucesso ao deletar')

        const produtos = await getRepository(Produto).find({
            relations: ['categoria', 'fornecedor']
        });

        return res.json(produtos);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao deletar' })
    }
}

//edita um usuario no banco
export const edit_produto = async(req: Request, res: Response) => {
    const id  = req.params.id;

    try{
        const resultado = await getRepository(Produto).update(id, req.body);

        if(resultado.affected === 0){
            return res.status(404).json({message: 'erro update'})
        }
        console.log('sucesso ao editar')

        const produtos = await getRepository(Produto).find({
            relations: ['categoria', 'fornecedor']
        });

        return res.json(produtos);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao update' })
    }
}

//retorna todos os produtos
export const get_produtos = async(req: Request, res: Response) => {
    try{
        const produtos = await getRepository(Produto).find({
            relations: ['categoria', 'fornecedor']
        });
        
        return res.json(produtos);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao peagr todos os produtos' })
    }
}

//retorna um produto
export const get_produto_id = async (req: Request, res: Response) => {
    const id  = req.params.id;

    try {
        const produto = await getRepository(Produto).findOne({
            where: {
                id
            },
            relations: ['categoria', 'fornecedor']
        });
        
        return res.json(produto);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao pegar um produto' })
    }
}

export const comprar_produto = async(req: Request, res: Response) => {
    const { valor } = req.body;
    let id = valor;

    try {
        const produto_del = await getRepository(Produto).findOne({
            where: {
                id
            },
            relations: ['categoria', 'fornecedor']
        });

        await getRepository(Produto).delete(id);
        
        const receita_add = await getRepository(Receita).find({
            select: ['valor']
        });

        let receita_add_final = +receita_add[0].valor + +produto_del.preco;

        await getRepository(Receita).query(`
            UPDATE "receita" SET valor=${receita_add_final};
        `);

        return res.json(produto_del);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao add' })
    }
}

//retorna todos os produtos
export const get_qtd_produtos = async(req: Request, res: Response) => {
    try {
        const soma_estoque_valor = await getRepository(Produto).query(`
            SELECT SUM(preco) FROM produto;
        `);
        
        let aux_soma = soma_estoque_valor;
        console.log(soma_estoque_valor[0].sum)

        if (soma_estoque_valor[0].sum === 'null') {
            aux_soma = 0;
        }
        
        const qtd_estoque = await getRepository(Produto).query(`
            SELECT COUNT(id) FROM produto;
        `);

        let aux_1 = {
            soma_valor_prod: +soma_estoque_valor[0].sum,
            qtd_prod: +qtd_estoque[0].count
        }
        console.log(aux_1)

        return res.json(aux_1);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao peagr todos os produtos' })
    }
}