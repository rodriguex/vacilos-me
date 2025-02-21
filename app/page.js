import { User } from "./components/user";

async function getUsers() {
  const res = await fetch(`${process.env.BASE_URL}/api/users`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Page() {
  const users = await getUsers();

  return (
    <div className="w-full px-5 max-w-5xl mt-10 mx-auto">
      <h1 className="font-extrabold text-3xl">Usuários</h1>
      <button className="mt-3 text-sm border border-purple-800 px-3 py-2 rounded text-purple-800 hover:bg-purple-800 hover:text-white">
        Adicionar usuário
      </button>

      <div className="mt-4 flex flex-wrap gap-4">
        {users.map((user) => (
          <User key={user.id} userProp={user} />
        ))}
      </div>
    </div>
  );
}
