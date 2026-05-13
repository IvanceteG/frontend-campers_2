import {
  getAllModels,
  getModelBySlug,
  getFeaturedModels,
} from "@/services/modelsService";

/**
 * Controllers: orquestren la lògica i normalitzen la resposta
 * a un format { ok, data, error } per a les vistes.
 */

export async function listModels() {
  try {
    const models = await getAllModels();
    return { ok: true, data: models };
  } catch (error) {
    console.error("[modelsController.listModels]", error);
    return { ok: false, data: [], error: "No s'han pogut carregar els models" };
  }
}

export async function showModel(slug) {
  try {
    const model = await getModelBySlug(slug);
    if (!model) return { ok: false, data: null, error: "Model no trobat" };
    return { ok: true, data: model };
  } catch (error) {
    console.error("[modelsController.showModel]", error);
    return { ok: false, data: null, error: "Error en carregar el model" };
  }
}

export async function listFeatured(limit = 4) {
  try {
    const models = await getFeaturedModels(limit);
    return { ok: true, data: models };
  } catch (error) {
    console.error("[modelsController.listFeatured]", error);
    return { ok: false, data: [], error: "Error en carregar destacats" };
  }
}
