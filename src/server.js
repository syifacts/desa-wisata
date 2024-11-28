import Hapi from '@hapi/hapi';
import mongoose from 'mongoose';
import routes from './routes.js';
import dotenv from 'dotenv';

// Konfigurasi dotenv
dotenv.config();

// Fungsi untuk menghubungkan ke MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Koneksi ke MongoDB berhasil');
    } catch (error) {
        console.error('Koneksi ke MongoDB gagal:', error);
        process.exit(1); // Keluar dari proses jika koneksi gagal
    }
};

// Definisikan skema
const exampleSchema = new mongoose.Schema({
    name: String,
    createdAt: { type: Date, default: Date.now }
});

const ExampleModel = mongoose.model('Example', exampleSchema);

// Fungsi utama untuk menginisialisasi server
const init = async () => {
    // Menghubungkan ke database
    await connectToDatabase();

    const server = Hapi.server({
        port: process.env.PORT || 4005, // Menggunakan PORT dari .env
        host: '0.0.0.0',
    });

    // Menambahkan routes
    server.route(routes);

    // Menjalankan server
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

// Menangani error
process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

// Memanggil fungsi init untuk memulai server
init();