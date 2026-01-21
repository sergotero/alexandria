import { http, HttpResponse } from "msw";

const baseAPI = "https://apibooks.com";

const AUTH_KEY = "db_user";

const users = localStorage.getItem(AUTH_KEY) ? JSON.parse(localStorage.getItem(AUTH_KEY)) : [];
const storeUsers = () => localStorage.setItem(AUTH_KEY, JSON.stringify(users));

export const authHandlers = [
  http.post(`${baseAPI}/auth`, async ({ request }) => {
    const user = await request.json();
    const existingUser = users.filter((u) => u.email.toLowerCase() === user.email.toLowerCase());
    
    if (existingUser && user.password === existingUser[0].password) {
      return HttpResponse.json(existingUser[0], { status: 200 });
    }else {
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
  http.post(`${baseAPI}/users`, async ({ request }) => {
    const user = await request.json();
    //Pass validation
    if (user.password === user.confirm_pass) {
      
      //Email check
      if(users.some((u) => u.email.toLowerCase() === user.email.toLowerCase() )){
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
        user.id = window.crypto.randomUUID().toString();
        user.avatarURL = `https://i.pravatar.cc/300?u=${user.email}`;
  
        users.push(user);
        storeUsers();
  
        return HttpResponse.json(user, { status: 201 });
      }
    } else {
      
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