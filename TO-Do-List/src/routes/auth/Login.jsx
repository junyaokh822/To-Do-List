// src/routes/auth/Login.jsx
import { Form, redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();

  console.log(Object.fromEntries(formData));
  const response = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  if (!response.ok) {
    return null;
  }

  return redirect("/");
}

function Login() {
  return (
    <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2">
      <h1 className="text-white">Login</h1>

      <fieldset className="flex flex-col">
        <label htmlFor="title">Username</label>
        <input
          type="username"
          name="username"
          id="username"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="company">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      <input
        className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer"
        type="submit"
      ></input>
    </Form>
  );
}

export default Login;