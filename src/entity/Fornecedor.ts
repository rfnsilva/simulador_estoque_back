import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";

import { Categoria } from '../entity/Categoria';
import { Produto } from '../entity/Produto';
import { Contas } from '../entity/Contas';

@Entity('fornecedor')
export class Fornecedor {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  nome: string;

  @OneToOne(type => Categoria, categoria => categoria.fornecedor)
  @JoinColumn()
  categoria: Categoria;

  @OneToMany(type => Produto, produto => produto.fornecedor)
  produtos: Produto[];

  @OneToOne(type => Contas, contas => contas.fornecedor)
  conta: Contas;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}