"use client";
import { loginAnonymously } from "@/app/(routes)/login/action";
import ActionButton from "@/app/_components/uiparts/ActionButton";
import Header from "@/app/_components/uiparts/Header";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
	const inputStyle =
		"w-full text-xs h-10 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-300";
	const labelStyle = "m-1 text-xs text-left w-full";

	const [state, formAction] = useFormState(loginAnonymously, { message: "" });

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

	useEffect(() => {
		if (state.message === "") {
			toast.info(
				"macaroni poker now supports anonymous sign-in instead of e-mail sign-in. All accounts created with e-mail have been deleted. Thanks for your understanding and cooperation!",
				{
					position: "top-center",
					autoClose: false,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				},
			);
		}
	}, [state]);

	return (
		<>
			<div className="absolute w-full">
				<Header />
			</div>
			<div className="h-screen bg-pink-50 flex items-center justify-center flex-col">
				<div className="h-1/3 bg-white rounded-xl w-2/3 max-w-sm flex flex-col justify-center shadow-xl items-center">
					<h1 className="text-2xl font-bold">Sign In</h1>
					<form className="flex flex-col w-10/12 items-center">
						<label className={labelStyle} htmlFor="email">
							Nickname
						</label>
						<input
							className={inputStyle}
							type="text"
							name="nickname"
							placeholder="John Doe"
							required={true}
						/>
						<ActionButton text="Continue" formAction={formAction} />
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
