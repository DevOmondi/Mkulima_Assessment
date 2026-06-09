import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  onLogout: () => void;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <button
      onClick={onLogout}
      className="text-sm font-medium px-4 py-1.5 rounded-lg border border-white/40 text-white hover:bg-white/10 transition cursor-pointer flex items-center gap-1"
    >
      Logout
      <LogOut className="w-4 h-4 inline-block ml-1" />
    </button>
  );
}
