import getPlantsData from "./data/plants.js";
import _knex from "#config/knex.js";

export const seedCategories = () => {
    const categoryData = getPlantsData().map (category => ({
        'name': category.category
    }));

    const plantData = getPlantsData().flatMap ( category => {
        return category.plants.map( plant => ({
            ...plant,
            category: category.category
        }));
    })
    console.log(plantData);

    _knex
        .insert(categoryData, ['id', 'name'])
        .into('Categories')
        .then( data => {

            console.log(data);
            if (data) {
                console.log("seeded categories");

                const plants = plantData.map ( plant => ({
                    name: plant.name,
                    cost: plant.cost,
                    description: plant.description,
                    image: plant.image,
                    category_id: data.find( c => c.name === plant.category).id
                }))
                _knex.insert(plants)
                    .into('Plants')
                    .then(data => {
                        console.log('seeded plants');
                    })
            }


        });
}

export const seedUsers = () => {

}

