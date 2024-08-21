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
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2, Pencil, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface ExperienceFormProps {
  initialData: {
    id: string;
    company: string;
    position: string;
    year: string;
    salary?: number;
  }[];
}

const formSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  year: z.string().min(1),
  salary: z.coerce.number().optional(),
});

function ExperienceForm({ initialData }: ExperienceFormProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      year: "",
      salary: 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleCreating = () => setIsCreating((prev) => !prev);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isCreating) {
        await axios.post("/api/experience", values);
        toast({
          title: "Berhasil menambahkan data",
          description: "Data riwayat kerja berhasil ditambahkan",
        });
        toggleCreating();
      } else {
        await axios.patch(`/api/experience/${currentId}`, values);
        toast({
          title: "Berhasil mengubah data",
          description: "Data riwayat kerja berhasil diubah",
        });
        toggleEditing();
      }

      router.refresh();
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan data",
        variant: "destructive",
      });
    } finally {
      form.reset();
    }
  };

  const onEdit = (data: any) => {
    form.setValue("company", data.company);
    form.setValue("position", data.position);
    form.setValue("year", data.year);
    form.setValue("salary", data.salary || 0);
    setCurrentId(data.id);

    setIsEditing(true);
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/experience/${currentId}`);
      toast({
        title: "Berhasil menghapus data",
        description: "Data riwayat kerja berhasil dihapus",
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menghapus data",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setIsEditing(false);
    }
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Riwayat Pekerjaan
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
            </>
          )}
        </Button>
      </div>
      {!isCreating ? (
        <></>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Nama perusahaan"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Posisi"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Tahun"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Pendapatan"
                      type="number"
                      {...field}
                    />
                  </FormControl>
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

      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.length && "text-slate-500 italic"
          )}
        >
          {!initialData.length && "Belum ada data riwayat pekerjaan"}

          {!isEditing ? (
            initialData.map((data) => (
              <div
                key={data.id}
                className="flex items-center justify-between gap-x-2 bg-slate-200 border border-slate-200 text-slate-700 rounded-md mb-4 text-sm px-2 py-1"
              >
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{data.company}</p>
                  <p className="text-gray-500">{data.position}</p>
                  <p className="text-xs">{data.year}</p>
                </div>

                <Pencil
                  onClick={() => onEdit(data)}
                  className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                />
              </div>
            ))
          ) : (
            <>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 mt-4"
                >
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Nama perusahaan"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Posisi"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Tahun"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Pendapatan"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center gap-x-2">
                    <Button type="submit" disabled={!isValid || isSubmitting}>
                      Save
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={toggleEditing}
                    >
                      Cancel
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger
                        className={buttonVariants({
                          variant: "destructive",
                          className: "ml-auto",
                        })}
                      >
                        <Trash className="w-4 h-4" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={onDelete}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </form>
              </Form>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ExperienceForm;
