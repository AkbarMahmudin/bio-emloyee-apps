import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { endpoints } from "@/constants/endpoint";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import Toolbar from "./_components/toolbar";
import { ExternalLink } from "lucide-react";
import AccountForm from "../_components/account-form";

interface AdminPageProps {
  searchParams: {
    name?: string;
    position?: string;
    education?: string;
  };
}

const AdminPage = async ({ searchParams }: AdminPageProps) => {
  const { data: users } =
    (await axios.get(endpoints.users, {
      params: searchParams,
      headers: {
        Authorization: `Bearer ${cookies().get("access_token")?.value}`,
      },
    })) || [];

  const { data: user } = await axios.get(endpoints.profile, {
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });

  return (
    <main className="flex flex-col gap-y-2 justify-center items-center p-6">
      <div className="mb-4">
        <AccountForm initialData={user} />
      </div>

      <Toolbar {...searchParams} />

      <Table>
        <TableCaption>
          Daftar User yang telah mendaftar di aplikasi
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Posisi</TableHead>
            <TableHead>Tempat, Tanggal Lahir</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user.email}>
              <TableCell className="font-semibold">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.bio.jobApplied}</TableCell>
              <TableCell>{user.bio.placeDateBirth}</TableCell>
              <TableCell className="w-20">
                <Link href={`/admin/${user.id}`} className="hover:text-sky-600 transition">
                  <ExternalLink />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default AdminPage;
