import "./main-layout.css";

function MainLayout({ children }) {
  return (
    <main className="MainLayout">
      {children}
    </main>
  );
}

export default MainLayout;