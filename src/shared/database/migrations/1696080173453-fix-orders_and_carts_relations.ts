import {MigrationInterface, QueryRunner} from "typeorm";

export class fixOrdersAndCartsRelations1696080173453 implements MigrationInterface {
    name = 'fixOrdersAndCartsRelations1696080173453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_f42b1d95404c45b10bf2451d814"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d39c53244703b8534307adcd073"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_ace88a18b5f57ade458db9061d2"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "cart_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_f42b1d95404c45b10bf2451d814" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d39c53244703b8534307adcd073" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_ace88a18b5f57ade458db9061d2" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_ace88a18b5f57ade458db9061d2"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d39c53244703b8534307adcd073"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_f42b1d95404c45b10bf2451d814"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "cart_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_ace88a18b5f57ade458db9061d2" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d39c53244703b8534307adcd073" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_f42b1d95404c45b10bf2451d814" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
