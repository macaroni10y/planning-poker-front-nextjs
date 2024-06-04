"use client";
import { login } from "@/app/(routes)/login/action";
import ActionButton from "@/app/_components/uiparts/ActionButton";
import Header from "@/app/_components/uiparts/Header";
import Link from "next/link";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
	const inputStyle =
		"w-full text-xs h-10 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-300";
	const labelStyle = "m-1 text-xs text-left w-full";

	const [state, formAction] = useFormState(login, { message: "" });

	useEffect(() => {
		if (state.message) {
			toast.error(state.message, {
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Bounce,
			});
		}
	}, [state]);

	return (
		<>
			<div className="absolute w-full">
				<Header />
			</div>
			<div className="h-screen bg-pink-50 flex items-center justify-center flex-col">
				<div className="h-2/5 bg-white rounded-xl w-2/3 max-w-sm flex flex-col justify-evenly shadow-xl items-center">
					<form className="flex flex-col w-10/12 items-center">
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
						<ActionButton text="Sign In" formAction={formAction} />
						<Link
							href="/signup"
							className="text-gray-500 text-xs hover:underline"
						>
							Not yet registered? Sign Up
						</Link>
					</form>
				</div>
			</div>
			<ToastContainer
				className={"absolute"}
				position="bottom-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
		</>
	);
};

export default Page;
