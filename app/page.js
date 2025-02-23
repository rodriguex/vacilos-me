import AddUserButton from "./components/AddUserButton";
import UserCard from "./components/UserCard";

async function getUsers() {
  const res = await fetch(`${process.env.BASE_URL}/api/users`, {
    cache: "no-store",
  });
  return res.json();
}

async function getVacilos() {
  const res = await fetch(`${process.env.BASE_URL}/api/vacilos`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Page() {
  const users = await getUsers();
  const vacilos = await getVacilos();

  return (
    <div className="w-full px-5 max-w-5xl mt-10 mx-auto">
      <div className="flex items-baseline gap-4">
        <h1 className="font-extrabold text-4xl">Usuários</h1>
        <AddUserButton />
      </div>

      <div className="py-8">
        <h2 className="w-fit text-xl border-b-2 border-black">
          {users.length == 0 || vacilos.length == 0
            ? "Sem vacilos por enquanto..."
            : `Total de vacilos: ${vacilos.length} (R$${
                vacilos.length * 5
              },00)`}
        </h2>

        <div className="mt-4 flex flex-wrap gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} vacilos={vacilos} />
          ))}
        </div>
      </div>
    </div>
  );
}
