
// Resolvers define how to fetch the types defined in your schema:
import _knex from "#config/knex.js";
import type {Category} from "#models/Category.js";
import type {Plant} from "#models/Plant.js";

export const resolvers = {
    Query: {
        categories: async (): Promise<Category[]> => await _knex
            .select('id', 'name')
            .from('Categories'),

        plants: async (): Promise<Plant[]> => await _knex
            .select('id', 'name', 'description', 'image', 'cost', 'category_id')
            .from('Plants')
            .orderBy('id'),

        category: async(_: any, args: { id: number; }): Promise<Category> => await _knex
            .first('id', 'name')
            .from('Categories')
            .where({id: args.id})
            .orderBy('id'),

        plant: async (_: any, args: {id: number}): Promise<Plant> => await _knex
            .first('id', 'name', 'description', 'image', 'cost', 'category_id')
            .from('Plants')
            .where({id: args.id}),
    },

    Category: {
        plants: async (parent: Category): Promise<Plant[]> => await _knex
                .select('id', 'name', 'description', 'image', 'cost', 'category_id')
                .from('Plants')
                .where({category_id: parent.id})
    },

    Plant: {
        category: async (parent: Plant): Promise<Category> => await _knex
                .first('id', 'name')
                .from('Categories')
                .where({'id': parent.category_id})
    },

    Mutation: {
        createCategory: async (_: any, args: { name: string; }): Promise<Category> => {
            const [newCategory] = await _knex
                .insert({name: args.name}, ['id', 'name'])
                .into('Categories')

            return newCategory
        },

        deleteCategories: async (_: any, args: {ids: number[]}): Promise<Category[]> => {
            await _knex('Categories')
                .whereIn('id', args.ids)
                .del()

            return _knex
                .select('id', 'name')
                .from('Categories')
        },

        createPlant: async(_: any, args: { name: string, cost: string, image: string, description: string, category_id: number }): Promise<Plant> => {
            const [newPlant] = await _knex
                .insert({
                    name: args.name,
                    description: args.description,
                    image: args.image,
                    cost: args.cost,
                }, ['id', 'name', 'description', 'image', 'cost', 'category_id'])
                .into('Plants')

            return newPlant
        },

        updatePlant: async (_: any, args: {id: number, edits: {name: string, description: string, image: string, cost: string, category_id: number}}): Promise<Plant> => {
            const [updated] = await _knex('Plants')
                .where({id: args.id})
                .update(args.edits, ['id', 'name', 'description', 'image', 'cost', 'category_id'])

            return updated
        },

        deletePlant: async(_: any, args: {id: number}): Promise<Plant> => {
            await _knex('Plants')
                .where({'id': args.id})
                .del()

            return _knex
                .select('id', 'name', 'description', 'image', 'cost', 'category_id')
                .from('Plants')
        },
    }
};