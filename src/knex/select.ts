import _knex from "#config/knex.js";
import type { Category } from "#models/Category.js";
import type { Plant } from "#models/Plant.js";

export async function getCategories(): Promise<Category[]> {
    return _knex
        .select('id', 'name')
        .from('Categories');
}

export async function getPlants(): Promise<Plant[]> {
    return _knex
        .select('id', 'name', 'description', 'image', 'cost', 'category_id')
        .from('Plants');
}

export async function getCategory(categoryId: number): Promise<Category[]> {
    return _knex
        .select('id', 'name')
        .from('Categories')
        .where({id: categoryId});
}


export async function getPlant(plantId: number) {
    return _knex
        .select('id', 'name', 'description', 'image', 'cost', 'category_id')
        .from('Plants')
        .where({id: plantId});
}