import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Receita } from '../entity/Receita'

//retorna receita
export const get_receita = async(req: Request, res: Response) => {
  try{
      const receita = await getRepository(Receita).find();
      
      return res.json(receita);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao peagr receita' })
  }
}

//add receita
export const add_receita = async (req: Request, res: Response) => {
  const { valor } = req.body;

  try {
    
    const receita = await getRepository(Receita).save({
      valor
    });

    const receita_get = await getRepository(Receita).find();

    return res.json(receita_get);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao add receita' })
  }
}

//del receita
export const del_receita = async (req: Request, res: Response) => {
  try {
    
    await getRepository(Receita).query(`
      DELETE FROM "receita"
    `);
    await getRepository(Receita).query(`
      DELETE FROM "produto"
    `);
    await getRepository(Receita).query(`
      DELETE FROM "contas"
    `);
    await getRepository(Receita).query(`
      DELETE FROM "fornecedor"
    `);
    await getRepository(Receita).query(`
      DELETE FROM "categoria"
    `);

    const receita = await getRepository(Receita).find();

    return res.json(receita);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao del receita' })
  }
}