import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ModelForm from "../ModelForm";

export default async function EditModelPage({ params }) {
  const { slug } = await params;
  const model = await prisma.camperModel.findUnique({ where: { slug } });
  if (!model) notFound();

  // Serialitzem el Decimal a number
  const serialized = { ...model, pricePerDay: Number(model.pricePerDay) };

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl font-semibold mb-6">
        Editar {model.name}
      </h2>
      <ModelForm initial={serialized} />
    </div>
  );
}
