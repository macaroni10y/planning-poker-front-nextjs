"use client";
import React, {useState} from "react";
import {supabase} from "@/app/_lib/supabase";
import Header from "@/app/_components/uiparts/Header";
import TheButton from "@/app/_components/uiparts/TheButton";

const Page = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
	const [handleName, setHandleName] = useState<string>("");

	const handleSignIn = async () => {
		await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
	};
	const handleSignUp = async () => {
		await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					handleName: handleName,
				}
			}
		});
	};



	return (
		<>
			<div className="absolute w-full">
				<Header />
			</div>
			<div className="h-screen bg-pink-50 flex items-center justify-center flex-col">
				<div className="bg-white rounded-xl w-2/3 max-w-sm h-2/5 flex flex-col justify-evenly shadow-xl items-center">
					<div className="flex flex-col">
						<input className="m-2" type="text" placeholder="nickname" onChange={event => setHandleName(event.target.value)}/>
						<input className="m-2" type="text" placeholder="email" onChange={event => setEmail(event.target.value)}/>
						<input className="m-2" type="password" placeholder="password" onChange={event => setPassword(event.target.value)}/>
					</div>
					<TheButton text="Sign In" onClick={handleSignIn}/>
					<TheButton text="Sign Up" onClick={handleSignUp}/>
				</div>
			</div>
		</>
	);
};

export default Page;
