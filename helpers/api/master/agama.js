const axios = require("axios"); // Jika Anda menggunakan modul Axios

async function agamaList() {
  try {
    const apiUrl = "http://localhost:3100/master-data/agama";
    const response = await axios.get(apiUrl); // Mengambil data dari API
    const data = response.data; // Data dari API
    return data; // Menyampaikan data ke view.ejs
  } catch (error) {
    return "";
  }
}

async function agamaRemove(id) {
  try {
    const apiUrl = `http://localhost:3100/master-data/agama/${id}`;
    const response = await axios.delete(apiUrl); // Mengambil data dari API
  
    return true; // Menyampaikan data ke view.ejs
  } catch (error) {
    return false;
  }
}

async function agamaCreate(namaAgama, createBy, aktif) {
  try {
    const apiUrl = `http://localhost:3100/master-data/agama`;
    const response = await axios.post(apiUrl, {
      nama_agama: namaAgama,
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


async function agamaUpdate(id,namaAgama, updateBy, aktif, revisi) {
    try {
      const apiUrl = `http://localhost:3100/master-data/agama/${id}`;
      const response = await axios.put(apiUrl, {
            akti: aktif,
            revisi: revisi,
            nama_agama: namaAgama,
            updated_user: updateBy
          
      });
      //console.log(response)
      return true; // Menyampaikan data ke view.ejs
    } catch (error) {
      console.error(error);
      return false;
    }
  }

module.exports = {
  agamaList,
  agamaRemove,
  agamaCreate,
  agamaUpdate
};
