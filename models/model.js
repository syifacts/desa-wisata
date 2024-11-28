// model.js
import mongoose from 'mongoose';

// Definisikan skema untuk Desa Wisata
const desaWisataSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nama desa wisata
    location: { type: String, required: true }, // Lokasi desa wisata
    photo: { type: String, required: true }, // URL foto desa wisata
    description: { type: String, required: true }, // Deskripsi desa wisata
    createdAt: { type: Date, default: Date.now } // Tanggal dibuat
});

// Buat model berdasarkan skema
const ExampleModel = mongoose.model('DesaWisata', desaWisataSchema);

// Ekspor model agar bisa digunakan di file lain
export default ExampleModel;