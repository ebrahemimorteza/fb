import { useEffect } from "react";
import { useState } from "react";
import {
  deleteDataService,
  putDataService,
  selectDataService,
} from "../manager/service";
import { useContext } from "react";
import DataContent from "../context/dataContent";

const PaginitionTable = ({ children }) => {
  const numOfPage = 3;
  const context = useContext(DataContent);
  const [initData, setinitData] = useState(context.data);

  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [page, setPage] = useState([]);

  const [pageCount, setPageCount] = useState(1);
  const [searchChar, setSearchChar] = useState("");
  useEffect(() => {
    setinitData(context.data)
  }, [context.data]);

  useEffect(() => {
    const start = currentPage * numOfPage - numOfPage;
    const end = currentPage * numOfPage;
    setTableData(initData.slice(start, end));
    console.log(initData);
  }, [currentPage, initData]);

  useEffect(() => {
    const pCount = Math.ceil(initData.length / numOfPage);
    setPageCount(pCount);
    let pArr = [];
    for (let i = 1; i <= pCount; i++) pArr = [...pArr, i];
    setPage(pArr);
  }, [initData]);

  useEffect(() => {
    setinitData(
      context.data.filter((d) =>
        d[context.searchParams.searchFeild].includes(searchChar)
      )
    );
    setCurrentPage(1);
  }, [searchChar]);

  return (
    <>
      <div className="row justify-content-between">
        <div className="col-10 col-md-6 col-lg-4">
          <div className="input-group mb-3 dir_ltr">
            <input
              type="text"
              className="form-control"
              placeholder={context.searchParams.placeholder}
              onChange={(e) => setSearchChar(e.target.value)}
            />
            <span className="input-group-text">
              {context.searchParams.title}
            </span>
          </div>
        </div>
        <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
          {children}
        </div>
      </div>
      <table className="table text-center table-hover table-bordered">
        <thead className="table-secondary">
          <tr>
            {context.dataInfo.map((i) => (
              <th key={i.field}>{i.title}</th>
            ))}
            {context.additionField ? (
              <th>{context.additionField.title}</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {tableData.reverse().map((d) => (
            <tr key={d.id}>
              {context.dataInfo.map((i) => (
                <td key={i.field + "_" + d.id}>{d[i.field]}</td>
              ))}

              <i
                onClick={() => context.handleEdit(d.id)}
                className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش محصول"
                data-bs-toggle="modal"
                data-bs-placement="top"
                data-bs-target="#add_product_category_modal"
              ></i>
              <i
                onClick={() => context.handleDelete(d.id)}
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف محصول"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              ></i>
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ul className="pagination dir_ltr">
          <li className="page-item">
            <span
              className={`page-link pointer ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={() => setCurrentPage(currentPage - 1)}
              aria-label="Previous"
            >
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
          {page.map((page) => (
            <li className="page-item" key={page}>
              <span
                className={`page-link pointer ${
                  currentPage === page ? "alert-success" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </span>
            </li>
          ))}
          <li className="page-item">
            <span
              className={`page-link pointer ${
                currentPage == pageCount ? "disabled" : ""
              }`}
              onClick={() => setCurrentPage(currentPage + 1)}
              aria-label="Next"
            >
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PaginitionTable;
