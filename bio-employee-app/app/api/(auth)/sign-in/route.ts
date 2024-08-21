import { endpoints } from "@/constants/endpoint";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const result = await axios.post(endpoints.signIn, data);
    const { access_token } = result.data;

    if (access_token) {
      cookies().set("access_token", access_token)
    }
  
    return NextResponse.json("Sign in successful", {
      status: 200,
    })
  } catch (error) {
    throw new NextResponse("Something went wrong", {
      status: 500,
    })
  }
}