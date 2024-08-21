import Link from "next/link"
import CardForm from "../_components/card-form"
import { buttonVariants } from "@/components/ui/button"
import { endpoints } from "@/constants/endpoint"

const SignInPage = () => {
  return (
    <section className='w-full min-h-screen flex flex-col items-center justify-center'>
      <CardForm
        title="Sign In"
        endpoint={endpoints.signIn}
      />
      <Link href="/sign-up" className={buttonVariants({
        variant: "link",
        className: "mt-4 text-sky-700",
      })}>Belum punya akun?</Link>
    </section>
  )
}

export default SignInPage