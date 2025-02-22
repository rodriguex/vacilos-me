"use client";

import { useState } from "react";

export default function UserCard({ user }) {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [vacilo, setVacilo] = useState("");

  async function handleVacilo(event, userId) {
    event.preventDefault();
    const res = await fetch("/api/vacilos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: vacilo, userId }),
    });
    if (res.status === 200) {
      window.location.reload();
    }
  }

  async function handleRemoveVacilo(id) {
    const req = await fetch(`/api/vacilos/${id}`, {
      method: "DELETE",
    });
    if (req.status === 200) {
      window.location.reload();
    }
  }

  return (
    <div
      key={user.id}
      className="h-fit flex flex-col flex-grow flex-shrink basis-[300px] shadow p-6 rounded"
    >
      <h1 className="text-xl">{user.name}</h1>

      {user.vacilos.length > 0 ? (
        <div className="mt-2">
          <ul className="list-disc">
            <span className="block mb-1 italic font-bold">vacilos:</span>
            {user.vacilos.map((vacilo) => (
              <li
                className="p-2 mb-2 rounded-lg border border-gray-100 flex items-center justify-between"
                key={vacilo.id}
              >
                <span>{vacilo.name}</span>
                <span
                  className="font-bold text-lg text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => handleRemoveVacilo(vacilo.id)}
                >
                  X
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <span>sem vacilos por enquanto...</span>
      )}

      <span
        onClick={() => setIsInputOpen(!isInputOpen)}
        className="w-fit mt-4 text-purple-800 cursor-pointer"
      >
        {!isInputOpen ? (
          <span className="border border-purple-800 p-2 rounded hover:bg-purple-800 hover:text-white">
            + Adicionar vacilo
          </span>
        ) : (
          "Fechar"
        )}
      </span>

      {isInputOpen && (
        <form
          onSubmit={(e) => handleVacilo(e, user.id)}
          className="mt-3 w-full"
        >
          <input
            autoFocus
            className="border border-gray-300 p-2 rounded w-full focus:outline-none"
            value={vacilo}
            onChange={(e) => setVacilo(e.target.value)}
            placeholder="AI AI...podia ser sexta"
          />
        </form>
      )}
    </div>
  );
}
