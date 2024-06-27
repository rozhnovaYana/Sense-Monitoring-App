import { useDateFormatter as useDateFormatterHook } from "@react-aria/i18n";

export const useDateFormatter = () => {
  return useDateFormatterHook({
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Kyiv",
  });
};
