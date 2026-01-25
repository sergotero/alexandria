import { Navbar } from "./components/ui";
import { Routes, Route } from "react-router";
import { HomePage, DetailsPage, CataloguePage, LoginPage, ProfilePage, RegisterPage } from "./pages/index";
import { AuthContextProvider } from "./components/context";

function App() {

  return (
    <AuthContextProvider>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<DetailsPage />} />
        <Route path="/books" element={<CataloguePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={< RegisterPage />} />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
