import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router";

import { BackupOtpPage } from "../pages/auth/backup-otp/page";
import { ForgotPasswordPage } from "../pages/auth/forgot-password/page";
import { AuthLayout } from "../pages/auth/layout";
import { LoginPage } from "../pages/auth/login/page";
import { RegisterPage } from "../pages/auth/register/page";
import { ResetPasswordPage } from "../pages/auth/reset-password/page";
import { VerifyEmailPage } from "../pages/auth/verify-email/page";
import { VerifyOtpPage } from "../pages/auth/verify-otp/page";
import { BuilderLayout } from "../pages/builder/layout";
import { builderLoader, BuilderPage } from "../pages/builder/page";
import { DashboardLayout } from "../pages/dashboard/layout";
import { ResumesPage } from "../pages/dashboard/resumes/page";
import { SettingsPage } from "../pages/dashboard/settings/page";
import { HomeLayout } from "../pages/home/layout";
import { HomePage } from "../pages/home/page";
import { ErrorPage } from "../pages/public/error";
import { publicLoader, PublicResumePage } from "../pages/public/page";
import { Providers } from "../providers";
import { AuthGuard } from "./guards/auth";
import { GuestGuard } from "./guards/guest";
import { authLoader } from "./loaders/auth";
import { UserDashboardPage } from "../pages/user-dashboard/page";
import AdminDashboardPage from "../pages/admin-dashboard/page";
import { Users } from "../pages/admin-dashboard/users/Users";
import { AdminDashboardLayout } from "../pages/admin-dashboard/layout";
import TemplatesPage from "../pages/admin-dashboard/template/page";
import AccountSettings from "../pages/admin-dashboard/account/Accountant";
import PlanPricing from "../pages/admin-dashboard/planPrice/PlanPricing";
import ExperienceLevel from "../pages/experience-level/Page";
import ChooseTemplate from "../pages/select-template/page";
import { ExperienceGuard } from "./guards/experience";
import UploadResume from "../pages/upload-resume/UploadResume";
import SubscriptionStatus from "../pages/subscription-status/SubscriptionStatus";
import AdminPlanPricing from "../pages/admin-dashboard/planPrice/AdminPlanPricing";
import Products from "../pages/admin-dashboard/products/Products";
import { LoginModal } from "../pages/auth/LoginModal";


export const routes = createRoutesFromElements(
  <Route element={<Providers />}>

    <Route errorElement={<ErrorPage />}>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route path="auth">
          
        <Route element={<AuthLayout />}>
          <Route element={<GuestGuard />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* Password Recovery */}
          <Route element={<GuestGuard />}>
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* Two-Factor Authentication */}
          <Route element={<GuestGuard />}>
            <Route path="verify-otp" element={<VerifyOtpPage />} />
            <Route path="backup-otp" element={<BackupOtpPage />} />
          </Route>

          {/* Email Verification */}
          <Route element={<AuthGuard />}>
            <Route path="verify-email" element={<VerifyEmailPage />} />
          </Route>

          {/* OAuth Callback */}
          <Route path="callback" loader={authLoader} element={<div />} />
        </Route>

        <Route index element={<Navigate replace to="/auth/login" />} />
      </Route>



      <Route path="onboard">
      <Route element={<AuthGuard />}>
      <Route element={<ExperienceGuard />}>
      <Route path="experience-level" element={<ExperienceLevel />} />
      <Route path="select-template" element={<ChooseTemplate />} />
      <Route path="upload-resume" element={<UploadResume />} />
      </Route>
      </Route>

      </Route>


      <Route path="">
        <Route element={<AuthGuard />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard/resumes" element={<ResumesPage />} />
            <Route path="dashboard/settings" element={<SettingsPage />} />
            <Route path="dashboard" element={<UserDashboardPage />} />
            <Route path="dashboard/account" element={<AccountSettings />} />
            <Route path="dashboard/plan-pricing" element={<PlanPricing />} />
            <Route path="dashboard/subscription-status" element={<SubscriptionStatus />} />
          </Route>
        </Route>
      </Route>
      <Route element={<ExperienceGuard />}>
      <Route path="plan-pricing/login" element={<LoginModal />} />
      </Route>

      <Route path="">
        <Route element={<AdminDashboardLayout />}>
              <Route path="admin" element={<AdminDashboardPage />} />
              <Route path="admin/users" element={<Users />} />
              <Route path="admin/templates" element={<TemplatesPage />} />
              <Route path="admin/pricing" element={<AdminPlanPricing />} />
              <Route path="admin/products" element={<Products />} />
        </Route>
      </Route>

 


      <Route path="builder">
        <Route element={<AuthGuard />}>
          <Route element={<BuilderLayout />}>
            <Route path=":id" loader={builderLoader} element={<BuilderPage />} />

            <Route index element={<Navigate replace to="/dashboard/resumes" />} />
          </Route>
        </Route>
      </Route>

      {/* Public Routes */}
      <Route path=":username">
        <Route path=":slug" loader={publicLoader} element={<PublicResumePage />} />
      </Route>
    </Route>
  </Route>,
);

export const router = createBrowserRouter(routes);
