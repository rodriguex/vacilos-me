"use client";

import { useState } from "react";

export function User({ userProp }) {
  const [user, setUser] = useState(userProp);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [vacilo, setVacilo] = useState("");

  async function handleVacilo(event, userId) {
    event.preventDefault();
    await fetch("/api/vacilos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: vacilo, userId }),
    });

    setUser({
      ...user,
      vacilos: [
        ...user.vacilos,
        { id: user.vacilos[user.vacilos.length - 1].id + 1, name: vacilo },
      ],
    });
    setVacilo("");
    setIsInputOpen(false);
  }

  return (
    <div
      key={user.id}
      className="h-fit flex flex-col flex-grow flex-shrink basis-[300px] shadow p-6 rounded"
    >
      <h1>{user.name}</h1>

      {user.vacilos.length > 0 ? (
        <div className="mt-2">
          <ul className="list-disc">
            {user.vacilos.map((vacilo) => (
              <li className="ml-5" key={vacilo.id}>
                {vacilo.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <span>sem vacilos por enquanto...</span>
      )}
      <span
        onClick={() => setIsInputOpen(!isInputOpen)}
        className="mt-4 text-purple-800 cursor-pointer"
      >
        {!isInputOpen ? "Adicionar vacilo" : "Fechar input"}
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
