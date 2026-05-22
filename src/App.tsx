import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <Header />
      <div className={'main'}>
        <Outlet />
      </div>
    </>
  )
}

export default App
