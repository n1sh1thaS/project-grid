import axios from "axios";

export const getUser = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/users/getUser");
    const { data } = res;
    return data._id;
  } catch (err) {
    console.log("could not retrieve user information", err);
  }
};
