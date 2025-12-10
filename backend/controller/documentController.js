import { pool } from "../db.js";
import fs from "fs";    
import path from "path";

export const uploadDocument = async (req, res)=>{

    try{

        if(!req.file){
            return res.status(400).json({message: "No file uploaded"});
        }

        const {filename, filesize} = req.file;
        const filepath = req.file.path;

        const result = await pool.query(
            "INSERT INTO documents (filename, filepath, filesize) VALUES ($1, $2, $3) RETURNING *",
            [filename, filepath, filesize]
        )

        res.json({message : "File uploaded successfully", document: result.rows[0]});

    }catch(error){
        console.error("Error uploading document:", error);
        res.status(500).json({message: "Internal server error"});
    }

}

export const getDocument = async (req, res)=>{

    try{

        const  result = await pool.query("SELECT * FROM documents ORDER BY created_at  DESC");

        res.json(result.rows);

    }catch(error){

        console.error("Error retrieving document:", error);
        res.status(500).json({message: "Internal server error"});

    }
    
}

export const downloadDocument = async (req, res) => {

  console.log("🟦 DOWNLOAD ROUTE HIT");

  try {
    const id = req.params.id;

    const result = await pool.query("SELECT * FROM documents WHERE id=$1", [id]);

    if (result.rows.length === 0) {
      console.log("❌ Document not found in DB");
      return res.status(404).json({ message: "Document not found" });
    }

    const file = result.rows[0];

    const absolutePath = path.join(process.cwd(), file.filepath);

    console.log("📄 FILE IN DB:", file.filepath);
    console.log("📍 ABSOLUTE PATH:", absolutePath);
    console.log("🔍 FILE EXISTS:", fs.existsSync(absolutePath));

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ message: "File missing on server" });
    }

    return res.sendFile(absolutePath);

  } catch (error) {
    console.error("🔥 Download error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteDocument = async (req, res)=>{

    try{

        const id = req.params.id;

        const result = await pool.query("SELECT * FROM documents WHERE id=$1", [id]);

        if(result.rows.length === 0){
            return res.status(404).json({message: "Document not found"});
        }

        const file = result.rows[0];
        
        fs.unlinkSync(file.filepath);

        await pool.query("DELETE FROM documents WHERE id=$1", [id]);

        res.json({message: "file deleted successfully"});
        
    }catch(error){
        console.error("Error deleting document:", error);
        res.status(500).json({message: "Internal server error"});
    }
    
}