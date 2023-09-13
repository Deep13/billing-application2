import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FeatherIcon from "feather-icons-react";
import Data from "../assets/jsons/productList";
import "../components/antd.css";
import { Table } from "antd";
import Select2 from '../components/SelectDropdown'

import {
    onShowSizeChange,
    itemRender,
} from "../components/paginationfunction";
import AddVendor from "../vendors/addVendor";
import { FilterChart, search } from "../components/imagepath";

const MasterData = () => {
    const [menu, setMenu] = useState(false);
    const [item, setitem] = useState(null);
    const [selectedItem, setselectedItem] = useState(null);
    const [show, setShow] = useState(false);
    const [datasource, setdatasource] = useState([{ id: 1, desc: 'GOLD' }, { id: 2, desc: 'SILVER' }, { id: 3, desc: 'OTHERS' }]);

    const toggleMobileMenu = () => {
        setMenu(!menu);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            sorter: (a, b) => a.id.length - b.id.length,
        },
        {
            title: "Item",
            dataIndex: "desc",
            sorter: (a, b) => a.desc.length - b.desc.length,
        },
        {
            title: "Action",
            dataIndex: "Action",
            render: (text, record) => (
                <>
                    <div className="align-items-center">
                        <button
                            onClick={() => showEditModel(record)}
                            style={{ marginRight: 10 }}
                            className="btn btn-primary gap-2">
                            Edit
                        </button>
                        <button
                            onClick={() => deleteItem(record)}
                            // onClick={AddItemToTable}
                            className="btn btn-danger gap-2">
                            Delete
                        </button>
                    </div>
                </>
            )
        },
    ];


    const handleAddItem = () => {
        if (selectedItem) {
            var editValue = datasource.filter(val => {
                if (val.id == selectedItem.id) {
                    val.desc = item
                }
                return val
            });

            setdatasource([...editValue]);
        }
        else {
            var lastIndex = datasource.length;
            setdatasource([...datasource, { id: lastIndex, desc: item }])
        }
    }

    const showEditModel = (record) => {
        setselectedItem(record)
        setitem(record.desc)
        var myModal = new bootstrap.Modal(document.getElementById('edit_inventory'));
        myModal.show()
    }

    const deleteItem = (record) => {
        var items = datasource.filter(val => val.id !== record.id);
        setdatasource([...items])
    }

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
                                <h5>Master Data</h5>
                                <div className="list-btn">
                                    <ul className="filter-list">

                                        <li>
                                            <button
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_inventory"
                                                // onClick={AddItemToTable}
                                                className="btn btn-primary flex items-center gap-2">
                                                <FeatherIcon icon='plus' />
                                                Add Product
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* /Page Header */}
                        {/* All Invoice */}
                        <div className="card invoices-tabs-card">
                            <div className="invoices-main-tabs">
                                <div className="row align-items-center">
                                    <div className="col-lg-12">
                                        <div className="invoices-tabs">
                                            <ul>
                                                <li>
                                                    <Link to="/master-data" className="active">
                                                        Ornament
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/ornament-type" className="">
                                                        Ornament Type
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/purity" className="">
                                                        Purity
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/identification-type" className="">
                                                        Identification Type
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/token-entry">Token Entry</Link>
                                                </li>
                                                <li>
                                                    <Link to="/gst-entry">GST pctg entry</Link>
                                                </li>
                                                <li>
                                                    <Link to="/state-code">STATE Code</Link>
                                                </li>
                                                <li>
                                                    <Link to="/hsn-code">HSN Code</Link>
                                                </li>
                                                <li>
                                                    <Link to="/hm-charge">HM Charge</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /All Invoice */}
                        {/* Table */}
                        <div className="row">
                            <div className="col-sm-12">
                                <div className=" card-table">
                                    <div className="card-body">
                                        <div className="table-responsive table-hover table-striped">
                                            <Table
                                                // pagination={{
                                                //     total: datasource.length,
                                                //     showTotal: (total, range) =>
                                                //         `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                //     showSizeChanger: true,
                                                //     onShowSizeChange: onShowSizeChange,
                                                //     itemRender: itemRender,
                                                // }}
                                                columns={columns}
                                                dataSource={datasource}
                                                rowKey={(record) => record.id}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Table */}
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
                                    <div className="col-lg-12">
                                        <div className="form-group mb-0">
                                            {/* <label>Ornament Desc</label> */}
                                            <input
                                                // ref={OrnamentDescRef}
                                                type="text"
                                                className="form-control"
                                                style={{ width: '100%' }}
                                                value={item}
                                                onChange={(text) => {
                                                    setitem(text.target.value)
                                                }}
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
            </div>
        </>
    );
};

export default MasterData;
