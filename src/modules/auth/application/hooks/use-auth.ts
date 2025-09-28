import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { routes } from "../../../../router/routes";
import { AuthRepository } from "../../domian/interfaces/auth.repository";
import { User } from "../../domian/interfaces/user.interface";
import { useUserStore } from "../stores/user-store";

export function useAuth(repo: AuthRepository) {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [msgError, setMsgError] = useState("");

  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

  const setMessageError = (message: string) => {
    setMsgError(message);
    setTimeout(() => setMsgError(""), 3000);
  };

  const resetAuth = async () => {
    await repo.resetAuth();
    setEmail("");
    setUser(null);
    setIsEmailValid(false);

    setTimer(0);
    setIsLoggedIn(false);
    setMsgError("");
  };

  const validateEmail = async (inputEmail: string) => {
    try {
      const valid = await repo.validateEmail(inputEmail);
      if (valid) {
        setEmail(inputEmail);
        setUser(valid as User);
        setIsEmailValid(true);
        generateCode(inputEmail);
      } else {
        setMessageError("Email not found");
      }
    } catch (err) {
      setMessageError((err as Error).message);
    }
  };

  const generateCode = async (inputEmail: string) => {
    try {
      await repo.generateCode(inputEmail);
      setTimer(120);
    } catch (err) {
      setMessageError((err as Error).message);
    }
  };

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const verifyCode = async (inputCode: string) => {
    try {
      const success = await repo.verifyCode(email, inputCode);
      if (success) {
        setIsLoggedIn(true);
        login(user!);
        navigate("/" + routes.pages.home, { replace: true });
      } else {
        setMessageError("Invalid code");
      }
    } catch (err) {
      setMessageError((err as Error).message);
    }
  };

  return {
    msgError,
    email,
    isEmailValid,
    isLoggedIn,
    timer,
    validateEmail,
    generateCode,
    verifyCode,
    resetAuth,
  };
}
