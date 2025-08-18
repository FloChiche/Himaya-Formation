// src/pages/ProtectedPage.tsx
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "@/context/SessionContext";
import { Button } from "@/components/ui/button";
import supabase from "@/supabase";

export default function ProtectedPage() {
  const { session } = useSession();
  const navigate = useNavigate();

  return (
    <main className="max-w-3xl mx-auto flex flex-col gap-4">
      <h1 className="text-3xl font-bold">This is a Protected Page</h1>
      <p>Current User : {session?.user.email || "None"}</p>
      <div className="flex gap-3">
        <Button asChild><Link to="/">◄ Home</Link></Button>
        <Button
          onClick={() => supabase.auth.signOut().then(() => navigate("/"))}
          variant="secondary"
        >
          Sign Out
        </Button>
      </div>
    </main>
  );
}
