from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

# CORS for frontend localhost:5500 (or your port)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQLite init
conn = sqlite3.connect('spots.db', check_same_thread=False)
c = conn.cursor()
c.execute('''
CREATE TABLE IF NOT EXISTS spots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    img TEXT,
    url TEXT,
    note TEXT
)
''')
conn.commit()

class Spot(BaseModel):
    name: str
    img: str
    url: str
    note: str = ""

@app.get("/spots/", response_model=List[Spot])
def get_spots():
    c.execute("SELECT name, img, url, note FROM spots")
    rows = c.fetchall()
    return [Spot(name=row[0], img=row[1], url=row[2], note=row[3]) for row in rows]

@app.post("/spots/")
def add_spot(spot: Spot):
    c.execute("INSERT INTO spots (name, img, url, note) VALUES (?, ?, ?, ?)",
              (spot.name, spot.img, spot.url, spot.note))
    conn.commit()
    return {"message": "Spot added"}

@app.delete("/spots/{name}/")
def delete_spot(name: str):
    c.execute("DELETE FROM spots WHERE name=?", (name,))
    conn.commit()
    return {"message": "Spot deleted"}
