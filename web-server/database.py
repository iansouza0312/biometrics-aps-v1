import sqlite3
import numpy as np

DB_PATH = 'database/faces.db'

# Inicializa o banco de dados
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS faces
                 (name TEXT PRIMARY KEY, encoding BLOB)''')
    conn.commit()
    conn.close()

# Salva uma nova codificação facial no banco
def save_face_encoding(name, encoding):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    # Converte o encoding (array) para binário
    encoding_blob = sqlite3.Binary(encoding.tobytes())
    c.execute("INSERT OR REPLACE INTO faces (name, encoding) VALUES (?, ?)", (name, encoding_blob))
    conn.commit()
    conn.close()

# Recupera a codificação facial de uma pessoa armazenada
def get_face_encoding(name):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT encoding FROM faces WHERE name=?", (name,))
    result = c.fetchone()
    conn.close()

    if result:
        encoding_blob = result[0]
        # Converte o binário de volta para um array NumPy
        return np.frombuffer(encoding_blob, dtype=np.float64)
    return None
