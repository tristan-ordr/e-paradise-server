
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
            .from('Plants'),

        category: async(_: any, args: { id: number; }): Promise<Category> => await _knex
            .first('id', 'name')
            .from('Categories')
            .where({id: args.id}),

        plant: async (_: any, args: {id: number}): Promise<Plant> => await _knex
            .first('id', 'name', 'description', 'image', 'cost', 'category_id')
            .from('Plants')
            .where({id: args.id}),
    },

    Category: {
        async plants(parent: Category): Promise<Plant[]> {
            return _knex
                .select('id', 'name', 'description', 'image', 'cost', 'category_id')
                .from('Plants')
                .where({category_id: parent.id});
        }
    },

    Plant: {
        async category(parent: Plant): Promise<Category> {
            return _knex
                .first('id', 'name')
                .from('Categories')
                .where({'id': parent.category_id})
        }
    }
};