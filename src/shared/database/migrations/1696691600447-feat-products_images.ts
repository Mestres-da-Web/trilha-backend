import {MigrationInterface, QueryRunner} from "typeorm";

export class featProductsImages1696691600447 implements MigrationInterface {
    name = 'featProductsImages1696691600447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "images" character varying array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "images"`);
    }

}
