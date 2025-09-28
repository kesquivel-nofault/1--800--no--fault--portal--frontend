import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Label from "../../../shared/ui/components/form/Label";
import Checkbox from "../../../shared/ui/components/form/input/Checkbox";
import Input from "../../../shared/ui/components/form/input/InputField";
import { OtpInput } from "../../../shared/ui/components/form/input/input-otp/OtpInput";
import Button from "../../../shared/ui/components/ui/button/Button";
import { formatTimer } from "../../../shared/ui/utils/format-timer";
import { useAuth } from "../application/hooks/use-auth";
import {
  CodeStepForm,
  codeStepSchema,
  EmailStepForm,
  emailStepSchema,
} from "../domian/schemas/sign-in.schema";
import { MockAuthRepository } from "../infrastructure/repository/authHttpRepository";

export default function SignInForm() {
  const repo = new MockAuthRepository();
  const {
    validateEmail,
    generateCode,
    verifyCode,
    resetAuth,
    isEmailValid,
    msgError,
    timer,
  } = useAuth(repo);

  const [rememberMe, setRememberMe] = useState(false);

  const methods = useForm<EmailStepForm | CodeStepForm>({
    resolver: zodResolver(isEmailValid ? codeStepSchema : emailStepSchema),
    defaultValues: { email: "", code: "" },
    mode: "onChange",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      methods.reset({ email: savedEmail, code: "" });
      setRememberMe(true);
    }
  }, []);

  const onSubmit = (data: EmailStepForm | CodeStepForm) => {
    if (!isEmailValid) {
      validateEmail((data as EmailStepForm).email);
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", (data as EmailStepForm).email);
      }
    } else {
      verifyCode((data as CodeStepForm).code);
    }
  };

  const handleEditEmail = () => {
    methods.reset({ email: "", code: "" });
    resetAuth();
    setRememberMe(false);
  };

  return (
    <section className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto"></div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isEmailValid
                ? "Enter the 6-digit verification code we sent to your email."
                : "Enter your email address and we’ll send you a verification code to sign in securely."}
            </p>
          </div>

          <FormProvider {...methods}>
            <div className="flex flex-col gap-8">
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="info@gmail.com"
                  name="email"
                  control={methods.control}
                  disabled={isEmailValid}
                />
              </div>

              {msgError && !isEmailValid && (
                <p className="text-sm text-error-500 mt-[-30px]">{msgError}</p>
              )}

              {isEmailValid && (
                <div className="space-y-4">
                  <OtpInput
                    name="code"
                    control={methods.control}
                    length={6}
                    className="dark:text-white"
                  />

                  {msgError && (
                    <p className="text-sm text-error-500 mt-[-10px]">
                      {msgError}
                    </p>
                  )}

                  <p className="text-sm text-gray-500">
                    A verification code has been sent to your email.
                  </p>

                  <div className="flex items-center justify-between space-x-3">
                    <span className=" text-sm text-gray-500">
                      Change email?{" "}
                      <span
                        className="font-medium text-brand-500 hover:underline cursor-pointer"
                        onClick={handleEditEmail}
                      >
                        Edit
                      </span>
                    </span>

                    <span className=" text-sm text-gray-500">
                      Didn&apos;t receive the code?
                      <span
                        className="ml-1 font-medium text-brand-500 hover:underline cursor-pointer"
                        onClick={() => generateCode(methods.getValues("email"))}
                      >
                        Resend
                      </span>
                    </span>
                  </div>

                  {timer > 0 ? (
                    <Button
                      className="text-sm text-gray-500 w-[200px]"
                      disabled={true}
                      variant="outline"
                    >
                      Code expires in{" "}
                      <span className="font-medium">{formatTimer(timer)}</span>
                    </Button>
                  ) : (
                    <span className="text-sm font-medium text-error-500">
                      Code expired. Please resend the code.
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={rememberMe} onChange={setRememberMe} />
                  <span
                    className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400 cursor-pointer"
                    onClick={() => setRememberMe(!rememberMe)}
                  >
                    Remember my email
                  </span>
                </div>
              </div>

              <div>
                <Button
                  className="w-full"
                  size="sm"
                  onClick={methods.handleSubmit(onSubmit)}
                >
                  {isEmailValid ? "Sign In" : "Send Code"}
                </Button>
              </div>
            </div>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
