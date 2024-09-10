import axios from "axios";

export const fetchData = async (
  url: string,
  method: "GET" | "POST",
  data?: {}
) => {
  try {
    const res = await axios({
      method,
      url,
      data,
    });

    return await res.data;
  } catch (err: unknown) {
    throw new Error(
      err instanceof Error
        ? err.message
        : "Щось пішло не так, будь ласка, спробуйте пізніше."
    );
  }
};
