import React, { useEffect, useState } from "react";
import { Table, Switch } from "antd";
import { Link } from "react-router-dom";
import SidebarNav from "../sidebar";
import {
  itemRender,
  onShowSizeChange,
} from "../../components/paginationfunction";
import NotifyBanner from "../NotifyBanner";
import { widthdrawlList, approveWithdrawl } from "../../apis/adminV1";
import moment from "moment";

const WithDrawlRequest = () => {
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");

  const getWithdrawlList = async () => {
    try {
      const docList = await widthdrawlList();
      setData(docList);
    } catch (err) {
      console.log(err);
    }
  };
  const updateWithdrawl = async (id, data) => {
    try {
      await approveWithdrawl(id);
      setMsg("Withdrawl Request approved successfully");
      getWithdrawlList();
    } catch (err) {
      setMsg(err.errMsg);
    }
  };

  useEffect(() => {
    getWithdrawlList();
  }, []);
  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "User Name",
      dataIndex: "firstName",
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link className="avatar avatar-sm mr-2">
            <img
              alt=""
              src={
                record?.User?.profileImage
                  ? `https://www.dawiyni.com/api/${record?.profileImage}`
                  : record.image
              }
            />
          </Link>
          <Link>{record?.User?.firstName + " " + record?.User?.lastName}</Link>
        </h2>
      ),
    },
    {
      title: "status",
      dataIndex: "status",
    },
    // {
    //   title: "transactionId",
    //   dataIndex: "transactionId",
    // },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      render: (text, record) => (
        <div className="sorting_1">
          {moment(text).format("l")}
          <span>
            <small>{record.Time}</small>
          </span>
        </div>
      ),
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },

    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (value, record) => (
        <Switch
          onChange={() => {
            updateWithdrawl(record.id, { status: "success" });
          }}
          defaultChecked={value === "success" ? true : false}
        />
      ),
    },
  ];

  return (
    <>
      <SidebarNav />

      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">List of Withdrawl Requests</h3>

                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#0">Users</Link>
                  </li>
                  <li className="breadcrumb-item active">Doctor</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      className="table-striped"
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      dataSource={data}
                      rowKey={(record) => record.id}
                      rowClassName={(record, index) =>
                        record.isDeleted && "tableRowLight1"
                      }
                      showSizeChanger={true}
                      pagination={{
                        total: data?.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotifyBanner message={msg} setMsg={setMsg} />
    </>
  );
};

export default WithDrawlRequest;
