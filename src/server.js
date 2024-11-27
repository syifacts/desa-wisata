import Hapi from '@hapi/hapi';
import mongoose from 'mongoose';
import routes from './routes.js';
import dotenv from 'dotenv';

// Konfigurasi dotenv
dotenv.config();

// Koneksi ke MongoDB menggunakan variabel lingkungan
await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Definisikan skema
const exampleSchema = new mongoose.Schema({
    name: String,
    createdAt: { type: Date, default: Date.now }
});

const ExampleModel = mongoose.model('Example', exampleSchema);

const init = async () => {
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

init();