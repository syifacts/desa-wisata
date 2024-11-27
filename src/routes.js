import Joi from 'joi';
import ExampleModel from './model.js'; // Pastikan Anda mengimpor model yang benar

const routes = [
    {
        method: 'GET',
        path: '/desa-wisata',
        handler: async (request, h) => {
            try {
                const desaWisata = await ExampleModel.find();
                return h.response(desaWisata).code(200);
            } catch (error) {
                console.error(error);
                return h.response({ message: 'Terjadi kesalahan saat mengambil data' }).code(500);
            }
        },
    },
    {
        method: 'GET',
        path: '/desa-wisata/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            try {
                const desaWisata = await ExampleModel.findById(id);
                if (!desaWisata) {
                    return h.response({ message: 'Data tidak ditemukan' }).code(404);
                }
                return h.response(desaWisata).code(200);
            } catch (error) {
                console.error(error);
                return h.response({ message: 'Terjadi kesalahan saat mengambil data' }).code(500);
            }
        },
    },
    {
        method: 'POST',
        path: '/desa-wisata',
        handler: async (request, h) => {
            const { name, location, photo, description } = request.payload;
            const newDesaWisata = new ExampleModel({ name, location, photo, description });
            try {
                await newDesaWisata.save();
                return h.response(newDesaWisata).code(201);
            } catch (error) {
                console.error(error);
                return h.response({ message: 'Terjadi kesalahan saat menyimpan data' }).code(500);
            }
        },
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    location: Joi.string().required(),
                    photo: Joi.string().uri().required(),
                    description: Joi.string().required(),
                }),
            },
        },
    },
    {
        method: 'PUT',
        path: '/desa-wisata/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            const { name, location, photo, description } = request.payload;

            try {
                const updatedDesaWisata = await ExampleModel.findByIdAndUpdate(
                    id,
                    { name, location, photo, description },
                    { new: true }
                );

                if (!updatedDesaWisata) {
                    return h.response({ message: 'Data tidak ditemukan' }).code(404);
                }

                return h.response(updatedDesaWisata).code(200);
            } catch (error) {
                console.error(error);
                return h.response({ message: 'Terjadi kesalahan saat memperbarui data' }).code(500);
            }
        },
    },
    {
        method: 'DELETE',
        path: '/desa-wisata/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            try {
                const deletedDesaWisata = await ExampleModel.findByIdAndDelete(id);

                if (!deletedDesaWisata) {
                    return h.response({ message: 'Data tidak ditemukan' }).code(404);
                }

                return h.response({ message: 'Data berhasil dihapus' }).code(200);
            } catch (error) {
                console.error(error);
                return h.response({ message: 'Terjadi kesalahan saat menghapus data' }).code(500);
            }
        },
    },
];

export default routes;