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
  const aktif = req.body.aktif;

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
  const updateBy = req.body.editUpdatedBy;
  const aktif = req.body.editAktif;
  const revisi = req.body.editRevisi;
  const idagama = req.body.editIdAgama;

  try {
    await agamaUpdate(idagama,namaAgama, updateBy, aktif, revisi);
    res.sendStatus(200); // Mengirim respons dengan kode status 200
  } catch (error) {
    res.sendStatus(500); // Mengirim respons dengan kode status 500 jika terjadi kesalahan
  }
});

/* // GET route untuk menampilkan halaman edit agama berdasarkan ID
router.get("/:id/edit", (req, res) => {
  const agamaId = req.params.id;
  // Ambil data agama dari database berdasarkan ID

  res.render("layout/main", { pages: "../master/agama/edit", web }); // Mengirimkan halaman HTML dengan form tambah agama
});

// POST route untuk menambahkan data agama
router.post("/", (req, res) => {
  const { namaAgama } = req.body;
  // Lakukan validasi data dan simpan ke database

  res.redirect("/master/agama/"); // Redirect ke halaman daftar agama setelah berhasil menambahkan
}); */

// PUT route untuk memperbarui data agama berdasarkan ID
router.put("/:id", (req, res) => {
  const agamaId = req.params.id;
  const { namaAgama } = req.body;
  // Lakukan validasi data dan perbarui data agama di database berdasarkan ID

  res.redirect("/master/agama/"); // Redirect ke halaman daftar agama setelah berhasil diperbarui
});

// Export router
module.exports = router;
