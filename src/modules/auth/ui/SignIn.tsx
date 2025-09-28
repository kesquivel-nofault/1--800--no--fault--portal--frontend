import PageMeta from "../../../shared/ui/components/common/PageMeta";
import AuthLayout from "../../../shared/ui/pages/AuthPages/AuthPageLayout";
import SignInForm from "./SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In - 1800nofault Portal"
        description=" Sign in to access the 1800nofault portal"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
