import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1711402705644 implements MigrationInterface {
    name = 'CreateTables1711402705644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "cep" character varying NOT NULL, "endereco" character varying NOT NULL, "numero" character varying NOT NULL, "complemento" character varying, "bairro" character varying NOT NULL, "estado" character varying NOT NULL, "cidade" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "sexo" character varying NOT NULL, "dataNascimento" date NOT NULL, "estadoCivil" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
