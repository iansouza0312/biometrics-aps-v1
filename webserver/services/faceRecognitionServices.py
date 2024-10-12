import cv2
import os
import face_recognition
from face_recognition import face_encodings


class FaceRecognitionService:
    # metodo p/ salvar imagem no banco de dados
    def saveImage(self, file, username):
        uploadDirectory = "static/uploads"
        # criar diretorio caso ainda nao exista
        if not os.path.exists(uploadDirectory):
            os.makedirs(uploadDirectory)

        # Salvando a imagem coom o nome do usuario
        imagePath = os.path.join(uploadDirectory, f"{username}.jpg")
        file.save(imagePath)
        return imagePath

    # metodo de encoding da imagem
    def encodingFace(self, path):
        # realizando processsamento da imagem
        image = cv2.imread(path)
        # tratamento de imagem caso nao consiga ser lida pelo sistema
        if image is None:
            return None

        processedImage = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # mapeando pontos do rosto com imagem processada
        facialPoints = face_recognition.face_locations(processedImage)

        # caso nao encontre nenhum ponto
        if len(facialPoints) == 0:
            return None
        # encoding da imagem com a biblioteca face recognition
        facialEnconded = face_recognition.face_encodings(processedImage, facialPoints)

        if len(facialEnconded)>0:
            return facialEnconded[0]
        return None

    # comparando as imagens (encoded x upload)
    def facesCompare(self, encoded_image, uploaded_file):
        compareQuery = face_recognition.compare_faces([encoded_image], uploaded_file)
        return compareQuery[0]