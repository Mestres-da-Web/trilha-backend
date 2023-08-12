import {MigrationInterface, QueryRunner} from "typeorm";

export class Specifications1691250014382 implements MigrationInterface {
    name = 'Specifications1691250014382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "specifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_621aabf71e640ab86f0e8b62a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD "specification_id" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_243857ac64d1ae9d750dbcc7f30" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_243857ac64d1ae9d750dbcc7f30"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "specification_id"`);
        await queryRunner.query(`DROP TABLE "specifications"`);
    }

}
