"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PiggyBank, Leaf, TrendingUp } from "lucide-react";

interface ImpactDashboardProps {
  stats: {
    money_saved: number;
    food_rescued_count: number;
  }
}

export function ImpactDashboard({ stats }: ImpactDashboardProps) {
  // Weekly goal could be dynamic or static for MVP
  const weeklyGoal = 75;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-800 flex items-center gap-2">
            <PiggyBank className="w-4 h-4" />
            Dinero Ahorrado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">${Number(stats.money_saved).toFixed(2)}</div>
          <p className="text-xs text-green-700 mt-1">+15% vs mes anterior</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-orange-800 flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            Alimentos Rescatados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-900">{stats.food_rescued_count} items</div>
          <p className="text-xs text-orange-700 mt-1">¡Excelente trabajo!</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Meta Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm mb-1">
            <span>Progreso</span>
            <span className="font-bold">{weeklyGoal}%</span>
          </div>
          <Progress value={weeklyGoal} className="h-2" />
        </CardContent>
      </Card>
    </div>
  );
}
