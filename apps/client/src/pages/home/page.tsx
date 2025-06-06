import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Navigate } from "react-router";

export const HomePage = () => {
  const { i18n } = useLingui();
  
  return <Navigate to="/auth/login" />

};
