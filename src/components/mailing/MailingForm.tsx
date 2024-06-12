import React, { useEffect } from "react";
import { Input, TimeInput } from "@nextui-org/react";
import ButtonUI from "@/components/UI/Button";
import { saveIncident } from "@/actions/Incident";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

type MailingFormProps = { numberOfIncident: string };

const MailingForm = ({ numberOfIncident }: MailingFormProps) => {
  const [state, formAction] = useFormState(
    saveIncident.bind(null, numberOfIncident),
    { success: false }
  );
  useEffect(() => {
    if (state.success && state.message) {
      console.log("text");
      toast.success(state.message);
    }
  }, [state]);
  return (
    <form className="mt-4" action={formAction}>
      <div>Контроль часу розсилки</div>
      <div className="text-gray-400">
        Номер інциденту:
        <span className="text-success-700"> {numberOfIncident}</span>
      </div>
      <div className="flex gap-4 mt-4 items-center">
        <TimeInput
          name="time"
          label="Чаc"
          isRequired
          hourCycle={24}
          className="w-max"
          isInvalid={!!state.time}
          variant="bordered"
        />
        <Input
          name="reporter"
          isRequired
          label="Репортер"
          isInvalid={!!state.reporter}
          variant="bordered"
        />
        <ButtonUI type="submit" className="items-center" />
      </div>
      <span className="text-danger mt-5">
        {!!state.numberOfIncident && state.numberOfIncident}
      </span>
    </form>
  );
};

export default MailingForm;
