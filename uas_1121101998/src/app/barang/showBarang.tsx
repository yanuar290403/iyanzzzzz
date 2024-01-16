'use client'

import { useState, useEffect } from "react";
// import { useRouter } from "../../../node_modules/next/navigation";
import router , {useRouter} from "../../../node_modules/next/router";
import axios from "../../../node_modules/axios/index";
interface Barang {
    id: number
    attributes: {
        NamaBarang: string
        JenisBarang: string
        StokBarang: string
        HargaBarang: number
        Supplayer: string
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }
}

export default function ShowBarangPage(){
    const [data, setData] = useState({})

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedData = await axios.get(`http://localhost:1337/api/barangs/${id}`);
                const barang = fetchedData.data.data as Barang;
                setData(barang);
            } catch (error) {
              console.error('Error:', error);
            }
          }
      
          if(id){
            fetchData();
          }
    }, [id])

    const handleClose = () => {
        router.push('/barang')
    }   

    // let barang = 

    return(
        <div>
            <h2>Mahasiswa Details</h2>
            <p>Nama Barang: </p>
            <p>Jenis Barang: </p>
            <p>Stok Barang: </p>
            <p>Harga Barang: </p>
            <p>Suplayer: </p>
          </div>
    )
}
