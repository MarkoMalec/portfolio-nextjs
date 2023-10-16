import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SmallLogo from "@assets/SmallLogo.jsx";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  return (
    <>
      <section className="login-section">
        <div className="login-logo">
          <SmallLogo />
        </div>
        <div className="login_card">
          <h3>Login to dashboard</h3>
          <div className="login-button-area">
            <button className="btn-login google" onClick={() => signIn("google")}>
              Sign in with <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
            </button>
            <button className="btn-login discord" onClick={() => signIn("discord")}>
              Sign in with Discord
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
