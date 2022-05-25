import React, { useEffect, useState } from "react";
import { Table, Switch } from "antd";
import { Link } from "react-router-dom";
import SidebarNav from "../sidebar";
import {
  itemRender,
  onShowSizeChange,
} from "../../components/paginationfunction";
import NotifyBanner from "../NotifyBanner";
import { invoicesList, approveInvoice } from "../../apis/adminV1";
import moment from "moment";
import useTableSearch from "../../hooks/useTableSearch";
import { useLocales } from "../../hooks/useLocales";
const Invoices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const getColumnSearchProps = useTableSearch();
  const { t } = useLocales();
  const getInvoicesList = async () => {
    try {
      setLoading(true);
      const docList = await invoicesList();
      setData(
        docList.map((item) => ({
          ...item,
          firstName: item.User.firstName,
          lastName: item.User.lastName,
        }))
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const updateInvoice = async (id, data) => {
    try {
      await approveInvoice(id, data);
      setMsg(t("Top up request approved successfully"));
      getInvoicesList();
    } catch (err) {
      setMsg(err.errMsg);
    }
  };

  useEffect(() => {
    getInvoicesList();
  }, []);
  const columns = [
    {
      title: t("Amount"),
      dataIndex: "amount",
      ...getColumnSearchProps("amount"),
    },
    {
      title: t("First Name"),
      dataIndex: "firstName",
      ...getColumnSearchProps("firstName"),
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
          <Link>{text}</Link>
        </h2>
      ),
    },
    {
      title: t("Last Name"),
      dataIndex: "lastName",
      ...getColumnSearchProps("lastName"),
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link>{text}</Link>
        </h2>
      ),
    },
    {
      title: t("transaction Id"),
      dataIndex: "transactionId",
      ...getColumnSearchProps("transactionId"),
    },
    {
      title: t("Created At"),
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
      defaultSortOrder: "descend",
    },

    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (value, record) => (
        <Switch
          disabled={value === "success"}
          onChange={() => {
            updateInvoice(record.id, { status: "success" });
          }}
          defaultChecked={value === "success" ? true : false}
        />
      ),
      filters: [
        {
          text: t("pending"),
          value: "pending",
        },
        {
          text: t("success"),
          value: "success",
        },
      ],
      onFilter: (value, record) => record?.status?.indexOf(value) === 0,
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
                <h3 className="page-title">{t("Top Up Requests")}</h3>

                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">{t("Dashboard")}</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#0">{t("Users")}</Link>
                  </li>
                  <li className="breadcrumb-item active">{t("Top Ups")}</li>
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
                      loading={loading}
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
                          `${t("Showing")} ${range[0]} ${t("to")} ${
                            range[1]
                          } ${t("of")} ${total} ${t("entries")}`,
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

export default Invoices;
