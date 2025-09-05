import { PrismaClient } from "@prisma/client/extension";

// @ts-ignore
import getPlantsData from "../data/plants";

const prisma = new PrismaClient();

async function main() {
    // Delete all `Category` and `Plant` records
    await prisma.category.deleteMany({});
    await prisma.plant.deleteMany({});

    const seedData = getPlantsData();
    for (const category of seedData) {
        await prisma.category.create({
            data: {
                name: category.category,
                plants: {
                    create: category.plants
                }
            }
        })
    }
}

main().then(() => {
    console.log("Data seeded...");
});
