"use client";

import { Loader2, X } from "lucide-react";
import { useState } from "react";

export default function VaciloItem({ vacilo }) {
  const [isRemoving, setIsRemoving] = useState(false);

  async function handleRemoveVacilo(id) {
    setIsRemoving(true);
    const req = await fetch(`/api/vacilos/${id}`, {
      method: "DELETE",
    });
    if (req.status === 200) {
      window.location.reload();
    }
  }

  return (
    <li
      className="p-2 mb-2 rounded-lg border border-gray-100 flex items-center justify-between"
      key={vacilo.id}
    >
      <span>{vacilo.name}</span>
      {isRemoving ? (
        <Loader2 className="animate-spin" />
      ) : (
        <X
          size={22}
          className="font-bold text-red-500 hover:text-red-700 cursor-pointer"
          onClick={() => handleRemoveVacilo(vacilo.id)}
        />
      )}
    </li>
  );
}
