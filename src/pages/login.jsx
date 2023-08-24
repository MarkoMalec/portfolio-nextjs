import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  return (
    <section className="login-section">
      <div className="login_card">
        <h3>Login with preferable service</h3>
        <div className="login-button-area">
          <button className="btn-login" onClick={() => signIn("discord")}>
            Sign in with Discord
          </button>
          <button className="btn-login" onClick={() => signIn("discord")}>
            Sign in with Discord
          </button>
          <button className="btn-login" onClick={() => signIn("discord")}>
            Sign in with Discord
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
