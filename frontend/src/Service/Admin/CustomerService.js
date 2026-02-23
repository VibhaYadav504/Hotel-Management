import axios from "axios";
const API_URL="http://localhost:5000/api/customer";

export const addCustomer=async (payload)=>{
    const response=await axios.post(`${API_URL}/`,payload);
    return response.data;
};
export const getCustomer=async () => {
    const response =await axios.get(`${API_URL}/`);
return response.data;
};
export const getCustomerById=async(id)=>{
    const response=await axios.get(`${API_URL}/${id}`);
    return response.data;
};
export const updateCustomer=async(id,payload)=>{
    const response =await axios.put(`${API_URL}/${id}`,payload);
    return response.data;
};
export const deleteCustomer= async(id)=>{
    const response=await axios.delete(`${API_URL}/${id}`);
    return response.data;
};