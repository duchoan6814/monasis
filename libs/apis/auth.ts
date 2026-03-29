import rest from "../rest";

interface RegisterBody {
  email: string;
  password: string;
  name: string;
}

export const register = async (body: RegisterBody) => {
  return rest.post("/auth/local/register", {
    username: body.email,
    email: body.email,
    password: body.password,
    name: body.name,
  });
};
