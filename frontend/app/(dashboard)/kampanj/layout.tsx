import PageIllustration from "@/components/page-illustration";
import { UserProvider } from "@/contexts/UserContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className="relative flex grow flex-col">
        <PageIllustration multiple />

        {children}
      </main>
  );
}
