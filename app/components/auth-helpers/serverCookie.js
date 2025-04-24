"use server";
import { cookies } from "next/headers";

export async function getServerCookie(name) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);
  return cookie ? cookie.value : null;
}
