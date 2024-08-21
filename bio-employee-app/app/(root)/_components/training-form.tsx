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

interface TrainingFormProps {
  initialData: {
    id: string;
    name: string;
    isCertificate: boolean;
    year: string;
  }[];
}

const formSchema = z.object({
  name: z.string().min(1),
  isCertificate: z.boolean(),
  year: z.string().min(1),
});

function TrainingForm({ initialData }: TrainingFormProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      isCertificate: false,
      year: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleCreating = () => setIsCreating((prev) => !prev);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isCreating) {
        await axios.post("/api/training", values);
        toast({
          title: "Berhasil menambahkan data",
          description: "Data riwayat pelatihan berhasil ditambahkan",
        });
        toggleCreating();
      } else {
        await axios.patch(`/api/training/${currentId}`, values);
        toast({
          title: "Berhasil mengubah data",
          description: "Data riwayat pelatihan berhasil diubah",
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
    form.setValue("name", data.name);
    form.setValue("isCertificate", data.isCertificate);
    form.setValue("year", data.year);
    setCurrentId(data.id);

    setIsEditing(true);
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/training/${currentId}`);
      toast({
        title: "Berhasil menghapus data",
        description: "Data riwayat pelatihan berhasil dihapus",
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
        Riwayat Pelatihan
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Nama kursus"
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
              name="isCertificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mr-2"
                      />
                    </FormControl>
                    Bersertifikat
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

      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.length && "text-slate-500 italic"
          )}
        >
          {!initialData.length && "Belum ada data riwayat pelatihan"}

          {!isEditing ? (
            initialData.map((data) => (
              <div
                key={data.id}
                className="flex items-center justify-between gap-x-2 bg-slate-200 border border-slate-200 text-slate-700 rounded-md mb-4 text-sm px-2 py-1"
              >
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{data.name}</p>
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Nama kursus"
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
                    name="isCertificate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mr-2"
                            />
                          </FormControl>
                          Bersertifikat
                        </FormLabel>
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

export default TrainingForm;
