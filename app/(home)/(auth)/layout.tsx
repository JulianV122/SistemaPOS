export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex justify-center bg-white p-5">
      {children}
    </section>
  );
}
