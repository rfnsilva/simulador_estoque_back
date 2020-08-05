import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1596601296493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `CREATE TABLE "receita" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "valor" integer NOT NULL,
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_23451caefbb11b5a2fa29s96828" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(
            `CREATE TABLE "contas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "valor" integer NOT NULL,
            "fornecedorId" uuid NOT NULL,
            CONSTRAINT "REL_0b349f6b8ca7f05eed39ffb956" UNIQUE ("fornecedorId"),
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_23451caefbb11b5a2fa92s96828" PRIMARY KEY ("id"))`,
        );
        
        await queryRunner.query(
          `CREATE TABLE "categoria" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "nome" character varying(100) NOT NULL,
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_234512aefv3d1a5b2fa92696828" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(
          `CREATE TABLE "fornecedor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "nome" character varying(100) NOT NULL,
          "categoriaId" uuid,
          CONSTRAINT "REL_0b349f6b8ca70f5eed39ffb956" UNIQUE ("categoriaId"),
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_23451caefbb11a5b2fa92s96828" PRIMARY KEY ("id"))`,
        );

        await queryRunner.query(
          `CREATE TABLE "produto" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "nome" character varying(100) NOT NULL,
          "preco" integer NOT NULL,
          "categoriaId" uuid,
          CONSTRAINT "REL_5b349f6b8ca7f50kkd39ffb956" UNIQUE ("categoriaId"),
          "fornecedorId" uuid,
          CONSTRAINT "REL_0b349f68bca7f05fed33ffb956" UNIQUE ("fornecedorId"),
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_23451caefbb11a5ddfa92s96828" PRIMARY KEY ("id"))`,
        );


        await queryRunner.query(
            `ALTER TABLE "produto" ADD CONSTRAINT "FK_2652456e912c983cde73d3281db" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

        await queryRunner.query(
            `ALTER TABLE "produto" ADD CONSTRAINT "FK_6252456e912c983cde73d3281db" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );



    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}