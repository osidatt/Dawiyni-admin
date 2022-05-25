import React, { useEffect, useState } from "react";
import { Table, Switch, Modal, Tooltip } from "antd";
import { Link } from "react-router-dom";
import SidebarNav from "../sidebar";
import {
  itemRender,
  onShowSizeChange,
} from "../../components/paginationfunction";
import NotifyBanner from "../NotifyBanner";
import {
  withdrawlRequests,
  approveWithdrawl,
  editWithdrawlRequests,
} from "../../apis/adminV1";
import moment from "moment";
import useTableSearch from "../../hooks/useTableSearch";
import { useLocales } from "../../hooks/useLocales";
const WithdrawlRequests = () => {
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const { t } = useLocales();
  const [updateWithdrawl, setUpdateWithdrawl] = useState({
    id: null,
    payload: null,
  });
  const showModal = (id) => {
    setUpdateWithdrawl((prev) => ({
      ...prev,
      id,
    }));
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      if (updateWithdrawl.payload.transactionId) {
        setConfirmLoading(true);
        await editWithdrawlRequests(
          updateWithdrawl.id,
          updateWithdrawl.payload
        );
        getWithdrawlRequests();
        setConfirmLoading(false);
        setVisible(false);
        setUpdateWithdrawl({
          id: null,
          payload: null,
        });
      }
    } catch (error) {
      setConfirmLoading(false);
      setVisible(false);
      setUpdateWithdrawl({
        id: null,
        payload: null,
      });
    }
  };

  const handleCancel = () => {
    setUpdateWithdrawl({
      id: null,
      payload: null,
    });
    setVisible(false);
  };
  const getTransactionId = (event) => {
    const {
      target: { value },
    } = event;
    setUpdateWithdrawl((prev) => ({
      ...prev,
      payload: {
        ...prev.payload,
        transactionId: value,
      },
    }));
  };
  const getColumnSearchProps = useTableSearch();

  const getWithdrawlRequests = async () => {
    try {
      setLoading(true);
      const docList = await withdrawlRequests();
      setData(
        docList.map((item) => ({
          ...item,
          fullName: item.User.fullName
            ? item.User.fullName
            : `${item.User.firstName} ${item.User.lastName}`,
        }))
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const approveRequest = async (id) => {
    try {
      await approveWithdrawl(id);
      setMsg(t("Approved Successfully"));
      getWithdrawlRequests();
    } catch (err) {
      setMsg(err.errMsg);
    }
  };

  useEffect(() => {
    getWithdrawlRequests();
  }, []);
  function onTransactionIdClick(record) {
    if (record.status === "accepted") return;
    debugger;
    setUpdateWithdrawl({
      id: record.id,
      payload: {
        transactionId: record.transactionId,
      },
    });
    showModal(record.id);
  }
  const columns = [
    {
      title: t("withdraw Id"),
      dataIndex: "withdrawId",
      ...getColumnSearchProps("withdrawId"),
    },
    {
      title: t("Amount"),
      dataIndex: "amount",
      ...getColumnSearchProps("amount"),
    },
    {
      title: t("Total Amount"),
      dataIndex: "totalAmount",
    },
    {
      title: t("User Name"),
      dataIndex: "fullName",
      ...getColumnSearchProps("fullName"),
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
      title: t("status"),
      dataIndex: "status",
      ...getColumnSearchProps("status"),
      render: (value) => {
        return t(value);
      },
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
      title: t("Approval Time"),
      dataIndex: "approvalTime",
      render: (value, record) => {
        if (value)
          return (
            <div>
              {" "}
              {moment(value).format("l")}
              <span>
                <small>{record.Time}</small>
              </span>
            </div>
          );
        else return <div>{t("Not Approved Yet")}</div>;
      },
      sorter: (a, b) => a.approvalTime.localeCompare(b.approvalTime),
    },
    {
      title: t("Transaction Id"),
      dataIndex: "transactionId",
      render: (value, record) => {
        if (value)
          return (
            <div
              style={{
                cursor: record.status !== "approved" ? "pointer" : "default",
              }}
              onClick={() => onTransactionIdClick(record)}
            >
              {value}
            </div>
          );
        else
          return (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => showModal(record.id)}
            >
              {t("Add Transaction Id")}
            </div>
          );
      },
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (value, record) => {
        return (
          <Tooltip
            title={
              !record?.transactionId
                ? t("Please add transaction id to approve request")
                : null
            }
          >
            <Switch
              disabled={!record?.transactionId || record?.status === "accepted"}
              onChange={() => {
                approveRequest(record.id);
              }}
              defaultChecked={value === "accepted" ? true : false}
            />
          </Tooltip>
        );
      },
      filters: [
        {
          text: t("Not Approved"),
          value: "pending",
        },
        {
          text: t("Approved"),
          value: "accepted",
        },
      ],
      onFilter: (value, record) => record?.status === value,
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
                <h3 className="page-title">
                  {t("List of Withdrawl Requests")}
                </h3>

                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">{t("Dashboard")}</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#0">{t("Users")}</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    {t("Withdraw Requests")}
                  </li>
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
      <Modal
        title={t("Transaction Id")}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose={true}
        okText={t("Ok")}
        cancelText={t("Cancel")}
      >
        <input
          className="form-control"
          value={updateWithdrawl?.payload?.transactionId}
          onChange={(event) => getTransactionId(event)}
        />
      </Modal>
    </>
  );
};

export default WithdrawlRequests;
