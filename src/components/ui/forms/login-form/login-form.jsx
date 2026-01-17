import "./login-form.css";

function LoginForm(){
  return (
    <form className="LoginForm" method="post">

      <div className="inputGroup">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>

      <div className="inputGroup">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <div className="inputGroup">
        <label htmlFor="confirm_pass">Repeat password</label>
        <input type="email" name="confirm_pass" id="confirm_pass" />
      </div>
      
      <button type="button">Register</button>
    </form>
  );
}

export default LoginForm;