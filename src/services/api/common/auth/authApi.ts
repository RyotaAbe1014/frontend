import { baseAPI } from "../baseApi";


const login = async (email: string, password: string) => {
  const response = await baseAPI.post('/auth/token/',
    {
      "email": email,
      "password": password
    }
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
}

export const authApi = {
  login,
}
