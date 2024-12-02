import { Metadata } from "next";

import { Login } from "@/components";
import { AuthRedirect } from "@/components";
import { HomeNavbar } from "@/components";

export const metadata: Metadata = {
  title: "Login to Market Management",
  description: "Login to my market management app to get started.",
};

export default function login() {
  return (
    
    <AuthRedirect>
      <div className="login">
      
        <Login/>
      </div>
    </AuthRedirect>
  );
}
