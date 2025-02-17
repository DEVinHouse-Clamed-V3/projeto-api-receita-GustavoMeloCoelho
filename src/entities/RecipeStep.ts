import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn,JoinColumn } from "typeorm";
import { Recipe } from "./Recipe";

@Entity("recipes_steps")
export class Step {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    description: string;

    @ManyToOne(() => Recipe, (recipe) => recipe.steps)
    @JoinColumn({ name: "recipe_id" })  
    recipe: Recipe;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
