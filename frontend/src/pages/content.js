import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { Route,Routes } from "react-router-dom";
import CategoryProduct from "./category_product/Sitting";
import User from "./user/Sitting";
import Dash from "./dashbord/Sitting";
import Role from "./role/Role";
import Sitting from "./sitting/Sitting";

const Content = () => {
    const {showSidebar} = useContext(AdminContext)
    return ( 
        <>
        <section id="content_section" className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}>
      <Routes>
      <Route path="class" element={<CategoryProduct/>}></Route>
      <Route path="users" element={<User/>}></Route>
      <Route path="role" element={<Role/>}></Route>
      <Route path="sittings" element={<Sitting/>}></Route> 
      <Route path="dashbord" element={<Dash/>}></Route> 
      </Routes>
      </section>
        </>
     );
}
 
export default Content