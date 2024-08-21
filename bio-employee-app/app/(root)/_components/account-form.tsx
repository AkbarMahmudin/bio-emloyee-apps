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
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogOut, Pencil } from "lucide-react";
import { useState } from "react";
import { endpoints } from "@/constants/endpoint";
import { useToast } from "@/components/ui/use-toast";

interface AccountFormProps {
  initialData: {
    name: string;
    email: string;
  };
}

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

const AccountForm = ({ initialData }: AccountFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch("/api/users", values);

      toast({
        title: "Account updated",
        description: "Your account has been updated successfully",
        className: "bg-emerald-500 text-white",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast({
        title: "Failed to update account",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  };

  const onLogout = async () => {
    try {
      await axios.post('/api/sign-out');
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
        className: "bg-emerald-500 text-white",
      });
      router.push("/sign-in");
    } catch (error) {
      toast({
        title: "Failed to logout",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button
            type="button"
            className="h-16 w-16 bg-sky-500 text-white rounded-full flex justify-center items-center text-center"
          >
            {initialData.email?.charAt(0).toUpperCase()}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={toggleEdit}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {!isEditing ? (
        <>
          {initialData.name && (
            <p className="text-lg font-semibold mt-2">{initialData.name}</p>
          )}
          <p className="text-base text-gray-500">{initialData.email}</p>
        </>
      ) : (
        <div className="border bg-slate-100 rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
            Akun User
            <Button type="button" variant="ghost" onClick={toggleEdit}>
              Cancel
            </Button>
          </div>
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
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
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
        </div>
      )}
    </div>
  );
};

export default AccountForm;
