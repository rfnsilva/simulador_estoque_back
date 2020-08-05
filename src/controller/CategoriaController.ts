import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Categoria } from '../entity/Categoria'

//add usuario no banco pelo sistema
export const add_categoria = async(req: Request, res: Response) => {
    const { nome } = req.body;

    try {
        const categoria = await getRepository(Categoria).save({
            nome
        });

        const categorias = await getRepository(Categoria).find({
            relations: ['produtos', 'fornecedor']
        });

        return res.json(categorias);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao add' })
    }
}

//deletar um produto no banco
export const del_categoria = async(req: Request, res: Response) => {
    const id  = req.params.id;

    try {
        const resultado = await getRepository(Categoria).delete(id);

        if (resultado.affected === 0) {
            return res.status(404).json({ message: 'erro ao deletar' })
        }
        console.log('sucesso ao deletar')

        const categorias = await getRepository(Categoria).find({
            relations: ['produtos', 'fornecedor']
        });

        return res.json(categorias);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao deletar' })
    }
}

//edita um usuario no banco
export const edit_categoria = async(req: Request, res: Response) => {
    const id = req.params.id;

    try{
        const resultado = await getRepository(Categoria).update(id, req.body);

        if(resultado.affected === 0){
            return res.status(404).json({message: 'erro update'})
        }
        console.log('sucesso ao editar')

        const categorias = await getRepository(Categoria).find({
            relations: ['produtos', 'fornecedor']
        });

        return res.json(categorias);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao update' })
    }
}

//retorna todos os produtos
export const get_categorias = async(req: Request, res: Response) => {
    try{
        const categorias = await getRepository(Categoria).find({
            relations: ['produtos']
        });
        
        return res.json(categorias);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao peagr todos as categorias' })
    }
}

//retorna um produto
export const get_categoria_id = async (req: Request, res: Response) => {
    const id  = req.params.id;

    try {
        const categoria = await getRepository(Categoria).findOne({
            where: {
                id
            },
            relations: ['produtos', 'fornecedor']
        });
        
        return res.json(categoria);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao pegar uma categoria' })
    }
}