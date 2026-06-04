import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout({ children }) {
  return (
    <>
      <Sidebar />
      <Topbar />

      {children}
    </>
  );
}

export default MainLayout;
