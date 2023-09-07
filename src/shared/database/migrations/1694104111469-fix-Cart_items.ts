import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCartItems1694104111469 implements MigrationInterface {
    name = 'fixCartItems1694104111469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "quantity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "product_id" uuid`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_30e89257a105eab7648a35c7fce" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_30e89257a105eab7648a35c7fce"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "status" character varying NOT NULL DEFAULT 'PROCESSING'`);
    }

}
