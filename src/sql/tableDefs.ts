import _knex from "#config/knex.js";

export function setupCategories() {
    _knex.schema
        .dropTableIfExists('Categories')
        .then( () => {
            _knex.schema.hasTable('Categories')
                .then( function(exists: any) {
                    if (!exists) {
                        _knex.schema.createTable('Categories', function(table: any) {
                            table.increments('id').primary();
                            table.string('name').unique().notNullable();
                            table.timestamps(true, true);
                        }).then( result => {
                            console.log('Table Categories created');
                        });
                    }
                });
        });


}

export function setupPlants() {
    _knex.schema.dropTableIfExists('Plants')
        .then( () => {
            _knex.schema.hasTable('Plants')
                .then(function (exists: any) {
                    if (!exists) {
                        _knex.schema.createTable('Plants', function (table: any) {
                            table.increments('id').primary();
                            table.string('name').notNullable();
                            table.string('cost').notNullable();
                            table.string('description');
                            table.string('image');
                            table.integer('category_id').unsigned();
                            table
                                .foreign('category_id')
                                .references('Categories.id')
                                .deferrable('deferred');
                            table.timestamps(true, true);
                        }).then( result => {
                            console.log('Table Plants created');
                        });
                    }
                });
        })
}


export function setupUsers() {
    _knex.schema.dropTableIfExists('Users');

    _knex.schema.hasTable('Users')
        .then(function (exists: any) {
            if (!exists) {
                _knex.schema.createTable('Users', function (table: any) {
                    table.increments('id').primary();
                    table.string('username').notNullable();
                    table.string('password').notNullable();
                    table.timestamps(true, true);
                }).then( result => {
                    console.log('Table Users created');
                });
            }
        });
}

