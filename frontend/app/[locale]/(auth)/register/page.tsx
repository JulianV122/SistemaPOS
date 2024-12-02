import { Metadata } from "next";
import { StepperRegister } from '@/components';
import { AuthRedirect } from '@/components';

export const metadata: Metadata = {
  title: "Register to Market Management",
  description: "Register to my market management app to create an account.",
};

export default function register() {
  return (
    <AuthRedirect>
      <div className="register">
          <StepperRegister />
      </div>
    </AuthRedirect>
  )
}
