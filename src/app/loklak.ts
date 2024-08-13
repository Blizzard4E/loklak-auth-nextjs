"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const expiresInSeconds = 3600; // Expiration time in seconds (e.g., 1 hour)
const expirationTime = new Date();
expirationTime.setTime(expirationTime.getTime() + expiresInSeconds * 1000);
const sessionCookieName = "session_token";

function setTokenCookie(tokenValue: string, date: Date) {
    cookies().set({
        name: sessionCookieName,
        value: tokenValue,
        httpOnly: true,
        secure: true,
        path: "/",
        expires: date,
    });
}

export async function login(formData: FormData) {
    let testUser = {
        email: "123@gmail.com",
        password: "123",
    };
    //console.log(formData);
    // let res = await fetch("http://localhost:8080/login", {
    //     method: "POST",
    //     cache: "no-store",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         email: formData.get("email"),
    //         password: formData.get("password"),
    //     }),
    // });
    //let data = await res.json();
    let data = {
        sessionToken: "sracsdadsasd",
        user: {
            id: "u01",
            username: "John123",
            email: "123@gmail.com",
        },
    };
    let res = {
        status: 400,
    };
    if (
        formData.get("email") == testUser.email &&
        formData.get("password") == testUser.password
    ) {
        res.status = 200;
    }
    if (res.status == 200) {
        console.log(data);
        setTokenCookie(data.sessionToken, expirationTime);
        return {
            status: 200,
            message: "success",
            user: data.user,
        };
    }
    return { status: 400, message: "Wrong Email or Password" };
}

export async function getSession() {
    const cookieList = cookies();
    if (cookieList.has(sessionCookieName)) {
        const sessionToken = cookieList.get(sessionCookieName);
        if (sessionToken) {
            // let res = await fetch("http://localhost:8080/user-info", {
            //     cache: "no-store",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Cookie: cookies().toString(),
            //     },
            // });
            // let data = await res.json();
            let data = {
                id: "u01",
                username: "John",
                email: "john@email.com",
            };
            let res = {
                status: 200,
            };
            if (res.status == 400) {
                cookies().delete(sessionCookieName);
                return null;
            }
            return { id: data.id, username: data.username, email: data.email };
        }
    }
    return null;
}
export async function logOut() {
    const cookieList = cookies();
    if (cookieList.has(sessionCookieName)) {
        cookies().delete(sessionCookieName);
    }
    return { status: 200 };
}
