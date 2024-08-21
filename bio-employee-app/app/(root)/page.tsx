import axios from "axios";
import { cookies } from "next/headers";

import { endpoints } from "@/constants/endpoint";
import AccountForm from "./_components/account-form";
import { redirect } from "next/navigation";
import BioForm from "./_components/bio-form";
import EducationForm from "./_components/education-form";
import TrainingForm from "./_components/training-form";
import ExperienceForm from "./_components/experience-form";
import UserForm from "./_components/user-form";

export default async function Home() {
  try {
    const { data: user } = await axios.get(endpoints.profile, {
      headers: {
        Authorization: `Bearer ${cookies().get("access_token")?.value}`,
      },
    });

    return (
      <main className="flex flex-col justify-center items-center gap-y-3">
        <UserForm user={user} />
      </main>
    );
  } catch (error: any) {
    if (error.response?.status === 401) {
      // cookies().delete("access_token");
      redirect("/sign-in");
    }
  }
}
