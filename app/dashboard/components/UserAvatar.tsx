import Image from "next/image";

interface UserAvatarProps {
  userName: string;
  userImage: string | null;
}

export function UserAvatar({ userName, userImage }: UserAvatarProps) {
  return (
    <div className="flex items-center gap-2.5">
      {userImage && (
        <Image
          src={userImage}
          alt={userName}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      )}
      <span className="text-sm text-white">
        Logged In As:{" "}
        <span className="font-semibold text-white uppercase pl-1">
          {userName}
        </span>
      </span>
    </div>
  );
}
