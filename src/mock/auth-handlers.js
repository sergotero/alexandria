import { http, HttpResponse } from "msw";

// const baseAPI = "https://alexandriabooks.com";

const AUTH_KEY = "db_users";
const CURRENT_KEY = "current_user";

const users = localStorage.getItem(AUTH_KEY) ? JSON.parse(localStorage.getItem(AUTH_KEY)) : [];
const storeUsers = () => localStorage.setItem(AUTH_KEY, JSON.stringify(users));

export const authHandlers = [
  http.post(`/auth/login`, async ({ request }) => {
    const user = await request.json();
    const existingUser = users.filter((u) => u.email.toLowerCase() === user.email.toLowerCase());

    if (existingUser && user.password === existingUser[0].password) {
      localStorage.setItem(CURRENT_KEY, JSON.stringify({id: existingUser[0].id, email: existingUser[0].email}));
      return HttpResponse.json(existingUser[0], { status: 200 });
    } else {
      return HttpResponse.json(
        {
          message: "Invalid login",
          errors: {
            password: "*The email or the password is incorrect"
          }
        }, 
        { status: 400 }
    );
    }
  }),
  http.post(`/auth/register`, async ({ request }) => {
    const user = await request.json();
    //Pass validation
    if (user.password === user.confirm_pass) {
      //Email check
      if(users.some((u) => u.email.toLowerCase() === user.email.toLowerCase() )){
        //Email ya existe
        return HttpResponse.json(
          {
            message: "Invalid user register",
            errors: {
              email: "*Email already exists"
            }
          },
          { status: 400 }
        );
      } else {
        //Email no existe
        user.id = window.crypto.randomUUID().toString();
        user.avatarURL = `https://i.pravatar.cc/300?u=${user.email}`;
        users.push(user);
        storeUsers();
        return HttpResponse.json(user, { status: 201 });
      }

    } else {
      //Las contraseñas no hacen match
      return HttpResponse.json(
        {
          message: "Invalid password",
          errors: {
            password: "*Both passwords must match"
          },
        },
        { status: 400 });
    }
  })
]