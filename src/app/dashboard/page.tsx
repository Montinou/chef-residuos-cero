import { getIngredients, getStats } from "@/app/actions";
import { InventoryList } from "@/components/dashboard/InventoryList";
import { ChefAssistant } from "@/components/dashboard/ChefAssistant";
import { ImpactDashboard } from "@/components/dashboard/ImpactDashboard";

export default async function DashboardPage() {
  const ingredients = await getIngredients();
  const stats = await getStats();

  return (
    <div className="space-y-8 pb-20">
      <ImpactDashboard stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <InventoryList 
            initialIngredients={ingredients} 
          />
        </section>
        
        <section className="sticky top-24 h-fit">
          <ChefAssistant ingredients={ingredients} />
        </section>
      </div>
    </div>
  );
}
