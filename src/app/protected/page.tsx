import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <div>
            <h1>Protected Route</h1>
            <div className="mt-4">
                <Link
                    href={"/protected/private"}
                    className="p-2 rounded-sm bg-blue-500 text-white font-bold"
                >
                    Go to Private Route
                </Link>
            </div>
        </div>
    );
}
