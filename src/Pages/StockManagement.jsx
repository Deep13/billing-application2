import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FeatherIcon from "feather-icons-react";
import Data from "./inventory";
import "../components/antd.css";
import { Table } from "antd";
import Select2 from '../components/SelectDropdown'

import {
  onShowSizeChange,
  itemRender,
} from "../components/paginationfunction";
import AddVendor from "../vendors/addVendor";
// import Select2 from "react-select2-wrapper";

const StockManagement = () => {

  const datasource = Data?.Data;
  console.log(datasource);
  const [data, setData] = useState(datasource)
  const [menu, setMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [purity, setPurity] = useState();
  const purityType = [
    { text: 18 },
    { text: 24 },
    { text: 22 },
    { text: 14 },
    { text: 10 }
  ]

  const handlePurityChange = (e) => {
    setPurity(e.target.value)
  }

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };


  const handleAddItem = () => {
    let newItem = {
      "Id": 1,
      "Item": ItemRef.current.value,
      "Code": OmCodeRef.current.value,
      "EntryDate": DateRef.current.value,
      "Quantity": QuantityRef.current.value,
      "StoneWt": StoneWtRef.current.value,
      "Purity": purity,
      "PurchasePrice": 1500,
      "Action": ""
    }
    setData(prev => [newItem, ...prev])
    ItemRef.current.value = ""
    OmCodeRef.current.value = ''
    DateRef.current.value = ''
    QuantityRef.current.value = ''
    StoneWtRef.current.value = ''

  }

  const [units, setUnits] = useState([
    { id: 1, text: "22-08-2023" },
    { id: 2, text: "15-09-2023" },
    { id: 3, text: "16-07-2023" },
    { id: 4, text: "21-08-2023" },
    { id: 5, text: "2-11-2023" },
  ]);


  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      sorter: (a, b) => a.Id.length - b.Id.length,
    },
    {
      title: "Item",
      dataIndex: "Item",
      sorter: (a, b) => a.Item.length - b.Item.length,
    },
    {
      title: "Code",
      dataIndex: "Code",
      sorter: (a, b) => a.Code.length - b.Code.length,
    },
    {
      title: "Entry Date",
      dataIndex: "EntryDate",
      sorter: (a, b) => a.Units.length - b.Units.length,
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      sorter: (a, b) => a.Quantity.length - b.Quantity.length,
    },
    {
      title: "Stone Wt",
      dataIndex: "StoneWt",
      sorter: (a, b) => a.StoneWt.length - b.StoneWt.length,
    },
    {
      title: "Purity",
      dataIndex: "Purity",
      sorter: (a, b) => a.Purity.length - b.Purity.length,
    },
    {
      title: "Purchase Price",
      dataIndex: "PurchasePrice",
      sorter: (a, b) => a.Purchase.length - b.Purchase.length,
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          {/* <Link
                        to="#"
                        className="btn btn-greys bg-success-light me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#stock_in"
                    >
                        <i className="fa fa-plus-circle me-1" /> Stock in
                    </Link>
                    <Link
                        to="#"
                        className="btn btn-greys bg-danger-light me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#stock_out"
                    >
                        <i className="fa fa-plus-circle me-1" /> Stock out
                    </Link> */}
          <div className="dropdown dropdown-action">
            <Link
              to="#"
              className=" btn-action-icon "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v" />
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <ul>
                <li>
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_inventory"
                  >
                    <i className="far fa-edit me-2" />
                    Edit
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_stock"
                  >
                    <i className="far fa-trash-alt me-2" />
                    Delete
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
      sorter: (a, b) => a.Action.length - b.Action.length,
    },
  ];


  const ItemRef = useRef()
  const DateRef = useRef()
  const OmCodeRef = useRef()
  const GrossWtRef = useRef()
  const StoneWtRef = useRef()
  const HUIDRef = useRef()
  const NetWtRef = useRef()
  const QuantityRef = useRef()
  const OrnamentDescRef = useRef()

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />

        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="content-page-header ">
                <h5>Stock Management</h5>
                <div className="list-btn">
                  <ul className="filter-list">
                    <li>
                      <Link className="btn btn-filters w-auto popup-toggle"
                        onClick={() => { setShow(!show) }}
                        to="#"
                      >
                        <span className="me-2">
                          {/* <i className="fe fe-filter" /> */}
                          <FeatherIcon icon="filter" />
                        </span>
                        Filter{" "}
                      </Link>
                    </li>
                    <li>
                      {/* <Link className="btn-filters" to="#">
                                                <span>
                                                    <i className="fe fe-grid" />
                                                    <FeatherIcon icon="grid" />
                                                </span>{" "}
                                            </Link> */}
                    </li>
                    <li>
                      {/* <Link
                                                className="active btn-filters me-2"
                                                to="#"
                                            >
                                                <span>
                                                    <i className="fe fe-list" />
                                                    <FeatherIcon icon="list" />
                                                </span>{" "}
                                            </Link> */}
                    </li>
                    <li className="me-2">
                      <div className="dropdown dropdown-action">
                        <Link
                          to="#"
                          className="btn-filters"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span>
                            {/* <i className="fe fe-download" /> */}
                            <FeatherIcon icon="download" />
                          </span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                          <ul className="d-block">
                            <li>
                              <Link
                                className="d-flex align-items-center download-item"
                                to="#"
                                download=""
                              >
                                <i className="far fa-file-pdf me-2" />
                                PDF
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="d-flex align-items-center download-item"
                                to="#"
                                download=""
                              >
                                <i className="far fa-file-text me-2" />
                                CVS
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_inventory"
                        className="btn btn-rounded btn-primary me-1 flex items-center">
                        <FeatherIcon icon="plus" />
                        <span className="ml-[0.25rem]">Add Items</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Table */}
            <div className="row">
              <div className="col-sm-12">
                <div className=" card-table">
                  <div className="card-body">
                    <div className="table-responsive table-hover">
                      <Table
                        pagination={{
                          total: datasource.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        columns={columns}
                        dataSource={data}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Table */}
          </div>
        </div>

        <AddVendor
          setShow={setShow}
          show={show}
        />

        <div className="modal custom-modal fade" id="stock_in" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Add Stock in</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="align-center" aria-hidden="true">
                    ×
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="bg-white-smoke form-control"
                        placeholder="SEO Service"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-0">
                      <label>Entry Date</label>
                      {/* <Select2
                        className="w-100"
                        data={units}
                        options={{
                          placeholder: "Pieces",
                        }}
                      /> */}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-0">
                      <label>Notes</label>
                      <textarea
                        rows={3}
                        cols={3}
                        className="form-control"
                        placeholder="Enter Notes"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-cancel-btn me-2"
                >
                  Cancel
                </Link>
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-continue-btn"
                >
                  Add Quantity
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="modal custom-modal fade" id="stock_out" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Remove Stock</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="align-center" aria-hidden="true">
                    ×
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="bg-white-smoke form-control"
                        placeholder="SEO Service"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-0">
                      <label>Units</label>
                      {/* <Select2
                        className="w-100"
                        data={units}
                        options={{
                          placeholder: "Pieces",
                        }}
                      /> */}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-0">
                      <label>Notes</label>
                      <textarea
                        rows={3}
                        cols={3}
                        className="form-control"
                        placeholder="Enter Notes"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-cancel-btn me-2"
                >
                  Cancel
                </Link>
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-continue-btn"
                >
                  Remove Quantity
                </Link>
              </div>
            </div>
          </div>
        </div>



        <div className="modal custom-modal fade" id="edit_inventory" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Add Items</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="align-center" aria-hidden="true">
                    ×
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Entry Date</label>
                      <input
                        ref={DateRef}
                        type="date"
                        className="form-control"
                        defaultValue="Lorem ipsum dolor sit"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Om Code</label>
                      <input
                        ref={OmCodeRef}
                        type="text"
                        className="form-control"
                        defaultValue="P125389"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Item</label>
                      <input
                        ref={ItemRef}
                        type="text"
                        className="form-control"
                        defaultValue="P125389"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Gross Wt</label>
                      <input
                        ref={GrossWtRef}
                        type="text"
                        className="form-control"
                        defaultValue="Box"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Stone Wt</label>
                      <input
                        ref={StoneWtRef}
                        type="text"
                        className="form-control"
                      // defaultValue={3}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>HUID</label>
                      <input
                        ref={HUIDRef}
                        type="text"
                        className="form-control"
                      // defaultValue="$155.00"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Net Wt</label>
                      <input
                        ref={NetWtRef}
                        type="text"
                        className="form-control"
                      // defaultValue="$150.00"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-0">
                      <label>Quantity</label>
                      <input
                        ref={QuantityRef}
                        type="text"
                        className="form-control"
                      // defaultValue="Stock in"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-0">
                      <label>Purity</label>
                      <Select2
                        onChange={handlePurityChange}
                        className="form-control"
                        data={purityType}
                      // defaultValue="Stock in"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-0">
                      <label>Ornament Desc</label>
                      <input
                        ref={OrnamentDescRef}
                        type="text"
                        className="form-control"
                      // defaultValue="Stock in"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-cancel-btn me-2"
                >
                  Cancel
                </Link>
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-continue-btn"
                  onClick={handleAddItem}
                >
                  Add
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="modal custom-modal fade" id="delete_stock" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Stock</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <Link to="#" className="btn btn-primary paid-continue-btn">
                        Delete
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to="#"
                        data-bs-dismiss="modal"
                        className="btn btn-primary paid-cancel-btn"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockManagement;
