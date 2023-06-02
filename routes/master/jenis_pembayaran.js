const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const upload = multer();
// Menggunakan middleware bodyParser untuk mengizinkan penggunaan req.body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { jenis_pembayaranList, jenis_pembayaranRemove, jenis_pembayaranCreate, jenis_pembayaranUpdate } = require("../../helpers/api/master/jenis_pembayaran");
title = "Garuda Information Management System";
judul = "Data Master Jenis Pembayaran";

web = {
  title,
  judul,
};

// GET route untuk menampilkan halaman view jenis_pembayaran
router.get("/", async (req, res) => {
  const data = await jenis_pembayaranList();
  res.render("layout/main", { pages: "../master/jenis_pembayaran/view", web, data }); // Mengirimkan halaman HTML dengan form tambah jenis_pembayaran
});

// refresh tabel
router.get("/data", async (req, res) => {
  const data = await jenis_pembayaranList();
  res.json(data)
});


// Menampilkan List jenis_pembayaran
router.get("/:id/remove", async (req, res) => {
  const jenis_pembayaranId = req.params.id;
  try {
    // Hapus Data jenis_pembayaran
    await jenis_pembayaranRemove(jenis_pembayaranId);
    res.sendStatus(200); // Mengirim respons dengan kode status 200
  } catch (error) {
    res.sendStatus(500); // Mengirim respons dengan kode status 500 jika terjadi kesalahan
  }
});

// simpan data base
router.post("/create", upload.none(), async (req, res) => {
  const namajenis_pembayaran = req.body.nama_jenis_pembayaran;
  const createBy = req.body.created_user;

  const aktif = (req.body.aktif === 'on') ? true : false;

  try {
    await jenis_pembayaranCreate(namajenis_pembayaran, createBy, aktif);
    res.sendStatus(200); // Mengirim respons dengan kode status 200
  } catch (error) {
    res.sendStatus(500); // Mengirim respons dengan kode status 500 jika terjadi kesalahan
  }
});


// update data base
router.post("/update", upload.none(), async (req, res) => {
  const namajenis_pembayaran = req.body.editNamajenis_pembayaran;
  const updateBy = req.body.editUpdatedUser;
  const aktif =  (req.body.editAktif === 'on') ? true : false;
  const revisi = req.body.editRevisi;
  const idjenis_pembayaran = req.body.editIdjenis_pembayaran;

  try {
    await jenis_pembayaranUpdate(idjenis_pembayaran,namajenis_pembayaran, updateBy, aktif, revisi);
    res.sendStatus(200); // Mengirim respons dengan kode status 200
  } catch (error) {
    res.sendStatus(500); // Mengirim respons dengan kode status 500 jika terjadi kesalahan
  }
});

// PUT route untuk memperbarui data jenis_pembayaran berdasarkan ID
router.put("/:id", (req, res) => {
  const jenis_pembayaranId = req.params.id;
  const { namajenis_pembayaran } = req.body;
  // Lakukan validasi data dan perbarui data jenis_pembayaran di database berdasarkan ID

  res.redirect("/master/jenis_pembayaran/"); // Redirect ke halaman daftar jenis_pembayaran setelah berhasil diperbarui
});

// Export router
module.exports = router;
