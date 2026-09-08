import { db } from "@/db";
import { providerSettings } from "@/db/schema";
import { ProviderSettingsForm } from "@/components/features/admin/ProviderSettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  let settings = null;

  try {
    const list = await db.select().from(providerSettings).limit(1);
    if (list.length > 0) {
      settings = list[0];
    }
  } catch (err) {
    console.error("Erro ao carregar dados do prestador:", err);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Configurações Gerais</h1>
        <p className="text-slate-400 text-xs mt-1">
          Gerencie os dados do emissor e as informações padronizadas para seus recibos.
        </p>
      </div>

      <ProviderSettingsForm initialData={settings} />
    </div>
  );
}
