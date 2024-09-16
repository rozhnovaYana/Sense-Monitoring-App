import axios from "axios";

export const fetchData = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: {},
  headers?: {}
) => {
  try {
    const res = await axios({
      method,
      url,
      data,
      ...headers,
    });

    return await res.data;
  } catch (err: unknown) {
    console.log(err);
    throw new Error(
      err instanceof Error
        ? err.message
        : "Щось пішло не так, будь ласка, спробуйте пізніше."
    );
  }
};
