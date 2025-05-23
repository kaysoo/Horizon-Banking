"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authformSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
});

const AuthForm = ({ type }: AuthFormProps) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authformSchema(type);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      //sign up with appwrite & create plaid token
      if (type === "sign-up") {
        // const newUser = await SignUp(data);
        // setUser(newUser);
      }
      if (type === "sign-in") {
        // const response = await SignIn({
        // email:values.email,
        // password: values.password});
        // if(response) router.push('/')
      }
      console.log(values);
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className=" flex cursor-pointer items-center gap-1">
          <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* plaid link  */}</div>
      ) : (
        <>
          {/* form  */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      formName={"firstName"}
                      label={"First Name"}
                      placeholder={"Enter your first name"}
                    />
                    <CustomInput
                      control={form.control}
                      formName={"lastName"}
                      label={"Last Name"}
                      placeholder={"Enter your last name"}
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    formName={"address"}
                    label={"Address"}
                    placeholder={"Enter your specific address"}
                  />
                  <CustomInput
                    control={form.control}
                    formName={"city"}
                    label={"City"}
                    placeholder={"Enter your city"}
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      formName={"state"}
                      label={"State"}
                      placeholder={"Example: NY"}
                    />
                    <CustomInput
                      control={form.control}
                      formName={"postalCode"}
                      label={"Postal Code"}
                      placeholder={"Example: 11101"}
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      formName={"dateOfBirth"}
                      label={"Date of Birth"}
                      placeholder={"YYYY/MM/DD"}
                      //   type="date"
                    />
                    <CustomInput
                      control={form.control}
                      formName={"ssn"}
                      label={"SSN"}
                      placeholder={"Example: 1234"}
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                formName={"email"}
                label={"Email"}
                placeholder={"Enter your email"}
              />
              <CustomInput
                control={form.control}
                formName={"password"}
                label={"Password"}
                placeholder={"Enter your password"}
                type="password"
              />

              <div className="flex flex-col gap-2">
                <Button className="form-btn" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign UP"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
