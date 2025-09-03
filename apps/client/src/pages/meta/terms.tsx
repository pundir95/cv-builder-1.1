import { t } from "@lingui/macro";
import { Helmet } from "react-helmet-async";

export const TermsPage = () => {
  return (
    <div className="container py-10">
      <Helmet>
        <title>{t`Terms & Conditions`} - {t`Reactive Resume`}</title>
      </Helmet>

      <h1 className="mb-6 text-3xl font-semibold">
        {t`Terms & Conditions`}
      </h1>

      <div className="prose prose-zinc dark:prose-invert">
        <p>
          {t`Welcome to our Terms & Conditions. Please read these terms carefully before using the service.`}
        </p>

        <h2>{t`1. Acceptance of Terms`}</h2>
        <p>
          {t`By accessing or using this service, you agree to be bound by these terms.`}
        </p>

        <h2>{t`2. Use of the Service`}</h2>
        <p>
          {t`You agree not to misuse the service or help anyone else to do so.`}
        </p>

        <h2>{t`3. Accounts`}</h2>
        <p>
          {t`You are responsible for maintaining the confidentiality of your account and password.`}
        </p>

        <h2>{t`4. Intellectual Property`}</h2>
        <p>
          {t`All content, trademarks, and data on the service are the property of their respective owners.`}
        </p>

        <h2>{t`5. Termination`}</h2>
        <p>
          {t`We may suspend or terminate access immediately, without prior notice, for any reason.`}
        </p>

        <h2>{t`6. Limitation of Liability`}</h2>
        <p>
          {t`To the maximum extent permitted by law, we shall not be liable for any indirect or consequential damages.`}
        </p>

        <h2>{t`7. Changes to Terms`}</h2>
        <p>
          {t`We may update these terms from time to time. Continued use of the service constitutes acceptance of the new terms.`}
        </p>

        <h2>{t`8. Contact Us`}</h2>
        <p>
          {t`If you have any questions about these Terms & Conditions, please contact support.`}
        </p>
      </div>
    </div>
  );
};

export default TermsPage;


