import { useEffect } from "react";
import PaginitionTable from "../../component/pagenationComponent";
import AddRole from "./AddRole";
import axios from "axios";
import { jjAxios } from "../../manager/jAxios";
import {
  deleteDataService,
  getDataService,
  postDataService,
  postDataUpload,
  selectDataService,
} from "../../manager/service";
import { useState } from "react";
import { useRef } from "react";
import DataContent from "../../context/dataContent";

const RoleTable = () => {
  const [data, setData] = useState([]);
  const [changeStatus, setChangeStatus] = useState(false);
  const [selectData, setselectData] = useState();
  const [dataInput, setDataInput] = useState({
    pic_title: "",
    gallery_id: "",
    pic_pic_name: "",
    pic_parent:"",
    pic_discription:"",
    pic_pic_ex:"",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    console.log("******************");
    const formData = new FormData();
    formData.append("file", selectedFile);
    const result = await postDataUpload(formData);
    console.log(result)
    setDataInput({...dataInput,pic_pic_name:result})
    if (inputRef.current) {
      inputRef.current.value = result;
    }
  };
  const m_insert = (e) => {
    e.preventDefault();
    postDataService(dataInput, {
      params: {
        do: "Pic.insert",
      },
    });
    handleData();
  };
  const m_edit = (e) => {
    e.preventDefault();
    console.log(selectData);
    postDataService(dataInput, {
      params: {
        do: "Pic.edit",
        id: selectData,
      },
    });
    handleData();
  };
  const dataInfo = [
    { field: "id", title: "#" },
    { field: "pic_title", title: "عنوان" },
  ];
  const additionElement = (id) => {
    return (
      <div>
        <i
          className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
          title="ویرایش محصول"
          data-bs-toggle="modal"
          data-bs-placement="top"
          data-bs-target="#add_product_category_modal"
        ></i>
        <i
          className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
          title="حذف محصول"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        ></i>
      </div>
    );
  };
  const additionField = {
    title: "عملیات",
    elements: (id) => additionElement(id),
  };
  const searchParams = {
    title: "جستجو",
    placeHolder: "قسمتی از عنوان را وارد کنید",
    searchFeild: "category_gallery_title",
  };
  const handleData = async () => {
    console.log("morteza ebrahemi")
    var result = await getDataService({
      params: {
        do: "Pic.refresh",
      },
    });
    setData(result);
  };

  useEffect(() => {
    handleData();
  }, []);
  const handleEdit = async (id) => {
    console.log();
    setChangeStatus(false);
    setselectData(id);
    const resault = await selectDataService({
      params: {
        do: "Pic.select",
        id: id,
      },
    });
    //setselectData(resault);
console.log(resault)
console.log("resault")
    setDataInput({
      pic_title: resault[0].pic_title,
      pic_pic_name: resault[0].pic_pic_name,
      pic_discription: resault[0].pic_discription,
      pic_parent: resault[0].pic_parent,
      gallery_id: resault[0].gallery_id,
      pic_pic_ex: resault[0].pic_pic_ex,
    });
  };
  const handleDelete = (id) => {
    console.log(id);
    deleteDataService(
      { id: id },
      {
        params: {
          do: "Pic.delete",
        },
      }
    );
    handleData();
  };
  return (
    <>
    <DataContent.Provider value={{selectData,setselectData,data,dataInfo,additionField,
      searchParams,setChangeStatus,changeStatus,handleEdit,dataInput,setDataInput,m_insert,
      m_edit,inputRef,setSelectedFile,selectedFile,handleFileChange,handleUpload,handleDelete
    }}>
      <PaginitionTable>
        <AddRole/>
      </PaginitionTable>
      </DataContent.Provider>
    </>
  );
};

export default RoleTable
