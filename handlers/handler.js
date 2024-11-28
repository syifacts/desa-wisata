import { nanoid } from 'nanoid';

const desaWisataData = [
    {
        id: '1',
        name: 'Desa Wisata Ngadas',
        location: 'Malang, Jawa Timur',
        photo: 'https://cdn.timesmedia.co.id/images/2020/12/19/Desa-Ngadas.jpg',
        description: 'Desa yang terletak di kaki Gunung Bromo, menawarkan keindahan alam dan budaya lokal.',
    },
    {
        id: '2',
        name: 'Desa Wisata Penglipuran',
        location: 'Bangli, Bali',
        photo: 'https://www.indonesia.travel/content/dam/indtravelrevamp/en/trip-ideas/intip-yuk-daya-tarik-yang-ditawarkan-desa-penglipuran-bali/1.jpg',
        description: 'Desa wisata terkenal dengan tata ruang dan arsitektur tradisional Bali yang memukau.',
    },
    {
        id: '3',
        name: 'Desa Wisata Sawarna',
        location: 'Lebak, Banten',
        photo: 'https://bekelsego.com/wp-content/uploads/2024/08/Black-Yellow-Eid-Al-Adha-Mubarak-Instagram-Post-27.png',
        description: 'Destinasi wisata pantai dan goa yang eksotis di Banten.',
    },
];

// Handler untuk menambahkan data desa wisata
export const addDesaWisataHandler = (request, h) => {
    const { name, location, photo, description } = request.payload;

    const newDesaWisata = {
        id: nanoid(), // Menghasilkan ID unik
        name,
        location,
        photo,
        description,
    };

    desaWisataData.push(newDesaWisata);

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
        data: desaWisataData,
    };
};

// Handler untuk mendapatkan data desa wisata berdasarkan ID
export const getDesaWisataByIdHandler = (request, h) => {
    const { id } = request.params;
    const desa = desaWisataData.find((d) => d.id === id);

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

    const desaIndex = desaWisataData.findIndex((d) => d.id === id);

    if (desaIndex === -1) {
        return h.response({
            status: 'fail',
            message: `Desa wisata dengan id ${id} tidak ditemukan`,
        }).code(404);
    }

    desaWisataData[desaIndex] = {
        ...desaWisataData[desaIndex],
        name: name || desaWisataData[desaIndex].name,
        location: location || desaWisataData[desaIndex].location,
        photo: photo || desaWisataData[desaIndex].photo,
        description: description || desaWisataData[desaWisataIndex].description,
    };

    return {
        status: 'success',
        message: `Desa wisata dengan id ${id} berhasil diperbarui`,
        data: desaWisataData[desaIndex],
    };
};

// Handler untuk menghapus data desa wisata berdasarkan ID
export const deleteDesaWisataByIdHandler = (request, h) => {
    const { id } = request.params;

    const desaIndex = desaWisataData.findIndex((d) => d.id === id);

    if (desaIndex === -1) {
        return h.response({
            status: 'fail',
            message: `Desa wisata dengan id ${id} tidak ditemukan`,
        }).code(404);
    }

    desaWisataData.splice(desaIndex, 1);

    return {
        status: 'success',
        message: `Desa wisata dengan id ${id} berhasil dihapus`,
    };
};