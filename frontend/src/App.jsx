import { useEffect, useState } from 'react'
import Upload from './components/Upload.jsx'
import DocumentsList from './components/DocumentsList.jsx'
import './App.css'
import api from './api.js'

function App() {

  const [message, setMessage] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments =async ()=>{
    try{

      setLoading(true);
      const response = await api.get("/documents");
      setDocuments(response.data);

    }catch(error){
      console.error("Error fetching documents:", error);
    }finally{
      setLoading(false);
    }
  }
  

  useEffect(()=>{
    fetchDocuments();
  },[]);


  const handleUploadSuccess = (msg)=>{
    setMessage(msg);
    fetchDocuments();
  }

  const handleDelete = async (id)=>{
    try{
      await api.delete(`/documents/${id}`)
      setMessage("Document deleted successfully");
      fetchDocuments();
    }catch(error){
      console.error("Error deleting document:", error);
      setMessage("Error deleting document");
    }
  }

  const handleCloseMessage =  ()=>{
    setMessage(null);
  }
  

  return (

    <div className='min-h-screen flex items-center'>
      <div className='w-full bg-white shadow-lg rounded-xl p-6 m-4'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Patient Document Portal</h1>

        <p className='text-sm text-slate-500 mb-6 text-center'> Upload, View, Download or Delete your medical PDFs</p>


        {message && (
           <div className="mb-4 flex justify-between items-center bg-blue-50 border border-blue-200 text-blue-700 text-sm px-4 py-2 rounded-md">
            <span>{message}</span>
            <button
              onClick={handleCloseMessage}
              className="ml-4 text-xs font-semibold hover:underline"
            >
              Close
            </button>
          </div>
        )}

        <Upload onUploadSuccess={handleUploadSuccess} setMessage={setMessage} />


        <div className="border-t my-6" />


        <div className='flex items-center justify-between mb-3'>
            <h2 className='font-bold text-xl text-slate-700'>Uploaded Documents</h2>
            

              {loading && (
                <p>Loading documents...</p>
              )}
            
        </div>
        <DocumentsList documents={documents} onDelete={handleDelete} />
      </div>

    </div>
   
  )
}

export default App
