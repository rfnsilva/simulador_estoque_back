import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn} from "typeorm";

import { Fornecedor } from '../entity/Fornecedor';

@Entity('contas')
export class Contas {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("integer")
  valor: number;
  
  @OneToOne(type => Fornecedor, fornecedor => fornecedor.conta)
  @JoinColumn()
  fornecedor: Fornecedor;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
   
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}