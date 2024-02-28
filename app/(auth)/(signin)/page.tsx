"use client";

import UserAuthForm from "@/components/forms/user-auth-form";
import { LogoIcon } from "@/components/ui/LogoIcon";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AuthenticationPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard"); // Redirect to dashboard if user is authenticated
    }
  }, [router, status]);

  if (status === "loading") {
    // Render loading state if session status is still loading
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* <Link
        href="/signup"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4  top-4 md:right-8 md:top-8",
        )}
      >
        Register
      </Link> */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-2xl font-bold">
          <LogoIcon />
          {process.env.NEXT_PUBLIC_APP_NAME || "NexTusPlate"}
          <sup className="text-sm ml-1 font-medium opacity-50">
            {process.env.NEXT_PUBLIC_APP_VER || "1.0"}
          </sup>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            {process.env.NEXT_PUBLIC_APP_INFO && (
              <p className="text-lg max-w-[600px]">
                {process.env.NEXT_PUBLIC_APP_INFO}
              </p>
            )}

            {process.env.NEXT_PUBLIC_APP_AUTHOR && (
              <footer className="text-sm">
                by{" "}
                <b>
                  <Link
                    target="_blank"
                    className="underline underline-offset-4 text-sky-600 hover:text-primaryunderline"
                    href={`${process.env.NEXT_PUBLIC_APP_AUTHOR_URL}`}
                  >
                    {process.env.NEXT_PUBLIC_APP_AUTHOR}
                  </Link>
                </b>
              </footer>
            )}
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome! to {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="#terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#policy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
