import { fetchUsers } from "@utils/data-fetching";

type UsersPageProps = {
  users: User[];
}

function PostsPage({ users }: UsersPageProps) {
  return (
    <>
      <h1>Users</h1>
      <p>These are all users that are registered on the website.</p>
      <div>
        {users.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </div>
    </>
  );
}

export default PostsPage;

export async function getServerSideProps() {
  const users: User[] = await fetchUsers();

  return {
    props: {
      users,
    },
  };
}
