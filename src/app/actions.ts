'use server';

import { sql } from '@/lib/db';
import { Ingredient } from '@/types';
import { revalidatePath } from 'next/cache';
import { stackServerApp } from '@/stack';

// Helper to get current user ID
async function getCurrentUserId() {
  const user = await stackServerApp.getUser();
  return user?.id;
}

export async function getIngredients(): Promise<Ingredient[]> {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  try {
    // Cast the result to unknown first, then to Ingredient[] to avoid type errors
    // depending on the specific neon driver types
    const rows = await sql`
      SELECT * FROM ingredients 
      WHERE user_id = ${userId} 
      AND status = 'active'
      ORDER BY expiry_date ASC
    `;
    return rows as unknown as Ingredient[];
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return [];
  }
}

export async function addIngredient(data: { name: string; expiry_date: string; quantity: string }) {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('User not authenticated');

  try {
    await sql`
      INSERT INTO ingredients (user_id, name, expiry_date, quantity, status)
      VALUES (${userId}, ${data.name}, ${data.expiry_date}, ${data.quantity}, 'active')
    `;
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error adding ingredient:', error);
    return { success: false, error: 'Failed to add ingredient' };
  }
}

export async function removeIngredient(id: number) {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('User not authenticated');

  try {
    // Instead of deleting, we mark as consumed or discarded. 
    // For MVP simplicity, let's just delete or mark as 'consumed' if that's the intent.
    // The prompt mentions "status" but the UI just has "remove". 
    // Let's delete for now to keep the list clean, or update status to 'consumed'.
    // Updating to 'consumed' is better for stats later.
    await sql`
      UPDATE ingredients 
      SET status = 'consumed' 
      WHERE id = ${id} AND user_id = ${userId}
    `;
    
    // Update stats (simple increment for MVP)
    // In a real app, we would calculate money saved based on ingredient price
    await sql`
      INSERT INTO user_stats (user_id, money_saved, food_rescued_count)
      VALUES (${userId}, 5.00, 1)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        money_saved = user_stats.money_saved + 5.00,
        food_rescued_count = user_stats.food_rescued_count + 1
    `;

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error removing ingredient:', error);
    return { success: false, error: 'Failed to remove ingredient' };
  }
}

export async function getStats() {
  const userId = await getCurrentUserId();
  if (!userId) return { money_saved: 0, food_rescued_count: 0 };

  try {
    const rows = await sql`
      SELECT money_saved, food_rescued_count 
      FROM user_stats 
      WHERE user_id = ${userId}
    `;
    
    if (rows.length === 0) {
      return { money_saved: 0, food_rescued_count: 0 };
    }
    
    return rows[0] as { money_saved: number; food_rescued_count: number };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { money_saved: 0, food_rescued_count: 0 };
  }
}
