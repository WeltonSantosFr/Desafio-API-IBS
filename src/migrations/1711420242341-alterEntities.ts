import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEntities1711420242341 implements MigrationInterface {
    name = 'AlterEntities1711420242341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "endereco"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "numero"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "complemento"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "bairro"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "cidade"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sexo"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "dataNascimento"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "estadoCivil"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "complement" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "district" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "birthDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "maritalStatus" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "maritalStatus"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "complement"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "estadoCivil" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "dataNascimento" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "sexo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "nome" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "cidade" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "estado" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "bairro" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "complemento" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "numero" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "endereco" character varying NOT NULL`);
    }

}
