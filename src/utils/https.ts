const api_domain = process.env.NEXT_PUBLIC_API_DOMAIN;

export const fetchData = async (url: string, params: {} = {}) => {
  if (!api_domain) {
    return null;
  }
  try {
    const data = await fetch(url, { ...params });
    if (!data.ok) {
      throw new Error("Something went wrong");
    }
    return data?.json() || data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
