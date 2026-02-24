/** @jsxImportSource hono/jsx */
import type { FC } from "hono/jsx";
import { Layout } from "./layout.tsx";

interface TosProps {
  user?: { name: string; email: string; picture?: string } | null;
}

export const TosPage: FC<TosProps> = ({ user }) => {
  const lastUpdated = "February 24, 2026";
  return (
    <Layout title="Terms of Service" user={user}>
      <div style="max-width:760px;margin:3rem auto;padding:0 1.5rem;">
        <h1 style="font-size:2rem;font-weight:700;color:#1a1a1a;margin-bottom:0.5rem;">
          Terms of Service
        </h1>
        <p style="color:#888;font-size:0.9rem;margin-bottom:2.5rem;">
          Last updated: {lastUpdated}
        </p>

        <section style="background:#fff;border-radius:8px;padding:2rem;box-shadow:0 1px 6px rgba(0,0,0,0.07);line-height:1.75;color:#444;">
          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            1. Acceptance of Terms
          </h2>
          <p style="margin-bottom:1.5rem;">
            By accessing or using OC App ("the Service"), you agree to be bound by these Terms of
            Service. If you do not agree to these terms, please do not use the Service.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            2. Description of Service
          </h2>
          <p style="margin-bottom:1.5rem;">
            OC App provides a web-based platform that allows users to authenticate using their
            Google account via OAuth 2.0. We use your Google account information solely for
            authentication purposes.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            3. User Accounts
          </h2>
          <p style="margin-bottom:1.5rem;">
            To use the Service, you must sign in with a valid Google account. You are responsible
            for maintaining the security of your Google account. We are not liable for any loss or
            damage arising from unauthorized use of your account.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            4. Acceptable Use
          </h2>
          <p style="margin-bottom:0.75rem;">You agree not to:</p>
          <ul style="margin-bottom:1.5rem;padding-left:1.5rem;">
            <li style="margin-bottom:0.4rem;">Use the Service for any unlawful purpose</li>
            <li style="margin-bottom:0.4rem;">
              Attempt to gain unauthorized access to any part of the Service
            </li>
            <li style="margin-bottom:0.4rem;">
              Interfere with or disrupt the integrity or performance of the Service
            </li>
            <li style="margin-bottom:0.4rem;">
              Transmit any harmful, offensive, or disruptive content
            </li>
          </ul>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            5. Intellectual Property
          </h2>
          <p style="margin-bottom:1.5rem;">
            All content, features, and functionality of the Service are owned by OC App and are
            protected by applicable intellectual property laws. You may not copy, modify, or
            distribute any part of the Service without our prior written consent.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            6. Disclaimer of Warranties
          </h2>
          <p style="margin-bottom:1.5rem;">
            The Service is provided "as is" and "as available" without any warranties of any kind,
            either express or implied. We do not warrant that the Service will be uninterrupted,
            error-free, or free of viruses or other harmful components.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            7. Limitation of Liability
          </h2>
          <p style="margin-bottom:1.5rem;">
            To the fullest extent permitted by law, OC App shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising out of your use of
            the Service.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            8. Changes to Terms
          </h2>
          <p style="margin-bottom:1.5rem;">
            We reserve the right to modify these Terms at any time. We will notify users of
            significant changes by updating the "Last updated" date. Continued use of the Service
            after changes constitutes acceptance of the new Terms.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            9. Governing Law
          </h2>
          <p style="margin-bottom:1.5rem;">
            These Terms shall be governed by and construed in accordance with applicable laws,
            without regard to conflict of law provisions.
          </p>

          <h2 style="font-size:1.15rem;font-weight:600;color:#1a1a1a;margin-bottom:0.75rem;">
            10. Contact
          </h2>
          <p>
            If you have any questions about these Terms, please contact us through the application.
          </p>
        </section>
      </div>
    </Layout>
  );
};
