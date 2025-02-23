"use client";

import { Button } from "@/components/ui/button";
import { CircleDollarSign, Loader2 } from "lucide-react";
import { useState } from "react";
import VaciloItem from "./VaciloItem";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserCard({ user, vacilos }) {
  const [vacilo, setVacilo] = useState("");
  const [selectedVacilo, setSelectedVacilo] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleVacilo(event, userId) {
    event.preventDefault();
    setIsSaving(true);

    const res = await fetch("/api/vacilos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: selectedVacilo !== "" ? selectedVacilo : vacilo,
        userId,
      }),
    });
    if (res.status === 200) {
      window.location.reload();
    }
  }

  return (
    <div
      key={user.id}
      className="bg-white h-fit flex flex-col flex-grow flex-shrink max-w-[450px] basis-[450px] shadow p-4 rounded-xl"
    >
      <h1 className="text-xl">{`${user.name}${
        user.vacilos.length > 0
          ? `: ${
              user.vacilos.length == 1
                ? "R$5,00"
                : `R$${user.vacilos.length * 5},00`
            }`
          : ""
      }`}</h1>

      {user.vacilos.length > 0 && (
        <div className="mt-2">
          <ul className="list-disc">
            <span className="block mb-1 italic font-bold">vacilos:</span>
            {user.vacilos.map((vacilo) => (
              <VaciloItem key={`${user.id} - ${vacilo.id}`} vacilo={vacilo} />
            ))}
          </ul>
        </div>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="mt-4 w-fit text-purple-800 hover:text-purple-800"
          >
            <CircleDollarSign /> Adicionar vacilo
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-extrabold text-2xl">
              Criar novo vacilo
            </DialogTitle>
            <DialogDescription>
              Já consigo sentir o cheirinho do salgadinho...
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => handleVacilo(e, user.id)} className="w-full">
            {vacilos.length > 0 && (
              <Select
                defaultValue={selectedVacilo}
                onValueChange={(value) => setSelectedVacilo(value)}
                className="w-full"
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue
                    placeholder="Selecione um vacilo ou crie um novo"
                    className="w-full"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {vacilos.map((vacilo) => (
                      <SelectItem key={vacilo.id} value={vacilo.name}>
                        {vacilo.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <input
              required={vacilos.length == 0 ? true : false}
              className="p-2 rounded-lg mr-2 border border-gray-300 focus:outline-none"
              placeholder="Adicionar vacilo"
              value={vacilo}
              onChange={(e) => setVacilo(e.target.value)}
            />

            {isSaving && <Loader2 className="mt-2 animate-spin" />}
            <Button className="mt-4">Salvar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
