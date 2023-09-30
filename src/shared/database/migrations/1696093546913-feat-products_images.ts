import {MigrationInterface, QueryRunner} from "typeorm";

export class featProductsImages1696093546913 implements MigrationInterface {
    name = 'featProductsImages1696093546913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "images" character varying array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "images"`);
    }

}
