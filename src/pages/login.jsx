import { signIn, useSession } from "next-auth/react";
import Dashboard from "./dashboard";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="logged_in">
        <Dashboard user={session.user} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn("discord")}>Sign in with Discord</button>
    </div>
  );
};

export default Login;
