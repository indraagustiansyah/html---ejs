const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const upload = multer();
// Menggunakan middleware bodyParser untuk mengizinkan penggunaan req.body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { agamaList, agamaRemove, agamaCreate, agamaUpdate } = require("../../helpers/api/master/agama");
title = "Garuda Information Management System";
judul = "Data Master Agama";

web = {
  title,
  judul,
};

// GET route untuk menampilkan halaman view agama
router.get("/", async (req, res) => {
  const data = await agamaList();
  res.render("layout/main", { pages: "../master/agama/view", web, data }); // Mengirimkan halaman HTML dengan form tambah agama
});

// refresh tabel
router.get("/data", async (req, res) => {
  const data = await agamaList();
  res.json(data)
});


// Menampilkan List Agama
router.get("/:id/remove", async (req, res) => {
  const agamaId = req.params.id;
  try {
    // Hapus Data Agama
    await agamaRemove(agamaId);
    res.sendStatus(200); // Mengirim respons dengan kode status 200
  } catch (error) {
    res.sendStatus(500); // Mengirim respons dengan kode status 500 jika terjadi kesalahan
  }
});

// simpan data base
router.post("/create", upload.none(), async (req, res) => {
  const namaAgama = req.body.nama_agama;
  const createBy = req.body.created_user;

  const aktif = (req.body.aktif === 'on') ? true : false;

  try {
    await agamaCreate(namaAgama, createBy, aktif);
    res.sendStatus(200); // Mengirim respons dengan kode status 200
  } catch (error) {
    res.sendStatus(500); // Mengirim respons dengan kode status 500 jika terjadi kesalahan
  }
});


// update data base
router.post("/update", upload.none(), async (req, res) => {
  const namaAgama = req.body.editNamaAgama;
  const updateBy = req.body.editUpdatedUser;
  const aktif =  (req.body.editAktif === 'on') ? true : false;
  const revisi = req.body.editRevisi;
  const idagama = req.body.editIdAgama;

  try {
    await agamaUpdate(idagama,namaAgama, updateBy, aktif, revisi);
    res.sendStatus(200); // Mengirim respons dengan kode status 200
  } catch (error) {
    res.sendStatus(500); // Mengirim respons dengan kode status 500 jika terjadi kesalahan
  }
});

// PUT route untuk memperbarui data agama berdasarkan ID
router.put("/:id", (req, res) => {
  const agamaId = req.params.id;
  const { namaAgama } = req.body;
  // Lakukan validasi data dan perbarui data agama di database berdasarkan ID

  res.redirect("/master/agama/"); // Redirect ke halaman daftar agama setelah berhasil diperbarui
});

// Export router
module.exports = router;
