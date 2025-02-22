import AddUserButton from "./components/AddUserButton";
import UserCard from "./components/UserCard";

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
      <AddUserButton />

      <div className="mt-4 flex flex-wrap gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
