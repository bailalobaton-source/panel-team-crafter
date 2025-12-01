import { setToken } from "@/utils/authUtils";
import axios from "axios";

export async function login(correo: string, password: string) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
    {
      correo,
      password,
    }
  );

  setToken(res.data.token);
  return res.data;
}

// export async function getProfile(token: string) {
//   const res = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return res.data;
// }
