import React from 'react'
import CardForm from '../_components/card-form'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { endpoints } from '@/constants/endpoint'

const SignUpPage = () => {
  return (
    <section className='w-full min-h-screen flex flex-col items-center justify-center'>
      <CardForm
        title="Sign Up"
        endpoint={endpoints.signUp}
      />
      <Link href="/sign-in" className={buttonVariants({
        variant: "link",
        className: "mt-4 text-sky-700",
      })}>Sudah punya akun?</Link>
    </section>
  )
}

export default SignUpPage