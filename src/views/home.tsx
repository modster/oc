/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";
import { Layout } from "./layout.tsx";

interface HomeProps {
  user?: { name: string; email: string; picture?: string } | null;
}

export const HomePage: FC<HomeProps> = ({ user }) => {
  return (
    <Layout title="Home" user={user}>
      <div style="max-width:900px;margin:4rem auto;padding:0 1.5rem;text-align:center;">
        <h1 style="font-size:2.5rem;font-weight:700;color:#1a1a1a;margin-bottom:1rem;">
          Welcome to OC App
        </h1>
        <p style="font-size:1.15rem;color:#555;max-width:560px;margin:0 auto 2.5rem;">
          A secure application powered by Google OAuth 2.0. Sign in with your
          Google account to get started.
        </p>

        {user
          ? (
            <div style="background:#fff;border-radius:12px;padding:2.5rem;box-shadow:0 2px 12px rgba(0,0,0,0.08);max-width:480px;margin:0 auto;">
              <div style="margin-bottom:1.5rem;">
                {user.picture && (
                  <img
                    src={user.picture}
                    alt={user.name}
                    referrerpolicy="no-referrer"
                    style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid #e8f0fe;"
                  />
                )}
              </div>
              <h2 style="font-size:1.4rem;font-weight:600;color:#1a1a1a;margin-bottom:0.4rem;">
                Hello, {user.name}!
              </h2>
              <p style="color:#888;font-size:0.95rem;margin-bottom:1.5rem;">{user.email}</p>
              <a
                href="/auth/logout"
                style="display:inline-block;padding:0.6rem 1.5rem;background:#e53935;color:#fff;border-radius:4px;text-decoration:none;font-weight:500;font-size:0.95rem;"
              >
                Sign out
              </a>
            </div>
          )
          : (
            <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;">
              <a
                href="/auth/login"
                style="display:inline-flex;align-items:center;gap:0.75rem;padding:0.75rem 1.75rem;background:#fff;color:#333;border:1px solid #ccc;border-radius:6px;text-decoration:none;font-weight:500;font-size:1rem;box-shadow:0 1px 4px rgba(0,0,0,0.1);transition:box-shadow 0.2s;"
              >
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Sign in with Google
              </a>
              <p style="color:#aaa;font-size:0.82rem;">
                By signing in, you agree to our{" "}
                <a href="/tos" style="color:#1a73e8;text-decoration:none;">Terms of Service</a>{" "}
                and{" "}
                <a href="/privacy" style="color:#1a73e8;text-decoration:none;">Privacy Policy</a>.
              </p>
            </div>
          )}
      </div>
    </Layout>
  );
};
