import client from "../axios.configured";
export const signIn = (payload) => {
  return client.post(`/admin/auth/signIn`, payload);
};
export const doctorList = () => {
  return client.get(`/admin/doctors`);
};
export const patients = () => {
  return client.get(`/admin/patients`);
};
export const userUpdate = (id, payload) => {
  return client.put(`/admin/approve/${id}`, payload);
};
export const getClinicsList = () => {
  return client.get(`/admin/clinics`);
};

export const updateClinicById = (id, payload) => {
  return client.put(`/admin/clinic/${id}`, payload);
};

export const getDoctorById = (id) => {
  return client.get(`/admin/doctor/${id}`);
};

export const getPatientById = (id) => {
  return client.get(`/admin/patient/${id}`);
};

export const getClinicById = (id) => {
  return client.get(`/admin/clinic/${id}`);
};

export const updatePatientById = (id, payload) => {
  return client.patch(`/admin/patients/${id}`, payload);
};

export const updateDoctorById = (id, payload) => {
  return client.patch(`/admin/doctors/${id}`, payload);
};

export const editClinicById = (id, payload) => {
  return client.patch(`/admin/clinics/${id}`, payload);
};

export const inviteDoctor = (payload) => {
  return client.post(`/admin/invite/doctor`, payload);
};
export const clinics = () => {
  return client.get(`auth/clinics`);
};
export const editDoctorById = (id, payload) => {
  return client.patch(`/admin/doctors/${id}`, payload);
};

export const editPatientById = (id, payload) => {
  return client.patch(`/admin/patients/${id}`, payload);
};
export const addKeywords = (payload) => {
  return client.post(`/taxonomy`, payload);
};
export const getKeywords = () => {
  return client.get(`/taxonomy`);
};
export const getDocByClinicId = (id) => {
  return client.get(`/admin/clinic/${id}/doctors`);
};
export const getAppointmentWithDocId = (id) => {
  return client.get(`admin/appointment/doctor/${id}`);
};
export const invoicesList = () => {
  return client.get(`/admin/topUp-request`);
};

export const withdrawlRequests = () => {
  return client.get(`/admin/withdraw-request`);
};
export const editWithdrawlRequests = (id, payload) => {
  return client.patch(`/admin/withdraw-request/${id}`, payload);
};
export const approveInvoice = (id, payload) => {
  return client.post(`/admin/topUp-request/${id}`, payload);
};

export const widthdrawlList = () => {
  return client.get(`/admin/withdraw-request`);
};
export const getWallet = () => {
  return client.get(`/admin/wallet`);
};

export const approveWithdrawl = (id) => {
  return client.post(`/admin/withdraw-request/${id}`);
};
export const updatePercentage = (payload) => {
  return client.patch(`/admin/update`, { ...payload });
};
export const getPercentage = (payload) => {
  return client.get(`/admin/getPercentage`);
};
