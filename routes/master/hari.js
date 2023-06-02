const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const upload = multer();
// Menggunakan middleware bodyParser untuk mengizinkan penggunaan req.body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { hariList, hariRemove, hariCreate, hariUpdate } = require("../../helpers/api/master/hari");
title = "Garuda Information Management System";
judul = "Data Master hari";

web = {
  title,
  judul,
};

// GET route untuk menampilkan halaman view hari
router.get("/", async (req, res) => {
  const data = await hariList();
  res.render("layout/main", { pages: "../master/hari/view", web, data }); // Mengirimkan halaman HTML dengan form tambah hari
});

// refresh tabel
router.get("/data", async (req, res) => {
  const data = await hariList();
  res.json(data)
});


// Menampilkan List hari
router.get("/:id/remove", async (req, res) => {
  const hariId = req.params.id;
  try {
    // Hapus Data hari
    await hariRemove(hariId);
    res.sendStatus(200); // Mengirim respons dengan kode status 200
  } catch (error) {
    res.sendStatus(500); // Mengirim respons dengan kode status 500 jika terjadi kesalahan
  }
});

// simpan data base
router.post("/create", upload.none(), async (req, res) => {
  const namahari = req.body.nama_hari;
  const createBy = req.body.created_user;

  const aktif = (req.body.aktif === 'on') ? true : false;

  try {
    await hariCreate(namahari, createBy, aktif);
    res.sendStatus(200); // Mengirim respons dengan kode status 200
  } catch (error) {
    res.sendStatus(500); // Mengirim respons dengan kode status 500 jika terjadi kesalahan
  }
});


// update data base
router.post("/update", upload.none(), async (req, res) => {
  const namahari = req.body.editNamahari;
  const updateBy = req.body.editUpdatedUser;
  const aktif =  (req.body.editAktif === 'on') ? true : false;
  const revisi = req.body.editRevisi;
  const idhari = req.body.editIdhari;

  try {
    await hariUpdate(idhari,namahari, updateBy, aktif, revisi);
    res.sendStatus(200); // Mengirim respons dengan kode status 200
  } catch (error) {
    res.sendStatus(500); // Mengirim respons dengan kode status 500 jika terjadi kesalahan
  }
});

// PUT route untuk memperbarui data hari berdasarkan ID
router.put("/:id", (req, res) => {
  const hariId = req.params.id;
  const { namahari } = req.body;
  // Lakukan validasi data dan perbarui data hari di database berdasarkan ID

  res.redirect("/master/hari/"); // Redirect ke halaman daftar hari setelah berhasil diperbarui
});

// Export router
module.exports = router;
