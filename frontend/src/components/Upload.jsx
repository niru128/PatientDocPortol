import React from 'react'
import { useState } from 'react';
import api from '../api';

const Upload = ({onUploadSuccess,setMessage}) => {
  const [file,  setFile ] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFilechange = (e)=>{

        const selected = e.target.files[0];

        if(selected && selected.type !== 'application/pdf'){
            setMessage("Please select a PDF file");
            setFile(null);
            return;
        }

        setFile(selected);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!file){
            setMessage("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try{

            setUploading(true);

            const res = await api.post('/documents/upload', formData, {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                },
            })

            onUploadSuccess("file uploaded successfully");
            setFile(null);
            e.target.reset();

        }catch(error){
            console.error("Error uploading file:", error);
            setMessage("Error uploading file"); 
        }finally{
            setUploading(false);
        }
    }
  return (
    <form className='flex flex-col sm:flex-row items-center gap-3' onSubmit={handleSubmit}>
        <input type="file"  className='block w-full text-sm text-slate-700
                   file:mr-3 file:py-2 file:px-4
                   file:rounded-lg file:border-0
                   file:text-sm file:font-semibold
                   file:bg-slate-100 file:text-slate-700
                   hover:file:bg-slate-200' accept='application/pdf' onChange={handleFilechange}  />
        <button type="submit" disabled={uploading} className='"w-full sm:w-auto inline-flex justify-center items-center px-4 py-2
                   bg-slate-800 text-white text-sm font-semibold rounded-lg
                   hover:bg-slate-900 disabled:opacity-60 disabled:cursor-not-allowed'  >{uploading ? "uploading..." : "Upload PDF"}</button>
    </form>
  )
}

export default Upload
