import React, { useEffect, useState } from "react";
import { Table, Switch, Modal, Input, Button, Space } from "antd";
import { Link } from "react-router-dom";
import SidebarNav from "../sidebar";
import {
  itemRender,
  onShowSizeChange,
} from "../../components/paginationfunction";
import NotifyBanner from "../NotifyBanner";
import {
  doctorList,
  userUpdate,
  inviteDoctor,
  editDoctorById,
} from "../../apis/adminV1";
import { useHistory } from "react-router";
import InviteDoctorToClinicModal from "./InviteDoctorModal";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import useTableSearch from "../../hooks/useTableSearch";
import { useLocales } from "../../hooks/useLocales";
const Doctors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const { t } = useLocales();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const { confirm } = Modal;
  const getColumnSearchProps = useTableSearch();
  function showConfirm(record) {
    confirm({
      title: "Are you sure ?",
      icon: <ExclamationCircleOutlined />,
      content: "Do you Want to delete this doctor?",
      onOk() {
        deleteDoctor(record);
      },
    });
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleInvite = async (data) => {
    try {
      await inviteDoctor(data);
    } catch (err) {
      setMsg(err.errMsg);
    }
  };
  const history = useHistory();

  const getDoctorList = async () => {
    try {
      setLoading(true);
      const docList = await doctorList();
      setData(docList);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const updateUser = async (id, data) => {
    try {
      const res = await userUpdate(id, data);
      setMsg(res.status);
    } catch (err) {
      setMsg(err.errMsg);
    }
  };
  const deleteDoctor = async (record) => {
    await editDoctorById(record.id, { isDeleted: true, deletedByAdmin: true });
    setMsg("doctor deleted successfully");
    getDoctorList();
  };
  const showDoctor = (id) => {
    history.push(`/doctor/${id}`);
  };
  useEffect(() => {
    getDoctorList();
  }, []);

  const columns = [
    {
      title: t("First Name"),
      dataIndex: "firstName",
      ...getColumnSearchProps("firstName"),
      render: (text, record) => (
        <h2 onClick={() => showDoctor(record?.id)} className="table-avatar">
          <Link className="avatar avatar-sm mr-2">
            <img
              alt=""
              src={
                record?.profileImage
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
        <h2 onClick={() => showDoctor(record?.id)} className="table-avatar">
          <Link>{text}</Link>
        </h2>
      ),
    },
    {
      title: t("Phone Number"),
      dataIndex: "phoneNumber",
      ...getColumnSearchProps("phoneNumber"),
    },
    {
      title: t("City"),
      dataIndex: "city",
      ...getColumnSearchProps("city"),
    },
    {
      title: t("Member Since"),
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
      title: t("Approved"),
      dataIndex: "isApproved",
      key: "isApproved",
      render: (value, record) => (
        <Switch
          onChange={(e) => {
            updateUser(record.id, { approve: e });
          }}
          defaultChecked={value}
        />
      ),
      filters: [
        {
          text: t("Not Approved"),
          value: 0,
        },
        {
          text: t("Approved"),
          value: 1,
        },
      ],
      onFilter: (value, record) => record?.isApproved == value,
    },
    {
      title: t("Delete"),
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (value, record) => (
        <Link>
          <div onClick={() => showConfirm(record)}>
            {!record.isDeleted && <DeleteOutlined />}
          </div>
        </Link>
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
                <h3 className="page-title">{t("List of Doctors")}</h3>

                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">{t("Dashboard")}</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#0">{t("Users")}</Link>
                  </li>
                  <li className="breadcrumb-item active">{t("Doctor")}</li>
                </ul>
                <button
                  onClick={showModal}
                  type="button"
                  className="ml-4 mt-4 btn btn-secondary"
                >
                  {t("invite a doctor")}
                </button>
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
                      // bordered
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
                          } ${"of"} ${total} ${"entries"}`,
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
      <InviteDoctorToClinicModal
        showModal={showModal}
        t={t}
        handleOk={handleOk}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleInvite={handleInvite}
      />
    </>
  );
};

export default Doctors;
