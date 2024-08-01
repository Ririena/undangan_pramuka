import React from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input, Button } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/config/supabase";
import { useState } from "react";
import { toast } from "react-toastify";
export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email harus diisi",
      }));
      setIsSubmitting(false);
      return;
    }

    if (!form.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password harus diisi",
      }));
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        console.log(error);
      } else {
        toast(' Sukses Mendaftar', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        navigate("/admin");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <>
      <main className="bg-[#E2E9C5] w-[450px] relative flex flex-col items-center p-6 min-h-screen">
        <div className="mx-auto container font-violet">
          <div className="flex justify-center mt-12">
            <form onSubmit={handleSubmit} className="w-full sm:max-w-md">
              <Card>
                <CardHeader>
                  <CardTitle className="text-violet-400">
                    <span className="text-violet-500">LOG</span>IN
                  </CardTitle>
                  <CardDescription>Log in To Your Session</CardDescription>
                  <Divider />
                </CardHeader>
                <CardContent className="grid gap-2">
                  <CardDescription className="text-violet-500">
                    Email:
                  </CardDescription>
                  <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email}</span>
                  )}
                  <CardDescription className="text-violet-500">
                    Password:
                  </CardDescription>
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <span className="text-red-500">{errors.password}</span>
                  )}
                </CardContent>
                <Divider className="mb-4" />
                <CardFooter className="grid gap-2">
                  <Button
                    className="w-72"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
