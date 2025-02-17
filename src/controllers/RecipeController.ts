import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Recipe } from "../entities/Recipe";
import { RecipeIngredient } from "../entities/RecipeIngredient";

class RecipeController {
  private recipeRepository;
  private recipeIngredientRepository;

  constructor() {
    this.recipeRepository = AppDataSource.getRepository(Recipe);
    this.recipeIngredientRepository =
      AppDataSource.getRepository(RecipeIngredient);
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);
      const body = req.body;

      // Salvar a receita
      const recipe = await this.recipeRepository.save(body);
      console.log(recipe);

      // Salvar os ingredientes associados à receita
      await Promise.all(
        body.ingredients.map(async (ingredient: { name: string }) => {
          await this.recipeIngredientRepository.save({
            ...ingredient,
            recipe_id: recipe.id,
          });
        })
      );

      res.status(201).json(recipe);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const recipes = await this.recipeRepository.find({relations: ["ingredients"]});
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default RecipeController;












// import { Request, Response } from "express";
// import { AppDataSource } from "../data-source";
// import { Recipe } from "../entities/Recipe";
// import { RecipeIngredient } from "../entities/RecipeIngredient";
// import { Step } from "../entities/RecipeStep";

// class RecipeController {
//   private recipeRepository = AppDataSource.getRepository(Recipe);
//   private ingredientRepository = AppDataSource.getRepository(RecipeIngredient);
//   private stepRepository = AppDataSource.getRepository(Step);

//   create = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { name, preparation_time, is_fitness, ingredients, steps } = req.body;

//       // ✅ 1. Validação dos campos obrigatórios
//       if (!name || !preparation_time || !ingredients || !steps) {
//         res.status(400).json({ message: "Todos os campos são obrigatórios." });
//         return;
//       }

//       // ✅ 2. Criar a receita
//       const recipe = this.recipeRepository.create({
//         name,
//         preparation_time,
//         is_fitness,
//       });
//       await this.recipeRepository.save(recipe);

//       // ✅ 3. Criar os ingredientes e associá-los à receita usando Promise.all()
//       const savedIngredients = await Promise.all(
//         ingredients.map(async (ingredient: { name: string }) => {
//           const newIngredient = this.ingredientRepository.create({
//             name: ingredient.name,
//             recipe, // Associando diretamente à entidade Recipe
//           });
//           return this.ingredientRepository.save(newIngredient);
//         })
//       );

//       // ✅ 4. Criar os passos da receita e associá-los à receita usando Promise.all()
//       const savedSteps = await Promise.all(
//         steps.map(async (step: { description: string }) => {
//           const newStep = this.stepRepository.create({
//             description: step.description,
//             recipe,
//           });
//           return this.stepRepository.save(newStep);
//         })
//       );

//       // ✅ 5. Responder com a receita criada e seus ingredientes/passos
//       res.status(201).json({
//         message: "Receita cadastrada com sucesso!",
//         recipe: { ...recipe, ingredients: savedIngredients, steps: savedSteps },
//       });
//     } catch (error) {
//       console.error("Erro ao criar receita:", error);
//       res.status(500).json({ message: "Erro ao cadastrar a receita." });
//     }
//   };

//   getAll = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const recipes = await this.recipeRepository.find({
//         relations: ["ingredients", "steps"], // ✅ Busca com os relacionamentos
//       });
//       res.json(recipes);
//     } catch (error) {
//       res.status(500).json({ message: "Erro ao buscar receitas." });
//     }
//   };
// }

// export default new RecipeController(); // ✅ Exportando como instância
















// import { Request, Response } from "express";
// import { AppDataSource } from "../data-source";
// import { Recipe } from "../entities/Recipe";
// import { RecipeIngredient } from "../entities/RecipeIngredient";
// import { Step } from "../entities/RecipeStep";

// export class RecipeController {
//     async createRecipe(req: Request, res: Response): Promise<void> {
//       const { name, preparation_time, is_fitness, ingredients, steps } = req.body;

//         if (!name || !preparation_time || !ingredients || !steps) {
//             res.status(400).json({ message: "Todos os campos são obrigatórios." });
//         }

//         const recipeRepository = AppDataSource.getRepository(Recipe);
//         const ingredientRepository = AppDataSource.getRepository(RecipeIngredient);
//         const stepRepository = AppDataSource.getRepository(Step);

//         try {
//             // Criar a receita
//             const recipe = recipeRepository.create({
//                 name,
//                 preparation_time,
//                 is_fitness,
//             });
//             await recipeRepository.save(recipe);

//             // Criar e associar os ingredientes
//             const savedIngredients = ingredients.map((ingredient: { name: string }) =>
//                 ingredientRepository.create({ name: ingredient.name, recipe })
//             );
//             await ingredientRepository.save(savedIngredients);

//             // Criar e associar os passos da receita
//             const savedSteps = steps.map((step: { description: string }) =>
//                 stepRepository.create({ description: step.description, recipe })
//             );
//             await stepRepository.save(savedSteps);

//             res.status(201).json({ message: "Receita cadastrada com sucesso!", recipe });
//         } catch (error) {
//             res.status(500).json({ message: "Erro ao cadastrar a receita.", error });
//         }
//     }
// }
