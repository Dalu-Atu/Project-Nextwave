import axiosInstance from "../axiosConfig";

export const signupUser = async (data) => {
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    if (res?.data?.status === "success") return res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    if (res.data.status === "success") return res.data;
  } catch (error) {
    console.log(error.response.data.message);
    throw error.response.data.message;
  }
};
