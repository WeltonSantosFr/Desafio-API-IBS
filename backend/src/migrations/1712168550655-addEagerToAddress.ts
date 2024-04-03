import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEagerToAddress1712168550655 implements MigrationInterface {
    name = 'AddEagerToAddress1712168550655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "user" character varying(50)`);
    }

}
