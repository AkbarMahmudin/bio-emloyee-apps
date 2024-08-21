import { endpoints } from '@/constants/endpoint';
import axios from 'axios';
import { cookies } from 'next/headers';
import React from 'react'
import UserForm from '../../_components/user-form';

const DetailUserPage = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const { data: user } = await axios.get(`${endpoints.users}/${params.userId}`, {
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });

  return (
    <main className="flex flex-col justify-center items-center gap-y-3">
      <UserForm user={user} />
    </main>
  );

  return (
    <div>DetailUserPage</div>
  )
}

export default DetailUserPage