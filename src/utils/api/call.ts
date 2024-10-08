interface FetchOptions {
  method: string;
  headers: {
    "Content-Type": string;
    "x-auth-token"?: string;
  };
  body?: string;
}

const call = async (url: string, options: FetchOptions) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || "Something went wrong" };
    }
    return await response.json();
  } catch (error) {
    console.error(`Error with fetch request to ${url}:`, error);
    return { success: false, error: error };
  }
};

export default call;
