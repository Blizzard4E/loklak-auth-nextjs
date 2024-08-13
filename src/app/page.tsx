import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>Public Home Page</h1>
            <div className="mt-4">
                <Link
                    href={"/protected"}
                    className="p-2 rounded-sm bg-blue-500 text-white font-bold"
                >
                    Go to Protected Route
                </Link>
            </div>
        </div>
    );
}
