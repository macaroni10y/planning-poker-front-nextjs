"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

/**
 * Login the user
 * expects email and password in the form data
 * @param prevState
 * @param formData
 */
export async function login(
	prevState: { message: string },
	formData: FormData,
) {
	const supabase = createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		return { message: error.message };
	}

	revalidatePath("/", "layout");
	redirect("/");
}
