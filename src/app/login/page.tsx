"use client";
import Image from "next/image";
import { login } from "../loklak";
import { useAuth } from "../loklak-auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const { user, setUser } = useAuth();
    const [error, setError] = useState(false);
    const router = useRouter();
    return (
        <div>
            <h1>Login Page</h1>
            <form
                action={async (formData: FormData) => {
                    setError(false);
                    let response = await login(formData);
                    if (response.status == 200) {
                        if (response.user) {
                            setUser({
                                id: response.user.id,
                                username: response.user.username,
                                email: response.user.email,
                            });
                        }
                        router.push("/");
                    } else {
                        setError(true);
                    }
                }}
                className="grid gap-4 w-80"
            >
                <input
                    name="email"
                    type="text"
                    placeholder="Email address..."
                    className="w-full text-lg text-white px-2 py-1 bg-gray-800 rounded-md focus:outline-none focus:outline-emerald-500"
                />
                <input
                    name="password"
                    type="text"
                    placeholder="Password..."
                    className="w-full text-lg text-white px-2 py-1 bg-gray-800 rounded-md focus:outline-none focus:outline-emerald-500"
                />
                {error && (
                    <p className="text-red-500">Wrong email or password</p>
                )}
                <div className="grid place-items-center">
                    <button className="text-lg text-white bg-emerald-500 px-3 py-1 rounded-md">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
