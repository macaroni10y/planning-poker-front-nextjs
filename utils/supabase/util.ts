"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchNickname() {
    const supabase = await createClient();
    const response = await supabase.auth.getUser();
    return response.data.user?.user_metadata.display_name || "";
}
