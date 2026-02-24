/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";

interface LayoutProps {
  title: string;
  user?: { name: string; email: string; picture?: string } | null;
  children: unknown;
}

export const Layout: FC<LayoutProps> = ({ title, user, children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} - OC App</title>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;
            background: #f5f5f5;
            color: #333;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          nav {
            background: #fff;
            border-bottom: 1px solid #e0e0e0;
            padding: 0 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 60px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          }
          nav .logo {
            font-size: 1.4rem;
            font-weight: 700;
            color: #1a73e8;
            text-decoration: none;
          }
          nav .nav-links {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            list-style: none;
          }
          nav .nav-links a {
            color: #555;
            text-decoration: none;
            font-size: 0.95rem;
            transition: color 0.2s;
          }
          nav .nav-links a:hover { color: #1a73e8; }
          nav .user-info {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          nav .user-info img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
          }
          nav .user-name {
            font-size: 0.9rem;
            color: #333;
          }
          .btn {
            display: inline-block;
            padding: 0.5rem 1.25rem;
            border-radius: 4px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            text-decoration: none;
            transition: background 0.2s, box-shadow 0.2s;
            border: none;
          }
          .btn-primary {
            background: #1a73e8;
            color: #fff;
          }
          .btn-primary:hover { background: #1557b0; box-shadow: 0 2px 6px rgba(26,115,232,0.35); }
          .btn-outline {
            background: #fff;
            color: #555;
            border: 1px solid #ccc;
          }
          .btn-outline:hover { background: #f5f5f5; }
          main { flex: 1; }
          footer {
            background: #fff;
            border-top: 1px solid #e0e0e0;
            padding: 1.5rem 2rem;
            text-align: center;
            font-size: 0.85rem;
            color: #888;
          }
          footer a { color: #1a73e8; text-decoration: none; margin: 0 0.5rem; }
          footer a:hover { text-decoration: underline; }
        `}</style>
      </head>
      <body>
        <nav>
          <a href="/" class="logo">OC App</a>
          <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/tos">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
          {user
            ? (
              <div class="user-info">
                {user.picture && (
                  <img src={user.picture} alt={user.name} referrerpolicy="no-referrer" />
                )}
                <span class="user-name">{user.name}</span>
                <a href="/auth/logout" class="btn btn-outline">Sign out</a>
              </div>
            )
            : <a href="/auth/login" class="btn btn-primary">Sign in with Google</a>}
        </nav>
        <main>{children}</main>
        <footer>
          <p>
            &copy; {new Date().getFullYear()} OC App. All rights reserved.
            <a href="/tos">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
          </p>
        </footer>
      </body>
    </html>
  );
};
