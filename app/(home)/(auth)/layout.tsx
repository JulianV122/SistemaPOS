export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <section className="flex justify-center bg-white content-center">
        {children}
      </section>
    </div>

  );
}
