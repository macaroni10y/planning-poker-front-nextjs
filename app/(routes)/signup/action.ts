"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

/**
 * Signup the user
 * expects email, password and nickname in the form data
 * @param formData
 */
export async function signup(formData: FormData) {
	const supabase = createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		options: {
			data: {
				nickname: formData.get("nickname") as string,
			},
		},
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		redirect("/signup?error=signup_failed");
	}

	revalidatePath("/", "layout");
	redirect("/");
}
