import axios from "axios";

const url=`http://localhost:3003/user`;
export  const getUser = async ()  => {
  return  await axios.get(url)
}

export  const addUser = async (user)  => {
  return  await axios.post(url,user)
}

export  const Deletuser = async (id)  => {
  return  await axios.delete(`${url}/${id}`)
}

export  const getSingleUser = async (id)  => {
  return  await axios.get(`${url}/${id}`)
}
export  const editUser = async (id,user)  => {
  return  await axios.put(`${url}/${id}`,user)
}
