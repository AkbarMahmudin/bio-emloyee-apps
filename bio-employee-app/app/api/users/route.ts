import { endpoints } from "@/constants/endpoint";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const accessToken = cookies().get("access_token")?.value;
    const response = await axios.patch(endpoints.users, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    throw new NextResponse("Something went wrong", { status: 500 });
  }
}