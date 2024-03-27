import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPrimaryGeneratedColumn1711422177088 implements MigrationInterface {
    name = 'AlterPrimaryGeneratedColumn1711422177088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
