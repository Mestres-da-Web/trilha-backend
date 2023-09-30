import {MigrationInterface, QueryRunner} from "typeorm";

export class featProductsStock1696080425660 implements MigrationInterface {
    name = 'featProductsStock1696080425660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "stock" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "stock"`);
    }

}
