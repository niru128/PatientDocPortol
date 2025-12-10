import React from 'react'
import axios from 'axios';
import api from '../api.js';

const formatDate = (dataString) => {
    if (!dataString) return '';

    const d = new Date(dataString);
    return d.toLocaleDateString();
}
const formatSize = (size) => {
    if (!size && size !== 0) return "-";
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};


const DocumentsList = ({ documents, onDelete }) => {


    const handleDownload = async (id, filename) => {
        try {
            const response = await api.get(`/documents/${id}`, {
                responseType: "blob",
            });

            const blob = new Blob([response.data], { type: "application/pdf" });

            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();

            window.URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };


    if (!documents || documents.length === 0) {
        return <p className='text-sm text-slate-500 text-center'>No documents found</p>
    }


    return (
        <div className='overflow-x-auto'>
            <table className="w-full text-sm text-left text-slate-700">
                <thead className="text-xs uppercase bg-slate-100 text-slate-500">
                    <tr>
                        <th className="px-4 py-2">Filename</th>
                        <th className="px-4 py-2 hidden sm:table-cell">Size</th>
                        <th className="px-4 py-2 hidden md:table-cell">Uploaded At</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc) => (
                        <tr
                            key={doc.id}
                            className="border-b last:border-0 hover:bg-slate-50"
                        >
                            <td className="px-4 py-2 max-w-xs truncate" title={doc.filename}>
                                {doc.filename}
                            </td>
                            <td className="px-4 py-2 text-xs hidden sm:table-cell">
                                {formatSize(doc.filesize)}
                            </td>
                            <td className="px-4 py-2 text-xs hidden md:table-cell">
                                {formatDate(doc.created_at)}
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => handleDownload(doc.id, doc.filename)}
                                        className="px-3 py-1 text-xs rounded-md border border-slate-300
                               hover:bg-slate-100"
                                    >
                                        Download
                                    </button>
                                    <button
                                        onClick={() => onDelete(doc.id)}
                                        className="px-3 py-1 text-xs rounded-md bg-red-500 text-white
                               hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default DocumentsList
