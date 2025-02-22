"use client";

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
      <button
        onClick={() => setIsOpenInput(!isOpenInput)}
        className="mt-3 text-sm border border-purple-800 px-3 py-2 rounded text-purple-800 hover:bg-purple-800 hover:text-white"
      >
        {isOpenInput ? "Fechar" : "Adicionar novo usuário"}
      </button>

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
