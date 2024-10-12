import base64
import numpy as np
import sqlite3

class ImageRepository:
    def __init__(self, path):
        self.connection = sqlite3.connect(path, check_same_thread=False)
        self.createTable()

    # criar tabela caso ainda nao exista
    def createTable(self):
        with self.connection:
            self.connection.execute('''
            CREATE TABLE IF NOT EXISTS facial_data (
            user TEXT PRIMARY KEY,
            face_encoded TEXT
            )
            ''')

    def saveEncodedImage(self, user, file):
        # convertendo arquivo/imagem em uma string utilizando base64 (explicacao em README.md)
        encoded_data = base64.b64encode(np.array(file)).decode('utf-8')

        # inserindo os dados na tabela
        with self.connection:
            self.connection.execute('''
                INSERT OR REPLACE INTO facial_data (user, face_encoded)
                VALUES (?, ?)
            ''', (user, encoded_data))

    def getEncodedFace(self, user):
        with self.connection:
            query = self.connection.execute('''
                SELECT face_encoded FROM facial_data WHERE user = ?
            ''', (user,)).fetchone()

        if query:
            encoded_data = query[0]
            encoded_bytes = base64.b64decode(encoded_data)
            return np.frombuffer(encoded_bytes, dtype=np.float64)
        return None