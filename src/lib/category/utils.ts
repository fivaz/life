import type { Category } from "@prisma/client";

export type CCategory = Omit<Category, "userId" | "deleted">;
