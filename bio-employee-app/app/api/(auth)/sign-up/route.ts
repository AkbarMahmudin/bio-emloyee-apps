import { endpoints } from "@/constants/endpoint";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    await axios.post(endpoints.signUp, data);
  
    return NextResponse.json("Sign in successful", {
      status: 200,
    })
  } catch (error) {
    throw new NextResponse("Something went wrong", {
      status: 500,
    })
  }
}