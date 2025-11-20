"use client";

import { Ingredient } from "@/types";
import { getExpiryStatus, getExpiryColor } from "@/lib/utils/expiry";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

import { motion } from "framer-motion";

interface IngredientCardProps {
  ingredient: Ingredient;
  onRemove: (id: number) => void;
}

export function IngredientCard({ ingredient, onRemove }: IngredientCardProps) {
  const status = getExpiryStatus(ingredient.expiry_date);
  const colorClass = getExpiryColor(status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-3 overflow-hidden border-l-4 shadow-sm hover:shadow-md transition-shadow" style={{ borderLeftColor: status === 'critical' ? '#ef4444' : status === 'warning' ? '#eab308' : '#22c55e' }}>
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${colorClass} animate-pulse`} />
          <div>
            <h3 className="font-bold text-lg">{ingredient.name}</h3>
            <p className="text-sm text-gray-500">
              Caduca: {format(parseISO(ingredient.expiry_date), "d 'de' MMMM", { locale: es })}
            </p>
            <p className="text-xs text-gray-400">
              {status === 'critical' ? '¡Usar ya!' : status === 'warning' ? 'Consumir pronto' : 'En buen estado'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline">{ingredient.quantity}</Badge>
          <Button variant="ghost" size="icon" onClick={() => onRemove(ingredient.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}
