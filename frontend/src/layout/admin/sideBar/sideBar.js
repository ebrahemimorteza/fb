import { useContext } from "react";
import AdminContextContainer, { AdminContext } from "../../../context/AdminContext";
import Avatar from "./Avatar";
import SideBarGroupTitle from "./sideBarGroupTitle";
import SidebarItem from "./SidebarItem";
const SideBar = () => {
    const {showSidebar}=useContext(AdminContext)
    return ( 
        <div>
        <section id="sidebar_section">
        <div className={`mini_sidebar collapsedd bg-dark h-100 ${showSidebar ? "expanded" : null}`}>
            <div className="p-0 m-0">
           {/* <Avatar name={'morteza'} imgPath={"/assets/images/avatar/user2.jpg"}/>    */}        
           {/*<!-- =================================== -->*/}
           <SideBarGroupTitle title="مدیریت محتوای سازمانی"/>
           <SidebarItem  targetPath={"dashbord"} title={"داشبورد"} icon={"fas fa-tachometer-alt"}/>
                <SideBarGroupTitle title="تعریف کلاس در این ترم"/>
                <SidebarItem targetPath={"class"} title={"مدیریت گروه کلاس"} icon={"fas fa-stream"}/>
                {/*<!-- =================================== -->*/}
                <SideBarGroupTitle title="مدیریت کاربران"/>
                <SidebarItem targetPath={"users"} title={"مشاهده کاربران"} icon={"fas fa-users"}/>
    
              {/*  <!-- =================================== -->*/}
              <SideBarGroupTitle title="ازمون ساز"/>
              <SidebarItem targetPath={"sittings"} title={"فرم ساز"} icon={"fas fa-users"}/>

                <li className="py-2 btn-group dropstart pe-4">
                    <i className="ms-3 icon fas fa-check text-light"></i>
                    <span className="hiddenable" data-bs-toggle="dropdown" aria-expanded="false">داشبورد</span>
                    
                    <ul className="dropdown-menu px-2 sidebar_submenu_list">
                      <li className="d-none">اول</li>
                      <li>اول</li>
                      <li>دوم</li>
                      <li>سوم</li>
                    </ul>
                </li> 
            </div>
        </div>
    </section>
    {/*<!-- #endregion -->*/}
        </div>
     ); 
}
 
export default SideBar;