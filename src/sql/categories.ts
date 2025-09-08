import _knex from "#config/knex.js";
import type {Category} from "#models/Category.js";
import type {Plant} from "#models/Plant.js";

export async function getCategories(): Promise<Category[]> {
    return await _knex
        .select('id', 'name')
        .from('Categories');
}

export async function getPlants(): Promise<Plant[]> {
    return await _knex
        .select('id', 'name', 'description', 'image', 'cost', 'category_id')
        .from('Plants');
}