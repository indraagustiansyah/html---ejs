const axios = require("axios"); // Jika Anda menggunakan modul Axios

async function jenis_pembayaranList() {
  try {
    const apiUrl = "http://localhost:3100/master-data/jenis-pembayaran";
    const response = await axios.get(apiUrl); // Mengambil data dari API
    const data = response.data; // Data dari API
    return data; // Menyampaikan data ke view.ejs
  } catch (error) {
    return "";
  }
}

async function jenis_pembayaranRemove(id) {
  try {
    const apiUrl = `http://localhost:3100/master-data/jenis-pembayaran/${id}`;
    const response = await axios.delete(apiUrl); // Mengambil data dari API
  
    return true; // Menyampaikan data ke view.ejs
  } catch (error) {
    return false;
  }
}

async function jenis_pembayaranCreate(namajenis_pembayaran, createBy, aktif) {
  try {
    const apiUrl = `http://localhost:3100/master-data/jenis-pembayaran`;
    const response = await axios.post(apiUrl, {
      nama_jenis_pembayaran: namajenis_pembayaran,
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


async function jenis_pembayaranUpdate(id,namajenis_pembayaran, updateBy, aktif, revisi) {
    try {
      const apiUrl = `http://localhost:3100/master-data/jenis-pembayaran/${id}`;
      const response = await axios.put(apiUrl, {
            aktif: aktif,
            revisi: revisi,
            nama_jenis_pembayaran: namajenis_pembayaran,
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
  jenis_pembayaranList,
  jenis_pembayaranRemove,
  jenis_pembayaranCreate,
  jenis_pembayaranUpdate
};
