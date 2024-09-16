import { Metadata } from "next";

import { LoginForm } from "@/components";

export const metadata: Metadata = {
  title: "Login to Market Management",
  description: "Login to my market management app to get started.",
};

export default function login() {
  return (
    <div className="login">
      <LoginForm/>
    </div>
  );
}
