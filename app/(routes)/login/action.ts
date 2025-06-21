"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

/**
 * Login the user
 * expects email and password in the form data
 * @param _prevState
 * @param formData
 */
export async function login(
    _prevState: { message: string },
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

/**
 * Login the user anonymously
 * expects nickname in the form data
 * @param _prevState
 * @param formData
 */
export async function loginAnonymously(
    _prevState: { message: string },
    formData: FormData,
) {
    const supabase = createClient();

    const input = {
        display_name: formData.get("nickname") as string,
    };

    const { error } = await supabase.auth.signInAnonymously();

    if (error) {
        return { message: error.message };
    }
    await supabase.auth.updateUser({
        data: input,
    });

    revalidatePath("/", "layout");
    redirect("/");
}
