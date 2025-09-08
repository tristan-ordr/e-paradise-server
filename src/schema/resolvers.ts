
// Resolvers define how to fetch the types defined in your schema:
import {getCategories, getPlants} from "#knex/select.js";

export const resolvers = {
    Query: {
        categories: async () => await getCategories(),
        plants: async () => await getPlants(),
    },
};