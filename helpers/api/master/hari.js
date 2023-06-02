const axios = require("axios"); // Jika Anda menggunakan modul Axios

async function hariList() {
  try {
    const apiUrl = "http://localhost:3100/master-data/hari";
    const response = await axios.get(apiUrl); // Mengambil data dari API
    const data = response.data; // Data dari API
    return data; // Menyampaikan data ke view.ejs
  } catch (error) {
    return "";
  }
}

async function hariRemove(id) {
  try {
    const apiUrl = `http://localhost:3100/master-data/hari/${id}`;
    const response = await axios.delete(apiUrl); // Mengambil data dari API
  
    return true; // Menyampaikan data ke view.ejs
  } catch (error) {
    return false;
  }
}

async function hariCreate(namahari, createBy, aktif) {
  try {
    const apiUrl = `http://localhost:3100/master-data/hari`;
    const response = await axios.post(apiUrl, {
      nama_hari: namahari,
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


async function hariUpdate(id,namahari, updateBy, aktif, revisi) {
    try {
      const apiUrl = `http://localhost:3100/master-data/hari/${id}`;
      const response = await axios.put(apiUrl, {
            aktif: aktif,
            revisi: revisi,
            nama_hari: namahari,
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
  hariList,
  hariRemove,
  hariCreate,
  hariUpdate
};
