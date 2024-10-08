import { Metadata } from "next";
import { Register } from '@/components';

export const metadata: Metadata = {
  title: "Register to Market Management",
  description: "Register to my market management app to create an account.",
};

export default function register() {
  return (
    <div className="register">
        <Register />
    </div>
  )
}
