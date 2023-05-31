import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Testmanytomany1685546684428 {
    name = 'Testmanytomany1685546684428'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "genre_collections_collection" (
                "genreId" integer NOT NULL,
                "collectionId" integer NOT NULL,
                PRIMARY KEY ("genreId", "collectionId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e9e85c0573e6c54b385278c9c1" ON "genre_collections_collection" ("genreId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f6fbe4859f7f2cf0a707ccf4d3" ON "genre_collections_collection" ("collectionId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_e9e85c0573e6c54b385278c9c1"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_f6fbe4859f7f2cf0a707ccf4d3"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_genre_collections_collection" (
                "genreId" integer NOT NULL,
                "collectionId" integer NOT NULL,
                CONSTRAINT "FK_e9e85c0573e6c54b385278c9c1d" FOREIGN KEY ("genreId") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_f6fbe4859f7f2cf0a707ccf4d38" FOREIGN KEY ("collectionId") REFERENCES "collection" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("genreId", "collectionId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_genre_collections_collection"("genreId", "collectionId")
            SELECT "genreId",
                "collectionId"
            FROM "genre_collections_collection"
        `);
        await queryRunner.query(`
            DROP TABLE "genre_collections_collection"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_genre_collections_collection"
                RENAME TO "genre_collections_collection"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e9e85c0573e6c54b385278c9c1" ON "genre_collections_collection" ("genreId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f6fbe4859f7f2cf0a707ccf4d3" ON "genre_collections_collection" ("collectionId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_f6fbe4859f7f2cf0a707ccf4d3"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_e9e85c0573e6c54b385278c9c1"
        `);
        await queryRunner.query(`
            ALTER TABLE "genre_collections_collection"
                RENAME TO "temporary_genre_collections_collection"
        `);
        await queryRunner.query(`
            CREATE TABLE "genre_collections_collection" (
                "genreId" integer NOT NULL,
                "collectionId" integer NOT NULL,
                PRIMARY KEY ("genreId", "collectionId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "genre_collections_collection"("genreId", "collectionId")
            SELECT "genreId",
                "collectionId"
            FROM "temporary_genre_collections_collection"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_genre_collections_collection"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f6fbe4859f7f2cf0a707ccf4d3" ON "genre_collections_collection" ("collectionId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e9e85c0573e6c54b385278c9c1" ON "genre_collections_collection" ("genreId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_f6fbe4859f7f2cf0a707ccf4d3"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_e9e85c0573e6c54b385278c9c1"
        `);
        await queryRunner.query(`
            DROP TABLE "genre_collections_collection"
        `);
    }
}
