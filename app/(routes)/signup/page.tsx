"use client";
import {signup} from "@/app/(routes)/signup/action";
import ActionButton from "@/app/_components/uiparts/ActionButton";
import Header from "@/app/_components/uiparts/Header";
import React from "react";
import Link from "next/link";

const Page = () => {
    const inputStyle = "w-full text-xs h-10 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-300";
    const labelStyle = "m-1 text-xs text-left w-full";

    return (
        <>
            <div className="absolute w-full">
                <Header/>
            </div>
            <div className="h-screen bg-pink-50 flex items-center justify-center flex-col">
                <div
                    className="h-1/2 bg-white rounded-xl w-2/3 max-w-sm flex flex-col justify-evenly shadow-xl items-center"
                >
                    <form className="flex flex-col w-10/12 items-center">
                        <label className={labelStyle} htmlFor="nickname">
                            nickname
                        </label>
                        <input
                            className={inputStyle}
                            type="text"
                            name="nickname"
                            placeholder="nickname"
                            required={true}
                        />
                        <label className={labelStyle} htmlFor="email">
                            email
                        </label>
                        <input
                            className={inputStyle}
                            type="email"
                            name="email"
                            placeholder="email"
                            required={true}
                        />
                        <label className={labelStyle} htmlFor="password">
                            password
                        </label>
                        <input
                            className={inputStyle}
                            type="password"
                            name="password"
                            placeholder="password"
                            required={true}
                        />
                        <ActionButton text="Sign Up" formAction={signup}/>
                        <Link href="/login" className="text-gray-500 text-xs hover:underline">
                            Already registered? Sign In
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Page;
