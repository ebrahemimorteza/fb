import { useContext, useEffect, useRef, useState } from "react";
import ModalContainer from "../../component/ModalContaainer";
import { postDataService, postDataUpload } from "../../manager/service";
import axios from "axios";
import swal from "sweetalert";
import DataContent from "../../context/dataContent";

const AddRole = () => {
  const [dataEdit, setDataEdit] = useState([]);
  const context = useContext(DataContent);
  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_modal"
        onClick={()=>{context.setChangeStatus(true)}}
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalContainer
        id={"add_product_category_modal"}
        fullScreen={true}
        title={context.changeStatus ? "افزودن گالری":"ویرایش گالری"}
      >
        <div className="container">
          <form onSubmit={context.changeStatus ? context.m_insert :  context.m_edit}>
            <div className="row justify-content-center">
              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3 dir_rtl">
                  <select
                    type="text"
                    className="form-control"
                    id="category_gallery_parent"
                    name="category_gallery_parent"
                    value={context.dataInput.gallery_id}
                    onChange={(e) => {
                      context.setDataInput({
                        ...context.dataInput,
                        gallery_id: e.target.value,
                      });
                    }}
                  >
                    <option value="1">دسته مورد نظر خود را انتخاب کنید</option>
                    {context.data.map((i) => (
                      <option value={i.id}>{i.pic_title}</option>
                    ))}
                  </select>
                  <span className="input-group-text w_6rem justify-content-center">
                    دسته والد
                  </span>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3 dir_rtl">
                  <input
                    type="text"
                    className="form-control"
                    id="category_gallery_title"
                    name="category_gallery_title"
                    placeholder="عنوان دسته"
                    value={context.dataInput.pic_title}
                    onChange={(e) => {
                      context.setDataInput({
                        ...context.dataInput,
                        pic_title: e.target.value,
                      });
                    }}
                  />
                  <span className="input-group-text w_6rem justify-content-center">
                    عنوان
                  </span>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-8">
                <div className="input-group mb-3 dir_rtl">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="تصویر"
                    onChange={context.handleFileChange}
                  />
                  <input
                    type="hidden"
                    ref={context.inputRef}
                    className="form-control"
                    placeholder=""
                    value={context.dataInput.pic_pic_name}
                    onChange={(e) => {
                      context.setDataInput({
                        ...context.dataInput,
                        pic_pic_name: e.target.value,
                      });
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary "
                    onClick={context.handleUpload}
                  >
                    ارسال
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-8">
                            <div className="input-group mb-3 dir_rtl">
                                <textarea value={context.dataInput.pic_discription}
                                onChange={(e) => {
                                  context.setDataInput({
                                    ...context.dataInput,
                                    pic_discription: e.target.value,
                                  });
                                }} type="text" className="form-control" placeholder="توضیحات" rows="5"></textarea>
                                <span className="input-group-text w_6rem justify-content-center">توضیحات</span>
                            </div>
                        </div>
              {context.changeStatus ? (
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <button className="btn btn-primary ">ذخیره</button>
                </div>
                
                ):(
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <button className="btn btn-primary ">ویرایش</button>
                </div>

              )}
            </div>
          </form>
        </div>
      </ModalContainer>
    </>
  );
};

export default AddRole
