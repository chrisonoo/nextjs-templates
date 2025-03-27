export * from "./baseService";
export * from "./tipsService";

// Export service instances
import { TipsService } from "./tipsService";

export const tipsService = new TipsService();
