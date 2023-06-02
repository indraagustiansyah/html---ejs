const axios = require("axios"); // Jika Anda menggunakan modul Axios

async function bahasaList() {
  try {
    const apiUrl = "http://localhost:3100/master-data/bahasa";
    const response = await axios.get(apiUrl); // Mengambil data dari API
    const data = response.data; // Data dari API
    return data; // Menyampaikan data ke view.ejs
  } catch (error) {
    return "";
  }
}

async function bahasaRemove(id) {
  try {
    const apiUrl = `http://localhost:3100/master-data/bahasa/${id}`;
    const response = await axios.delete(apiUrl); // Mengambil data dari API
  
    return true; // Menyampaikan data ke view.ejs
  } catch (error) {
    return false;
  }
}

async function bahasaCreate(namabahasa, createBy, aktif) {
  try {
    const apiUrl = `http://localhost:3100/master-data/bahasa`;
    const response = await axios.post(apiUrl, {
      bahasa: namabahasa,
      created_user: createBy,
      aktif: aktif,
    });
    //console.log(response)
    return true; // Menyampaikan data ke view.ejs
  } catch (error) {
    console.error(error);
    return false;
  }
}


async function bahasaUpdate(id,namabahasa, updateBy, aktif, revisi) {
    try {
      const apiUrl = `http://localhost:3100/master-data/bahasa/${id}`;
      const response = await axios.put(apiUrl, {
            aktif: aktif,
            revisi: revisi,
            bahasa: namabahasa,
            updated_user: updateBy
          
      });
     // console.log(response)
      return true; // Menyampaikan data ke view.ejs
    } catch (error) {
      console.error(error);
      return false;
    }
  }

module.exports = {
  bahasaList,
  bahasaRemove,
  bahasaCreate,
  bahasaUpdate
};
