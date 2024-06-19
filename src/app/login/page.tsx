"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";

import { Button, Input } from "@nextui-org/react";

import { signInAction } from "@/actions/sign-in";
import { FaEye } from "react-icons/fa";

const LoginPage = () => {
  const [state, formAction] = useFormState(signInAction, {
    errors: {},
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <form
      action={formAction}
      className="flex items-center justify-center flex-col gap-5 h-screen w-80 m-auto"
    >
      <div className="text-gray-300  text-2xl">Авторизація</div>
      <Input
        isInvalid={!!state?.errors.name}
        errorMessage={state?.errors.name?.join(",")}
        name="name"
        isRequired
        label="Логін"
        variant="bordered"
      />
      <Input
        isInvalid={!!state?.errors.password}
        errorMessage={state?.errors.password?.join(",")}
        name="password"
        isRequired
        label="Пароль"
        type={isPasswordVisible ? "text" : "password"}
        variant="bordered"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isPasswordVisible ? (
              <FaEye className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <FaEye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
      <Button type="submit">Ввійти</Button>
      {state?.errors.form && (
        <div className="text-danger-100 mt-3">{state?.errors.form}</div>
      )}
    </form>
  );
};

export default LoginPage;
