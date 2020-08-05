import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne} from "typeorm";

import { Produto } from '../entity/Produto';
import { Fornecedor } from '../entity/Fornecedor';


@Entity('categoria')
export class Categoria {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  nome: string;
 
  @OneToMany(type => Produto, produto => produto.categoria)
  produtos: Produto[];

  @OneToOne(type => Fornecedor, fornecedor => fornecedor.categoria)
  fornecedor: Fornecedor;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}