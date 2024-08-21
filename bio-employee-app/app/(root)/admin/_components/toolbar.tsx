"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import qs from "query-string";

interface ToolbarProps {
  name?: string;
  position?: string;
  education?: string;
}

const Toolbar = ({}: ToolbarProps) => {
  const [form, setForm] = useState({
    name: "",
    position: "",
    education: "",
  });

  const router = useRouter();

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: "/admin",
      query: form,
    });
    router.push(url);

    setForm({
      name: "",
      position: "",
      education: "",
    });
  };

  return (
    <div className="w-full grid grid-cols-4 gap-2 mb-3">
      <Input
        name="name"
        placeholder="Cari nama"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        name="position"
        placeholder="Cari posisi"
        value={form.position}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
      />
      <Input
        name="education"
        placeholder="Cari jenis pendidikan"
        value={form.education}
        onChange={(e) => setForm({ ...form, education: e.target.value })}
      />

      <Button onClick={onClick}>Cari</Button>
    </div>
  );
};

export default Toolbar;
