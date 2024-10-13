import cv2
import face_recognition
import numpy as np
from io import BytesIO
from PIL import Image

# Processa a imagem e retorna a codificação facial
def process_image(image_file):
    try:
        # Lê a imagem do arquivo enviado
        img = Image.open(image_file)
        img = np.array(img)

        # Converte a imagem para RGB (caso esteja em outro formato)
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Detecta as faces na imagem
        face_locations = face_recognition.face_locations(rgb_img)

        if len(face_locations) > 0:
            # Codifica a face
            face_encoding = face_recognition.face_encodings(rgb_img, face_locations)
            if len(face_encoding) > 0:
                return face_encoding[0]  # Retorna a primeira codificação encontrada
        return None
    except Exception as e:
        print(f"Erro ao processar a imagem: {e}")
        return None

# Compara duas codificações faciais
def compare_faces(known_encoding, unknown_encoding):
    return face_recognition.compare_faces([known_encoding], unknown_encoding)[0]
