import { z } from "zod";

/**
 * Esquemes de validació compartits entre frontend i API.
 * Zod ens dóna validació + tipus inferits.
 */

// --- Auth ---
export const registerSchema = z.object({
  name: z.string().min(2, "El nom ha de tenir almenys 2 caràcters").max(100),
  email: z.string().email("Email no vàlid").toLowerCase(),
  password: z
    .string()
    .min(8, "La contrasenya ha de tenir almenys 8 caràcters")
    .max(100),
});

export const loginSchema = z.object({
  email: z.string().email("Email no vàlid").toLowerCase(),
  password: z.string().min(1, "La contrasenya és obligatòria"),
});

// --- Comentaris ---
export const commentSchema = z.object({
  content: z
    .string()
    .min(3, "El comentari ha de tenir almenys 3 caràcters")
    .max(1000, "El comentari no pot tenir més de 1000 caràcters"),
  rating: z
    .number()
    .int()
    .min(1, "La puntuació mínima és 1")
    .max(5, "La puntuació màxima és 5"),
});

// --- Sol·licituds de contacte ---
export const contactRequestSchema = z
  .object({
    name: z.string().min(2, "Nom obligatori").max(100),
    email: z.string().email("Email no vàlid").toLowerCase(),
    phone: z.string().max(30).optional().or(z.literal("")),
    modelSlug: z.string().max(100).optional().or(z.literal("")),
    pickupDate: z.string().optional().or(z.literal("")),
    returnDate: z.string().optional().or(z.literal("")),
    message: z
      .string()
      .min(10, "Explica'ns una mica més (mínim 10 caràcters)")
      .max(2000),
  })
  .refine(
    (data) => {
      // Les dates van en parella
      const hasPickup = !!data.pickupDate;
      const hasReturn = !!data.returnDate;
      return hasPickup === hasReturn;
    },
    {
      message: "Indica les dues dates o cap",
      path: ["returnDate"],
    },
  )
  .refine(
    (data) => {
      if (!data.pickupDate || !data.returnDate) return true;
      return new Date(data.returnDate) >= new Date(data.pickupDate);
    },
    {
      message: "La data de tornada ha de ser posterior a la de recollida",
      path: ["returnDate"],
    },
  );

// --- Admin: actualitzar rol ---
export const updateRoleSchema = z.object({
  role: z.enum(["USER", "EDITOR", "ADMIN"]),
});
