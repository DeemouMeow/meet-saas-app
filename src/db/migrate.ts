import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import path from "path";

const LOG_PREFIX = "[DRIZZLE MIGRATIONS]:";
const MIGRATIONS_FOLDER = path.resolve(process.cwd(), "drizzle");

const logMessage = (message: string) => console.log(`${LOG_PREFIX} ${message}`);
const errorMessage = (message: string) => console.log(`${LOG_PREFIX} ERROR! ${message}`);

const performMigrations = async () => {
    const connectionString = process.env.DATABASE_URL!;

    if (!connectionString) {
        errorMessage("DATABASR_URL does not provided");

        return;
    }

    const migrationClient = postgres(connectionString, { max: 1 });
    const db = drizzle(migrationClient);

    logMessage("Checking and starting migrations...");

    try {
        await migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });

        logMessage("Database synchronized SUCCESSFULLY");
    } catch (error: any)  {
        errorMessage(error.message as string);
    } finally {
        await migrationClient.end();

        logMessage("Client shootdown");
    }
};

performMigrations();