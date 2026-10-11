import LoginForm from "../components/forms/access-forms/login-form";
import Header from "../components/ui/header";

function AccessPage(){
  return (
    <>
      <Header>
        <div className="flex items-center justify-center h-[10vh] bg-zinc-900">
          
        </div>
      </Header>
      <main className="flex flex-col justify-top min-h-[90vh] items-center gap-5 p-5 bg-zinc-950">
        <LoginForm />
      </main>
    </>
  );
};

export default AccessPage;