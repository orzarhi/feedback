import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginLink>Sign in</LoginLink>

      <RegisterLink>Sign up</RegisterLink>

      <LogoutLink>Sign out</LogoutLink>
    </main>
  );
}
