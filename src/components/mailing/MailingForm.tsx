import React, { forwardRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { Input, TimeInput } from "@nextui-org/react";

import { saveIncident } from "@/actions/Incident";
import SaveButton from "../UI/SaveButton";

type MailingFormProps = { numberOfIncident: string; startDate: Date };

const MailingForm = forwardRef<HTMLFormElement, MailingFormProps>(
  function MailingForm({ numberOfIncident, startDate }, ref) {
    const [state, formAction] = useFormState(
      saveIncident.bind(null, numberOfIncident, startDate),
      { success: false }
    );

    useEffect(() => {
      if (state.success && state.message) {
        toast.success(state.message);
      }
    }, [state]);

    return (
      <form className="mt-4" action={formAction} ref={ref}>
        <div>Контроль часу розсилки</div>
        <div className="text-gray-400">
          Номер інциденту:
          <span className="text-success-500"> {numberOfIncident}</span>
        </div>

        <div className="flex gap-4 mt-4 items-center">
          <TimeInput
            name="timeRequest"
            label="Чаc запиту"
            isRequired
            hourCycle={24}
            className="w-60"
            isInvalid={!!state.timeRequest}
            variant="bordered"
          />

          <TimeInput
            name="timeSend"
            label="Чаc розс."
            isRequired
            hourCycle={24}
            className="w-60"
            isInvalid={!!state.timeSend}
            variant="bordered"
          />
          <Input
            name="reporter"
            isRequired
            label="Репортер"
            isInvalid={!!state.reporter}
            variant="bordered"
            isClearable
          />

          <SaveButton />
        </div>
        <span className="text-danger mt-5">
          {!!state.numberOfIncident && state.numberOfIncident}
        </span>
      </form>
    );
  }
);

export default MailingForm;
