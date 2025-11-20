"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Ingredient } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Utensils, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ChefAssistantProps {
  ingredients: Ingredient[];
}

export function ChefAssistant({ ingredients }: ChefAssistantProps) {
  const { messages, sendMessage, status } = useChat();

  const isLoading = status === "submitted" || status === "streaming";

  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage(
      { role: "user", content: input } as any,
      { body: { ingredients } }
    );
    setInput("");
  };

  return (
    <Card className="w-full h-[600px] flex flex-col shadow-lg border-t-4 border-t-green-600">
      <CardHeader className="bg-green-50 border-b">
        <CardTitle className="flex items-center gap-2 text-green-800">
          <div className="p-2 bg-green-200 rounded-full">
            <Utensils className="w-5 h-5 text-green-700" />
          </div>
          Chef IA Rescatista
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p className="mb-2">👋 ¡Hola! Soy tu Chef Rescatista.</p>
              <p>Veo que tienes ingredientes en tu nevera.</p>
              <p className="mt-4 font-medium text-green-700">¿Qué te gustaría cocinar hoy?</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      m.role === "user"
                        ? "bg-green-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm">{m.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 rounded-bl-none">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ej: Dame una receta rápida con espinacas..."
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="bg-green-600 hover:bg-green-700">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
