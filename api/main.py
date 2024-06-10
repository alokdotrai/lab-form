import os
from typing import Annotated

from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func

from .schemas import DocumentSchema
from .models import Document
from .database import Base, LocalSession, engine

# Create Tables In SQLite If Not Already Created
Base.metadata.create_all(bind=engine)

# Create A Folder To Save Uploaded Files
folder = os.path.join(os.getcwd(), "uploaded_files")
if not os.path.exists(folder):
    os.makedirs(folder)

# Create FastAPI instance
app = FastAPI(debug=True)

# Allow origins to prevent CORS errors
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Database Session
def get_db():
    try:
        db = LocalSession()
        yield db
    finally:
        db.close()


# Define Base Route
@app.get("/")
async def home(db: Session = Depends(get_db)):
    rows = db.query(func.count(Document.id)).scalar()
    return {
        "status_code": 200,
        "status": "success",
        "message": f"{rows} documents found"
    }


@app.get("/documents")
async def get_documents(db: Session = Depends(get_db)):
    documents = db.query(Document).all()
    return documents


@app.post("/documents/upload/")
async def upload(
    file: UploadFile,
    name: Annotated[str, Form()],
    type: Annotated[str, Form()],
    db: Session = Depends(get_db)
):
    try:
        file_name = file.filename
        file_path = os.path.join(folder, file_name)
        with open(file=file_path, mode="wb") as f:
            f.write(await file.read())
        file_size = os.path.getsize(filename=file_path)
        document = Document(
            name=name,
            type=type,
            location=file_path,
            size=file_size,
            created=func.now(),
            updated=func.now()
        )
        db.add(document)
        db.commit()
        db.refresh(document)
        print(document)
        return document
    except Exception as e:
        raise HTTPException(status_code=400, detail=e)

@app.get("/documents/download/{document_id}")
async def download(document_id: int, db: Session = Depends(get_db)):
    document = db.query(Document).filter(Document.id == document_id).first()
    return document
