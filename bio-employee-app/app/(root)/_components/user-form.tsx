"use client";

import AccountForm from "./account-form";
import BioForm from "./bio-form";
import EducationForm from "./education-form";
import TrainingForm from "./training-form";
import ExperienceForm from "./experience-form";
import { useRouter } from "next/navigation";

const UserForm = ({ user }: any) => {
  const router = useRouter();

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  if (user?.role === "ADMIN") {
    router.push("/admin");
    return null;
  }

  return (
    <>
      <section>
        <AccountForm initialData={user} />
      </section>
      <div className="grid grid-cols-2 gap-x-4 w-full">
        <section>
          <BioForm initialData={user.bio} />
        </section>

        <div>
          <section>
            <EducationForm initialData={user.bio ? user.bio.educations : []} />
          </section>
          <section>
            <TrainingForm initialData={user.bio ? user.bio.trainings : []} />
          </section>
          <section>
            <ExperienceForm
              initialData={user.bio ? user.bio.experiences : []}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default UserForm;
