export * from "./baseRepository";
export * from "./tipsRepository";

// Export repository instances
import { TipsRepository } from "./tipsRepository";

export const tipsRepository = new TipsRepository();
