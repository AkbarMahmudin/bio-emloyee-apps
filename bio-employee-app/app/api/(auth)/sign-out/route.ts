import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const accessToken = cookies().get("access_token")?.value;
  
    if (!accessToken) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }
  
    cookies().delete("access_token");
  
    return NextResponse.json("Signed out");
  } catch (error) {
    console.error(error);
    throw new NextResponse("Something went wrong", { status: 500 });
  }
};
