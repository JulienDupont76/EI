import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class addCookie1685635372871 {
    name = 'addCookie1685635372871'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "firstname" varchar NOT NULL,
                "lastname" varchar NOT NULL,
                "password" varchar NOT NULL,
                "username" varchar NOT NULL,
                "cookieSession" varchar NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"(
                    "id",
                    "email",
                    "firstname",
                    "lastname",
                    "password",
                    "username"
                )
            SELECT "id",
                "email",
                "firstname",
                "lastname",
                "password",
                "username"
            FROM "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user"
                RENAME TO "user"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME TO "temporary_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "firstname" varchar NOT NULL,
                "lastname" varchar NOT NULL,
                "password" varchar NOT NULL,
                "username" varchar NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user"(
                    "id",
                    "email",
                    "firstname",
                    "lastname",
                    "password",
                    "username"
                )
            SELECT "id",
                "email",
                "firstname",
                "lastname",
                "password",
                "username"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
    }
}
