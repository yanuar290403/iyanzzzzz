'use client'

import React, { useState, useEffect } from "react";
import router, { useRouter } from "../../../node_modules/next/router";
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

async function getData(): Promise<Barang[]> {
    try {
      const response = await axios.get('http://localhost:1337/api/barangs');
      return response.data.data as Barang[];
    } catch (error) {
      throw new Error("Gagal Mendapat Data");
    }
  }

export default function BarangPage(){
    const [data, setData] = useState<Barang[]>([])
    const [selectedBarang, setSelectedBarang] = useState<Barang | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
              const fetchedData = await getData();
              setData(fetchedData || []);
            } catch (error) {
              console.error('Error:', error);
            }
          }
      
          fetchData();
    }, [])

    const handleShow = (barang: Barang) => {
        setSelectedBarang(barang);
        router.push(`/showBarang/${barang.id}`)
      };
      const handleCreate = (barang: Barang) => {
        // setSelectedBarang(barang);
        router.push('/addBarang');
      };
    
      const handleEdit = (barang: Barang) => {
        // setSelectedBarang(barang);
        router.push(`/editBarang/${barang.id}`);
      };
    
      const handleDelete = async (barang: Barang) => {
        try {
          // Implement your delete logic here
          await axios.delete(`http://localhost:1337/api/Barangs/${barang.id}`);
          // Fetch updated data after deletion
          const updatedData = await getData();
          setData(updatedData || []);
        } catch (error) {
          console.error('Error deleting Barang:', error);
        }
      };

    return(
        <main>
            <h1 style={{ color: "blue" }}>Daftar Mahasiswa</h1>
                <table className="table">
                    <thead>
                        <tr>
                        <th>Nama Barang</th>
                        <th>Jenis Barang</th>
                        <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
            {data.map((barang) => (
                        <tr key={barang.id}>                   
                        <td>{barang.attributes.NamaBarang}</td>
                        <td>{barang.attributes.JenisBarang}</td>
                        <td>
                            <button className="btn btn-blue" onClick={() => handleShow(barang)}>Detail</button>
                            <button className="btn btn-green" onClick={() => handleCreate(barang)}>Tambah</button>
                            <button className="btn btn-yellow" onClick={() => handleEdit(barang)}>Edit</button>
                            <button className="btn btn-red" onClick={() => handleDelete(barang)}>Hapus</button>
                        </td>
                        </tr>
                        ))}
                    </tbody>
                </table>

        </main>
    )
}