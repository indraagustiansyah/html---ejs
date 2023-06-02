const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const upload = multer();
// Menggunakan middleware bodyParser untuk mengizinkan penggunaan req.body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { bahasaList, bahasaRemove, bahasaCreate, bahasaUpdate } = require("../../helpers/api/master/bahasa");
title = "Garuda Information Management System";
judul = "Data Master Bahasa";

web = {
  title,
  judul,
};

// GET route untuk menampilkan halaman view bahasa
router.get("/", async (req, res) => {
  const data = await bahasaList();
  res.render("layout/main", { pages: "../master/bahasa/view", web, data }); // Mengirimkan halaman HTML dengan form tambah bahasa
});

// refresh tabel
router.get("/data", async (req, res) => {
  const data = await bahasaList();
  res.json(data)
});


// Menampilkan List bahasa
router.get("/:id/remove", async (req, res) => {
  const bahasaId = req.params.id;
  try {
    // Hapus Data bahasa
    await bahasaRemove(bahasaId);
    res.sendStatus(200); // Mengirim respons dengan kode status 200
  } catch (error) {
    res.sendStatus(500); // Mengirim respons dengan kode status 500 jika terjadi kesalahan
  }
});

// simpan data base
router.post("/create", upload.none(), async (req, res) => {
  const namabahasa = req.body.nama_bahasa;
  const createBy = req.body.created_user;

  const aktif = (req.body.aktif === 'on') ? true : false;

  try {
    await bahasaCreate(namabahasa, createBy, aktif);
    res.sendStatus(200); // Mengirim respons dengan kode status 200
  } catch (error) {
    res.sendStatus(500); // Mengirim respons dengan kode status 500 jika terjadi kesalahan
  }
});


// update data base
router.post("/update", upload.none(), async (req, res) => {
  const namabahasa = req.body.editNamabahasa;
  const updateBy = req.body.editUpdatedUser;
  const aktif =  (req.body.editAktif === 'on') ? true : false;
  const revisi = req.body.editRevisi;
  const idbahasa = req.body.editIdbahasa;

  try {
    await bahasaUpdate(idbahasa,namabahasa, updateBy, aktif, revisi);
    res.sendStatus(200); // Mengirim respons dengan kode status 200
  } catch (error) {
    res.sendStatus(500); // Mengirim respons dengan kode status 500 jika terjadi kesalahan
  }
});

// PUT route untuk memperbarui data bahasa berdasarkan ID
router.put("/:id", (req, res) => {
  const bahasaId = req.params.id;
  const { namabahasa } = req.body;
  // Lakukan validasi data dan perbarui data bahasa di database berdasarkan ID

  res.redirect("/master/bahasa/"); // Redirect ke halaman daftar bahasa setelah berhasil diperbarui
});

// Export router
module.exports = router;
