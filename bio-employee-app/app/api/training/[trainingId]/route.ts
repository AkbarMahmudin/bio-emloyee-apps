import { endpoints } from "@/constants/endpoint";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { trainingId: string } }
) => {
  try {
    const data = await req.json();
    const accessToken = cookies().get("access_token")?.value;

    const response = await axios.patch(`${endpoints.training}/${params.trainingId}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error(error);
    throw new NextResponse("Something went wrong", { status: 500 });
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { trainingId: string } }
) => {
  try {
    const accessToken = cookies().get("access_token")?.value;

    const response = await axios.delete(`${endpoints.training}/${params.trainingId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error(error);
    throw new NextResponse("Something went wrong", { status: 500 });
  }
}