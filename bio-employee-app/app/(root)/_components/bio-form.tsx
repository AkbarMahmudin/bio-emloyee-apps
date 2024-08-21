"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import BioList from "./bio-list";

interface BioFormProps {
  initialData: {
    jobApplied: string;
    ktp: string;
    placeDateBirth: string;
    gender: string;
    religion: string;
    bloodType: string;
    status: string;
    address: string;
    currentAddress: string;
    phone: string;
    closestPersonPhone: string;
    skills: string;
    availableEverywhere: boolean;
    expectedSalary: number;
  };
}

const inputFields = [
  {
    label: "Posisi",
    name: "jobApplied",
  },
  {
    label: "No KTP",
    name: "ktp",
  },
  {
    label: "Tempat, Tanggal Lahir",
    name: "placeDateBirth",
  },
  {
    label: "Jenis Kelamin",
    name: "gender",
  },
  {
    label: "Agama",
    name: "religion",
  },
  {
    label: "Golongan Darah",
    name: "bloodType",
  },
  {
    label: "Status",
    name: "status",
  },
  {
    label: "Alamat KTP",
    name: "address",
  },
  {
    label: "Alamat Sekarang",
    name: "currentAddress",
  },
  {
    label: "No HP",
    name: "phone",
  },
  {
    label: "No HP Orang Terdekat",
    name: "closestPersonPhone",
  },
  {
    label: "Kemampuan",
    name: "skills",
  },
];

const formSchema = z.object({
  jobApplied: z.string().min(1),
  ktp: z.string().min(1),
  placeDateBirth: z.string().min(1),
  gender: z.string().min(1),
  religion: z.string().min(1),
  bloodType: z.string().min(1),
  status: z.string().min(1),
  address: z.string().min(1),
  currentAddress: z.string().min(1),
  phone: z.string().min(1),
  closestPersonPhone: z.string().min(1),
  skills: z.string().min(1),
  availableEverywhere: z.boolean(),
  expectedSalary: z.coerce.number(),
});

function BioForm({ initialData }: BioFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobApplied: initialData?.jobApplied || "",
      ktp: initialData?.ktp || "",
      placeDateBirth: initialData?.placeDateBirth || "",
      gender: initialData?.gender || "",
      religion: initialData?.religion || "",
      bloodType: initialData?.bloodType || "",
      status: initialData?.status || "",
      address: initialData?.address || "",
      currentAddress: initialData?.currentAddress || "",
      phone: initialData?.phone || "",
      closestPersonPhone: initialData?.closestPersonPhone || "",
      skills: initialData?.skills || "",
      availableEverywhere: initialData?.availableEverywhere || false,
      expectedSalary: initialData?.expectedSalary || 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!initialData) {
        await axios.post("/api/biodata", values);

        toast({
          description: "Biodata berhasil disimpan",
          title: "Success",
        });
      } else {
        await axios.patch("/api/biodata", values);

        toast({
          description: "Biodata berhasil diupdate",
          title: "Success",
        });
      }

      toggleEdit();
      router.refresh();
      console.log(values);
    } catch (error) {
      console.error(error);
      toast({
        description: "Terjadi kesalahan",
        title: "Error",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Biodata
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        !initialData ? (
          <p
            className={cn(
              "text-sm mt-2",
              !initialData && "text-slate-500 italic"
            )}
          >
            Belum ada biodata
          </p>
        ) : (
          <BioList data={initialData} />
        )
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-2"
          >
            {inputFields.map((item) => (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input type="text" disabled={isSubmitting} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}

            <FormField
              control={form.control}
              name="expectedSalary"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Ekspektasi Gaji</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={isSubmitting} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"availableEverywhere"}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mr-2"
                      />
                    </FormControl>
                    Bersedia Ditempatkan Dimanapun
                  </FormLabel>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default BioForm;
