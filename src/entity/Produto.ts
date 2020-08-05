import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";

import { Categoria } from '../entity/Categoria';
import { Fornecedor } from '../entity/Fornecedor';

@Entity('produto')
export class Produto {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  nome: string;

  @Column("integer")
  preco: number;

  @ManyToOne(type => Categoria, Categoria => Categoria.produtos)
  categoria: Categoria;

  @ManyToOne(type => Fornecedor, Fornecedor => Fornecedor.produtos)
  fornecedor: Fornecedor;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}