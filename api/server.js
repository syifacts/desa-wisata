import Hapi from '@hapi/hapi';
import mongoose from 'mongoose';
import routes from '../routes/routes.js';
import dotenv from 'dotenv';


dotenv.config();


const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
         
        });
        console.log('Koneksi ke MongoDB berhasil');
    } catch (error) {
        console.error('Koneksi ke MongoDB gagal:', error);
        process.exit(1); 
    }
};


const exampleSchema = new mongoose.Schema({
    name: String,
    createdAt: { type: Date, default: Date.now }
});

const ExampleModel = mongoose.model('Example', exampleSchema);

// Fungsi utama untuk menginisialisasi server
const init = async () => {
    
    await connectToDatabase();

    const server = Hapi.server({
        port: process.env.PORT || 3000, 
        host: '0.0.0.0',
        routes: {
            timeout: {
                server: 10000,
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/favicon.ico',
        handler: (request, h) => {
            return h.response().code(204); 
        }
    });

    server.route({
        method: 'GET',
        path: '/favicon.png',
        handler: (request, h) => {
            return h.response().code(204); 
        }
    });

    
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Welcome to My Website!';
        }
    });

  
    server.route(routes);

    await server.start();
    console.log("Server is starting...");
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
    };


process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});


init();

export default init;

