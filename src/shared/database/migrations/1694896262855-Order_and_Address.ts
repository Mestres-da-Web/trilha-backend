import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderAndAddress1694896262855 implements MigrationInterface {
    name = 'OrderAndAddress1694896262855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" RENAME COLUMN "status" TO "order_id"`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL DEFAULT 'PROCESSING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "cart_id" uuid, "address_id" uuid, CONSTRAINT "REL_f42b1d95404c45b10bf2451d81" UNIQUE ("cart_id"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zip_code" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "neighborhood" character varying NOT NULL, "complement" character varying NOT NULL, "number" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "order_id" uuid`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "UQ_ace88a18b5f57ade458db9061d2" UNIQUE ("order_id")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_f42b1d95404c45b10bf2451d814" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d39c53244703b8534307adcd073" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_ace88a18b5f57ade458db9061d2" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_ace88a18b5f57ade458db9061d2"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d39c53244703b8534307adcd073"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_f42b1d95404c45b10bf2451d814"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "UQ_ace88a18b5f57ade458db9061d2"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "order_id" character varying NOT NULL DEFAULT 'PROCESSING'`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`ALTER TABLE "carts" RENAME COLUMN "order_id" TO "status"`);
    }

}
