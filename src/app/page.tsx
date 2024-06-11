"use client";

import { useState } from "react";

import Form from "@/components/form/Form";
import Message from "@/components/message/Message";

import { type FormState } from "@/types/Form";

import { FormDataInitialState } from "@/data/formdata";

export default function Home() {
  const [formState, updateFormState] =
    useState<FormState>(FormDataInitialState);

  return (
    <div className="grid grid-cols-2 mt-16 gap-10">
      <Form formState={formState} updateFormState={updateFormState} />
      <Message formState={formState} />
    </div>
  );
}
