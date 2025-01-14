"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "./redux/store";

export default function Home() {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [user, router]);

  return null; // This page will redirect, so we don't need to render anything
}
