export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen bg-white">
        <div className="">
        </div>
        <section className="flex justify-center bg-white p-5">
            {children}
        </section>
    </div>
  );
}
