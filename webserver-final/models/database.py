import sqlite3
import os

# definindop caminho do diretorio onde o database ira ficar
database_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../databases/biometric_system.db')

def create_tables():
    # conectando ao banco de dados (arquivo db)
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()

    # criando tabela de usuarios
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            face_encoding BLOB NOT NULL,
            role_id INTEGER NOT NULL,
            FOREIGN KEY(role_id) REFERENCES roles(id)
        )
        ''')

    # Create the roles table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role_name TEXT NOT NULL,
        permissions TEXT NOT NULL
    )
    ''')

    # criando tabela de propriedades
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS user_details (
        user_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        owner TEXT NOT NULL,
        postalCode INTEGER NOT NULL,
        city TEXT,
        state TEXT,
        number INTEGER,
        street TEXT,
        pesticide TEXT NOT NULL,
        plantation TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    ''')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_tables()
    print("Banco de dados criado com sucesso")