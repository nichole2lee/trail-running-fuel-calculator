import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  index,
  decimal,
} from "drizzle-orm/pg-core";
import { createSchemaFactory } from "drizzle-zod";
import { z } from "zod";



export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// 补给品表
export const supplements = pgTable(
  "supplements",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    type: varchar("type", { length: 50 }).notNull(), // energy_gel, salt_tablet, energy_bar, solid_food, electrolyte_drink, etc.
    calories: integer("calories").notNull().default(0),
    carbohydrates: decimal("carbohydrates", { precision: 6, scale: 2 }).notNull().default("0"),
    protein: decimal("protein", { precision: 6, scale: 2 }).notNull().default("0"),
    fat: decimal("fat", { precision: 6, scale: 2 }).notNull().default("0"),
    sodium: integer("sodium").notNull().default(0), // 毫克
    potassium: integer("potassium").notNull().default(0), // 毫克
    calcium: integer("calcium").notNull().default(0), // 毫克
    magnesium: integer("magnesium").notNull().default(0), // 毫克
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
  },
  (table) => [
    index("supplements_type_idx").on(table.type),
    index("supplements_name_idx").on(table.name),
  ]
);

// 使用 createSchemaFactory 配置 date coercion
const { createInsertSchema: createCoercedInsertSchema } = createSchemaFactory({
  coerce: { date: true },
});

// Zod schemas for validation
export const insertSupplementSchema = createCoercedInsertSchema(supplements).pick({
  name: true,
  type: true,
  calories: true,
  carbohydrates: true,
  protein: true,
  fat: true,
  sodium: true,
  potassium: true,
  calcium: true,
  magnesium: true,
  notes: true,
});

export const updateSupplementSchema = createCoercedInsertSchema(supplements)
  .pick({
    name: true,
    type: true,
    calories: true,
    carbohydrates: true,
    protein: true,
    fat: true,
    sodium: true,
    potassium: true,
    calcium: true,
    magnesium: true,
    notes: true,
  })
  .partial();

// TypeScript types
export type Supplement = typeof supplements.$inferSelect;
export type InsertSupplement = z.infer<typeof insertSupplementSchema>;
export type UpdateSupplement = z.infer<typeof updateSupplementSchema>;
