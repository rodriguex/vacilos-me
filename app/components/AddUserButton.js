"use client";

import { Button } from "@/components/ui/button";
import { Minus, UserPlus } from "lucide-react";
import { useState } from "react";

export default function AddUserButton() {
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [name, setName] = useState("");

  async function handleNewUser(e) {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.status === 200) {
      window.location.reload();
    }
  }

  return (
    <div>
      <Button
        onClick={() => setIsOpenInput(!isOpenInput)}
        className="relative top-[-3px] mt-4 p-3 rounded-lg"
      >
        {isOpenInput ? <Minus color="white" /> : <UserPlus color="white" />}
        {isOpenInput ? "Fechar" : "Criar"}
      </Button>

      {isOpenInput && (
        <form onSubmit={(e) => handleNewUser(e)} className="mt-3 w-full">
          <input
            autoFocus
            className="border border-gray-300 p-2 rounded w-full focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jackson"
          />
        </form>
      )}
    </div>
  );
}
