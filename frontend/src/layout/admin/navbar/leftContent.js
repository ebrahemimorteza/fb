import { useEffect, useState } from "react";
import { getDataService, postDataService } from "../../../manager/service";
import SidebarItem from "../sideBar/SidebarItem";

const LeftContent = ({onLogout, name}) => {
    const [data,setData]=useState([]);
    const handleExit=async ()=>{
        var result = await getDataService({
        params: {
          do: 'Access_User.signOut'
        }
      })
      onLogout();
    }
    const handleData = async () => {
        var result = await getDataService({
            params: {
                do: "Messenger.refreshRecivedMessages",
            },
        });
        setData(result);
      };
    useEffect(()=>{
        handleData()
    },[])
    return ( 
        <>
        <div className="left_content d-flex flex-row-reverse">
        <i className="fas fa-grip-vertical fa-2x me-3 pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
        <ul className="dropdown-menu mini_menu" aria-labelledby="dropdownMenuButton1">
            <li className="my-2"><a className="dropdown-item d-block text-center">{name}</a></li>
            <li className="my-2 d-flex justify-content-center align-items-center px-2">
                <i className="fas fa-tachometer-alt"></i>
                <SidebarItem targetPath={"/adminCms/dashbord"} title={"داشبورد"} />
            </li>           
            <li className="my-2 d-flex justify-content-center align-items-center px-2">
                <i className="fas fa-envelope"></i>
                <SidebarItem targetPath={"/adminCms/message"} title={"پیام ها"} />
            </li>
            <hr/>
            <li className="d-flex justify-content-center align-items-center px-2">
                <i className="fas fa-power-off"></i>
                <a className="dropdown-item" onClick={handleExit}>خروج</a>
            </li>
        </ul>
        <i className="far fa-bell fa-2x mx-3 pointer position-relative">
            <span className="alarm_count">{data.length}</span>
        </i>
        <i className="fas fa-search fa-2x mx-3 pointer"></i>
    </div>
        </>
     );
}
 
export default LeftContent;