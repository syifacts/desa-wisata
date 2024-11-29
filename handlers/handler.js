import { nanoid } from 'nanoid';

// Menggunakan objek untuk penyimpanan data agar pencarian lebih cepat
const desaWisataData = {
    '1': {
        id: '1',
        name: 'Desa Wisata Ngadas',
        location: 'Malang, Jawa Timur',
        photo: 'https://cdn.timesmedia.co.id/images/2020/12/19/Desa-Ngadas.jpg',
        description: 'Desa yang terletak di kaki Gunung Bromo, menawarkan keindahan alam dan budaya lokal.',
    },
    '2': {
        id: '2',
        name: 'Desa Wisata Penglipuran',
        location: 'Bangli, Bali',
        photo: 'https://www.indonesia.travel/content/dam/indtravelrevamp/en/trip-ideas/intip-yuk-daya-tarik-yang-ditawarkan-desa-penglipuran-bali/1.jpg',
        description: 'Desa wisata terkenal dengan tata ruang dan arsitektur tradisional Bali yang memukau.',
    },
    '3': {
        id: '3',
        name: 'Desa Wisata Sawarna',
        location: 'Lebak, Banten',
        photo: 'https://bekelsego.com/wp-content/uploads/2024/08/Black-Yellow-Eid-Al-Adha-Mubarak-Instagram-Post-27.png',
        description: 'Destinasi wisata pantai dan goa yang eksotis di Banten.',
    },
};

// Handler untuk menambahkan data desa wisata
export const addDesaWisataHandler = (request, h) => {
    const { name, location, photo, description } = request.payload;

    const newDesaWisata = {
        id: nanoid(), 
        name,
        location,
        photo,
        description,
    };

    desaWisataData[newDesaWisata.id] = newDesaWisata; // Menyimpan dalam objek

    return {
        status: 'success',
        message: 'Desa wisata berhasil ditambahkan',
        data: newDesaWisata,
    };
};

// Handler untuk mendapatkan semua data desa wisata
export const getAllDesaWisataHandler = (request, h) => {
    return {
        status: 'success',
        data: Object.values(desaWisataData), // Mengambil semua nilai dari objek
    };
};

// Handler untuk mendapatkan data desa wisata berdasarkan ID
export const getDesaWisataByIdHandler = (request, h) => {
    const { id } = request.params;
    const desa = desaWisataData[id];

    if (!desa) {
        return h.response({
            status: 'fail',
            message: `Desa wisata dengan id ${id} tidak ditemukan`,
        }).code(404);
    }

    return {
        status: 'success',
        data: desa,
    };
};

// Handler untuk memperbarui data desa wisata berdasarkan ID
export const updateDesaWisataByIdHandler = (request, h) => {
    const { id } = request.params;
    const { name, location, photo, description } = request.payload;

    const desa = desaWisataData[id];

    if (!desa) {
        return h.response({
            status: 'fail',
            message: `Desa wisata dengan id ${id} tidak ditemukan`,
        }).code(404);
    }

    // Memperbarui data desa wisata
    desaWisataData[id] = {
        ...desa,
        name: name || desa.name,
        location: location || desa.location,
        photo: photo || desa.photo,
        description: description || desa.description,
    };

    return {
        status: 'success',
        message: `Desa wisata dengan id ${id} berhasil diperbarui`,
        data: desaWisataData[id],
    };
};

// Handler untuk menghapus data desa wisata berdasarkan ID
export const deleteDesaWisataByIdHandler = (request, h) => {
    const { id } = request.params;

    if (!desaWisataData[id]) {
        return h.response({
            status: 'fail',
            message: `Desa wisata dengan id ${id} tidak ditemukan`,
        }).code(404);
    }

    delete desaWisataData[id]; 

    return {
        status: 'success',
        message: `Desa wisata dengan id ${id} berhasil dihapus`,
    };
};