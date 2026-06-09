import { UserAvatar } from "./UserAvatar";
import { LogoutButton } from "./LogoutButton";

interface DashboardHeaderProps {
  userName: string | null;
  userImage: string | null;
  onLogout: () => void;
}

export function DashboardHeader({
  userName,
  userImage,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header
      className="sticky top-0 z-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/mkulima_auth_img.png')" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <span className="text-xl font-bold text-white">
          Inua Mkulima Subsidy Program
        </span>
        <div className="flex items-center gap-4">
          {userName && (
            <UserAvatar userName={userName} userImage={userImage} />
          )}
          <LogoutButton onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}
