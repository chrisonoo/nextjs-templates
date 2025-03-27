import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// Check if .env file exists and is readable
const envPath = path.resolve(process.cwd(), ".env");
const envExists = fs.existsSync(envPath);

if (!envExists) {
    console.error(`\n❌ Error: .env file not found at ${envPath}`);
    console.error(
        "Please create a .env file in the project root with the required variables."
    );
    console.error(
        "You can copy the .env.example file and fill in your values.\n"
    );
}

// Load environment variables from .env file
dotenv.config();

// Check if all required environment variables are set
const getEnvVariable = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(
            `Missing environment variable: ${key}\n` +
                `Please make sure your .env file contains ${key}=your_value\n` +
                `You can refer to .env.example for the required variables.`
        );
    }
    return value;
};

export const env = {
    database: {
        server: getEnvVariable("DATABASE_SERVER"),
        name: getEnvVariable("DATABASE_NAME"),
        user: getEnvVariable("DATABASE_USER"),
        password: getEnvVariable("DATABASE_PASSWORD"),
    },
};
