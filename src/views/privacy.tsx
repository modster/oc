/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";
import { Layout } from "./layout.tsx";

interface PrivacyProps {
  user?: { name: string; email: string; picture?: string } | null;
}

export const PrivacyPage: FC<PrivacyProps> = ({ user }) => {
  const lastUpdated = "February 24, 2026";
  return (
    <Layout title="Privacy Policy" user={user}>
      <div style="max-width:760px;margin:3rem auto;padding:0 1.5rem;">
        <h1 style="font-size:2rem;font-weight:700;color:#1a1a1a;margin-bottom:0.5rem;">
          Privacy Policy
        </h1>
        <p style="color:#888;font-size:0.9rem;margin-bottom:2.5rem;">
          Last updated: {lastUpdated}
        </p>

        <section style="background:#fff;border-radius:8px;padding:2rem;box-shadow:0 1px 6px rgba(0,0,0,0.07);line-height:1.75;color:#444;">
          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            1. Introduction
          </h2>
          <p style="margin-bottom:1.5rem;">
            OC App ("we", "our", or "us") is committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, and safeguard your information when you use our
            Service.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            2. Information We Collect
          </h2>
          <p style="margin-bottom:0.75rem;">
            When you sign in with Google, we receive the following information from Google:
          </p>
          <ul style="margin-bottom:1.5rem;padding-left:1.5rem;">
            <li style="margin-bottom:0.4rem;">Your name</li>
            <li style="margin-bottom:0.4rem;">Your email address</li>
            <li style="margin-bottom:0.4rem;">Your profile picture (if available)</li>
            <li style="margin-bottom:0.4rem;">A unique identifier for your Google account</li>
          </ul>
          <p style="margin-bottom:1.5rem;">
            We do not collect passwords or other sensitive credentials. Authentication is handled
            entirely by Google's secure OAuth 2.0 infrastructure.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            3. How We Use Your Information
          </h2>
          <p style="margin-bottom:0.75rem;">We use the information we collect to:</p>
          <ul style="margin-bottom:1.5rem;padding-left:1.5rem;">
            <li style="margin-bottom:0.4rem;">Authenticate and identify you within the Service</li>
            <li style="margin-bottom:0.4rem;">Display your name and profile picture in the UI</li>
            <li style="margin-bottom:0.4rem;">Maintain your session while you are signed in</li>
            <li style="margin-bottom:0.4rem;">
              Improve and monitor the performance of the Service
            </li>
          </ul>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            4. Data Storage and Security
          </h2>
          <p style="margin-bottom:1.5rem;">
            Your profile information is stored in a secure, encrypted session cookie on your
            browser and is not persisted on our servers beyond your active session. We implement
            appropriate technical and organizational measures to protect your data against
            unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            5. Data Sharing
          </h2>
          <p style="margin-bottom:1.5rem;">
            We do not sell, trade, or otherwise transfer your personal information to third
            parties. We may share data only when required by law or with your explicit consent.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            6. Google OAuth
          </h2>
          <p style="margin-bottom:1.5rem;">
            This Service uses Google OAuth 2.0 for authentication. By using our Service, you also
            agree to Google's{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              style="color:#1a73e8;"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style="color:#1a73e8;"
            >
              Privacy Policy
            </a>
            . We only request the minimum scopes necessary (profile and email) to identify you.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            7. Cookies
          </h2>
          <p style="margin-bottom:1.5rem;">
            We use a single session cookie to maintain your authenticated state. This cookie is
            set with the <code>HttpOnly</code>, <code>Secure</code>, and <code>SameSite=Lax</code>{" "}
            attributes to protect against common web attacks. The cookie is deleted when you sign
            out or when your session expires.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            8. Your Rights
          </h2>
          <p style="margin-bottom:0.75rem;">You have the right to:</p>
          <ul style="margin-bottom:1.5rem;padding-left:1.5rem;">
            <li style="margin-bottom:0.4rem;">Access the personal data we hold about you</li>
            <li style="margin-bottom:0.4rem;">
              Request deletion of your data by signing out and revoking access in your{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                style="color:#1a73e8;"
              >
                Google Account settings
              </a>
            </li>
            <li style="margin-bottom:0.4rem;">Withdraw consent at any time by signing out</li>
          </ul>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            9. Children's Privacy
          </h2>
          <p style="margin-bottom:1.5rem;">
            The Service is not directed to children under the age of 13. We do not knowingly
            collect personal information from children under 13.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            10. Changes to This Policy
          </h2>
          <p style="margin-bottom:1.5rem;">
            We may update this Privacy Policy from time to time. We will notify you of any
            significant changes by updating the "Last updated" date at the top of this page.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            11. Contact
          </h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us
            through the application.
          </p>
        </section>
      </div>
    </Layout>
  );
};
