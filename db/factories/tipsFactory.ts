import { faker } from "@faker-js/faker";

export interface TipData {
    content: string;
}

/**
 * Generates a random sentence with the specified number of words
 */
function generateRandomSentence(minWords: number, maxWords: number): string {
    const wordCount = faker.number.int({ min: minWords, max: maxWords });
    const sentence = faker.lorem.words(wordCount) + ".";
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

/**
 * Creates random tip data entries
 */
export function createRandomTips(count: number): TipData[] {
    return Array.from({ length: count }, () => ({
        content: generateRandomSentence(4, 6),
    }));
}
