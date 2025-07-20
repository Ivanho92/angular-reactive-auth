import { User } from "../user/user.model";

export const IN_MEMORY_USERS = [
  {
    _id: "5da01751da27cc462d265913",
    _roles: ["manager"],
    displayName: "John Doe",
    email: "john.doe@manager.com",
    password: "password",
  },
  {
    _id: "9ce34b95be6b007a616a9d57",
    _roles: ["admin"],
    displayName: "Elise Grimm",
    email: "elise.grimm@admin.com",
    password: "password",
  },
] satisfies (User & { password: string })[];
