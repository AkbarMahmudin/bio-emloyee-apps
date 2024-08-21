"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { endpoints } from "@/constants/endpoint";

const formSchema = z.object({
  email: z.string().min(6),
  password: z.string().min(8),
});

interface CardFormProps {
  // onSubmit: () => void
  title: string;
  endpoint: string;
}

const CardForm = ({ title, endpoint }: CardFormProps) => {
  const { toast } = useToast();
  const redirectUrl = title === "Sign Up" ? "/sign-in" : "/";
  const successMessage =
    title === "Sign Up"
      ? "Akun berhasil dibuat. Silakan Login"
      : "Berhasil masuk";

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        title === "Sign Up" ? "/api/sign-up" : "/api/sign-in",
        values
      );

      toast({
        title: "Success",
        description: successMessage,
        className: "bg-emerald-500 text-white",
      });
      router.push(redirectUrl);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-[480px] shadow">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting || !isValid}>
              Kirim
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default CardForm;
