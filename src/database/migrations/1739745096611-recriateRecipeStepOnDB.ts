
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RecriateRecipeStepOnDB1739745096611 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "recipes_steps",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "recipe_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );

        // Criando a chave estrangeira para relacionar com "recipes"
        await queryRunner.createForeignKey(
            "recipes_steps",
            new TableForeignKey({
                columnNames: ["recipe_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "recipes",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("recipes_steps");
    }
}
