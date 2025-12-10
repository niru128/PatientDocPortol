# 📄 Patient Document Portal – Full Stack Application 
*Built with React, Node.js, Express, and PostgreSQL*

---

## 🚀 Project Overview
This project is a **Patient Document Portal** where users can:

- Upload PDF medical documents  
- View all uploaded documents  
- Download any document  
- Delete stored documents  

The system is built using:

- **Frontend:** React + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Database:** PostgreSQL  
- **File Storage:** Local `uploads/` folder  

---

## 🏗️ Tech Stack Choices

### **Frontend: React**
- Component-based UI  
- Fast, responsive, scalable  
- Works smoothly with Axios + Tailwind  

### **Backend: Express.js**
- Lightweight, flexible routing  
- Easy middleware integration (multer)  
- Suitable for REST APIs  

### **Database: PostgreSQL**
- Stable relational DB  
- Fast queries  
- Good for structured data (file metadata)  

### **Scaling for 1000+ users**
- Move file storage to S3   
- PostgreSQL connection pooling  
- Pagination for listing  
- Authentication per user  

---

## 🏛️ Architecture

```
React Frontend  →  Express Backend  →  PostgreSQL Database
         ↓                ↓
    User uploads      Metadata stored
         ↓                ↓
    Files stored → backend/uploads/
```

---

## 📡 API Specification

### **POST /documents/upload**
Uploads a PDF file.

Response:
```json
{
  "message": "File uploaded successfully",
  "document": {
    "id": 1,
    "filename": "Report.pdf",
    "filesize": 24567,
    "filepath": "uploads/1765374626-Report.pdf",
    "created_at": "2025-02-05T10:00:00.000Z"
  }
}
```

---

### **GET /documents**
Returns list of all documents.

---

### **GET /documents/:id**
Downloads PDF binary.

---

### **DELETE /documents/:id**
Deletes file + DB record.

---

## 🔄 Data Flow Summary

### **Upload flow**
1. User selects PDF  
2. React sends multipart request  
3. Express validates + stores file  
4. Metadata saved to PostgreSQL  
5. React refreshes table  

### **Download flow**
1. React triggers download  
2. Backend fetches filepath  
3. Express sends actual PDF file  
4. Browser downloads it via blob  

---

## 🛠 How to Run

### Backend
```
cd backend
npm install
node server.js
```

### Frontend
```
cd frontend
npm install
npm run dev
```

Open:
```
http://localhost:5173
```

---

## 📦 Environment Variables (`.env`)

```
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=yourpassword
PGDATABASE=documents_db
PGPORT=5432
PORT=5000
```

---

## 🎉 Features Completed

✔ Upload PDFs  
✔ List documents  
✔ Download PDFs  
✔ Delete PDFs  
✔ PostgreSQL metadata  
✔ Tailwind UI  
✔ Full REST API  

---

##Screenshots

<img width="1918" height="928" alt="image" src="https://github.com/user-attachments/assets/fbd27ac6-6cd4-4bb3-a227-34f82b3d3c47" />
<img width="1914" height="888" alt="image" src="https://github.com/user-attachments/assets/b20efe10-0816-49f0-a985-24a9cbad901f" />
<img width="1914" height="893" alt="image" src="https://github.com/user-attachments/assets/42faf8d4-fda7-46b5-804f-c38cdc957cd0" />


## 🏁 Conclusion
This project demonstrates a full-stack application implementing secure PDF upload, download, and management with React, Express, and PostgreSQL.
