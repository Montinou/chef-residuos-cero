"use client";

import { useState, useTransition } from "react";
import { Ingredient } from "@/types";
import { IngredientCard } from "./IngredientCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { addIngredient, removeIngredient } from "@/app/actions";
import { toast } from "sonner";

interface InventoryListProps {
  initialIngredients: Ingredient[];
}

export function InventoryList({ initialIngredients }: InventoryListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", expiry_date: "", quantity: "" });
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    if (!newItem.name || !newItem.expiry_date) return;
    
    startTransition(async () => {
      const result = await addIngredient({
        name: newItem.name,
        expiry_date: newItem.expiry_date,
        quantity: newItem.quantity || "1 un."
      });

      if (result.success) {
        setNewItem({ name: "", expiry_date: "", quantity: "" });
        setIsDialogOpen(false);
        toast.success("Ingrediente agregado");
      } else {
        toast.error("Error al agregar ingrediente");
      }
    });
  };

  const handleRemove = (id: number) => {
    startTransition(async () => {
      const result = await removeIngredient(id);
      if (result.success) {
        toast.success("Ingrediente eliminado");
      } else {
        toast.error("Error al eliminar ingrediente");
      }
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mi Nevera</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg">
              <Plus className="w-5 h-5 mr-1" /> Agregar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Ingrediente</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" value={newItem.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({...newItem, name: e.target.value})} placeholder="Ej: Tomates" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiry">Caducidad</Label>
                <Input id="expiry" type="date" value={newItem.expiry_date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({...newItem, expiry_date: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Cantidad</Label>
                <Input id="quantity" value={newItem.quantity} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({...newItem, quantity: e.target.value})} placeholder="Ej: 2 un." />
              </div>
              <Button onClick={handleAdd} disabled={isPending} className="w-full bg-green-600 hover:bg-green-700">
                {isPending ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {initialIngredients.map(ingredient => (
          <IngredientCard key={ingredient.id} ingredient={ingredient} onRemove={handleRemove} />
        ))}
        {initialIngredients.length === 0 && (
          <p className="text-center text-gray-500 py-8">Tu nevera está vacía. ¡Agrega ingredientes!</p>
        )}
      </div>
    </div>
  );
}
