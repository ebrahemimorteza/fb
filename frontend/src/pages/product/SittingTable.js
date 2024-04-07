import { useEffect } from "react";
import PaginitionTable from "../../component/pagenationComponent";
import AddSitting from "./AddSitting";
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

const SittingTable = () => {
  const [data, setData] = useState([]);
  const [changeStatus, setChangeStatus] = useState(false);
  const [selectData, setselectData] = useState();
  const [selectNameData, setselectNameData] = useState();
  const [dataInput, setDataInput] = useState({
    Tice_config_Name: "",
    Tice_config_value: "",
    Tice_config_lable: "",
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
        do: "Tice_config.insert",
      },
    });
    handleData();
  };
  const m_edit = (e) => {
    e.preventDefault();
    const newKeyName = selectNameData; // نام کلید جدید
    postDataService(dataInput, {
      params: {
        do: "Tice_config.edit",
        id: selectData,
        [newKeyName]: dataInput.Tice_config_value,
      },
    });
    handleData();
  };
  const dataInfo = [
    { field: "id", title: "#" },
    { field: "Tice_config_lable", title: "عنوان" },
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
    searchFeild: "Tice_config_lable",
  };
  const handleData = async () => {
    var result = await getDataService({
      params: {
        do: "Tice_config.refresh",
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
        do: "Tice_config.select",
        id: id,
      },
    });
    //setselectData(resault);
    console.log(resault[0].Tice_config_Name)
    console.log("resault")
    setselectNameData(resault[0].Tice_config_Name);
    setDataInput({
      Tice_config_name: resault[0].Tice_config_Name,
      Tice_config_value: resault[0].Tice_config_value,
      Tice_config_lable: resault[0].Tice_config_lable,
    });
  };
  const handleDelete = (id) => {
    alert("امکان دیلیت وجود ندارد");

  };
  return (
    <>
    <DataContent.Provider value={{selectData,setselectData,data,dataInfo,additionField,
      searchParams,setChangeStatus,changeStatus,handleEdit,dataInput,setDataInput,m_insert,
      m_edit,inputRef,setSelectedFile,selectedFile,handleFileChange,handleUpload,handleDelete
    }}>
    
        <AddSitting/>
      </DataContent.Provider>
    </>
  );
};

export default SittingTable
