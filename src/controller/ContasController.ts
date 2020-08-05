import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Contas } from '../entity/Contas';
import { Receita } from '../entity/Receita';

//retorna conta
export const get_conta = async(req: Request, res: Response) => {
  try{
    const contas = await getRepository(Contas).find({
      relations: ['fornecedor']
    });
      
    return res.json(contas);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao pegar contas' })
  }
}

//pagar conta
export const pagar_conta = async (req: Request, res: Response) => {
  const { valor } = req.body;
  const id = req.params.id;

  try {
    
    const conta_fornecerdor = await getRepository(Contas).query(`
      SELECT id, valor, "fornecedorId" FROM public.contas WHERE "id"='${id}'
    `);
    let conta_fornecedor_up = +conta_fornecerdor[0].valor - +valor;

    await getRepository(Contas).query(`
        UPDATE "contas" SET valor=${conta_fornecedor_up} WHERE "id"='${id}';
    `);

    const receita_add = await getRepository(Receita).find({
      select: ['valor']
    });

    console.log(receita_add)
    let receita_add_final = +receita_add[0].valor - +valor;
    console.log(receita_add_final)
    await getRepository(Receita).query(`
        UPDATE "receita" SET valor=${receita_add_final};
    `);

    const contas = await getRepository(Contas).find();
    console.log(contas)

    return res.json(contas);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao pegar contas' })
  }
}

export const get_sum_contas = async(req: Request, res: Response) => {
  try{
    const receita_sum = await getRepository(Contas).query(`
      SELECT SUM(valor) FROM contas;
    `);
      
    return res.json(receita_sum);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao pegar soma das contas' })
  }
}