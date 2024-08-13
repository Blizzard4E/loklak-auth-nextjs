"use client";
import { logOut } from "@/app/loklak";
import { useAuth } from "@/app/loklak-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
    const { user } = useAuth();
    const router = useRouter();
    return (
        <div>
            <h1>Private Page</h1>
            <h1>ID: {user?.id}</h1>
            <h1>Username: {user?.email}</h1>
            <h1>Password: {user?.username}</h1>
            <button
                onClick={async () => {
                    let logout = await logOut();
                    if (logout.status == 200) {
                        router.push("/");
                    }
                }}
                className="p-2 rounded-sm bg-red-500 text-white font-bold"
            >
                Log out
            </button>
        </div>
    );
}
