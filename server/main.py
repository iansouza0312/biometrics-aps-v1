# Bibliotecas
import cv2
import face_recognition

# Imagem da pessoa que quer acesso as informações
imgCheck = cv2.imread("FerramentaDeIdentificacaoEautenticacaoBiometrica\\BDDeFaces\\ToCheck.jpg")

# Checa imagem do usuário
# Checa se ele existe
if imgCheck is None:
    print("Erro: Imagem não encontrada.")
else:
    # Verifica o tipo de imagem e suas propriedades
    print(f"Tipo da imagem: {type(imgCheck)}")
    print(f"Dimensões da imagem: {imgCheck.shape}")  # Isso vai imprimir as dimensões e canais da imagem
    print(f"Tipo de dado da imagem: {imgCheck.dtype}")  # Isso vai mostrar o tipo de dado, deve ser 'uint8'

    # Verifica se está em 8 bits
    if imgCheck.dtype == 'uint8':
        try:
            # Converte para RGB
            rgb_img = cv2.cvtColor(imgCheck, cv2.COLOR_BGR2RGB)

            # Detecta as faces manualmente antes de tentar codificar
            face_locations = face_recognition.face_locations(rgb_img)

            if len(face_locations) > 0:
                print(f"Face(s) detectada(s) em {len(face_locations)} local(is).")
                # Tenta encontrar as codificações faciais
                imgCheck_encoding = face_recognition.face_encodings(rgb_img, face_locations)

                # Verifica se encontrou alguma face
                if len(imgCheck_encoding) > 0:
                    imgCheck_encoding = imgCheck_encoding[0]
                    print("Face encoding found!")
                else:
                    print("Nenhuma codificação facial encontrada.")
            else:
                print("Nenhuma face detectada na imagem.")

        except Exception as e:
            print(f"Erro ao processar a imagem: {e}")
    else:
        print("Erro: A imagem não está no formato esperado (8-bit uint8).")

# Imagem a ser comparada
imgMinistroDoMeioAmbiente = cv2.imread("FerramentaDeIdentificacaoEautenticacaoBiometrica\\BDDeFaces\\FacesConhecidas\\MinistroDoMeioAmbiente.webp")

# Checa imagem do usuário
# Checa se ele existe
if imgMinistroDoMeioAmbiente is None:
    print("Erro: Imagem não encontrada.")
else:
    # Verifica o tipo de imagem e suas propriedades
    print(f"Tipo da imagem: {type(imgMinistroDoMeioAmbiente)}")
    print(f"Dimensões da imagem: {imgMinistroDoMeioAmbiente.shape}")  # Isso vai imprimir as dimensões e canais da imagem
    print(f"Tipo de dado da imagem: {imgMinistroDoMeioAmbiente.dtype}")  # Isso vai mostrar o tipo de dado, deve ser 'uint8'

    # Verifica se está em 8 bits
    if imgMinistroDoMeioAmbiente.dtype == 'uint8':
        try:
            # Converte para RGB
            rgb_img_MinistroDoMeioAmbiente = cv2.cvtColor(imgMinistroDoMeioAmbiente, cv2.COLOR_BGR2RGB)

            # Detecta as faces manualmente antes de tentar codificar
            face_locations_MinistroDoMeioAmbiente = face_recognition.face_locations(rgb_img_MinistroDoMeioAmbiente)

            if len(face_locations_MinistroDoMeioAmbiente) > 0:
                print(f"Face(s) detectada(s) em {len(face_locations_MinistroDoMeioAmbiente)} local(is).")
                # Tenta encontrar as codificações faciais
                imgMinistroDoMeioAmbiente_encoding = face_recognition.face_encodings(rgb_img_MinistroDoMeioAmbiente, face_locations_MinistroDoMeioAmbiente)

                # Verifica se encontrou alguma face
                if len(imgMinistroDoMeioAmbiente_encoding) > 0:
                    imgMinistroDoMeioAmbiente_encoding = imgMinistroDoMeioAmbiente_encoding[0]
                    print("Face encoding found!")
                else:
                    print("Nenhuma codificação facial encontrada.")
            else:
                print("Nenhuma face detectada na imagem.")

        except Exception as e:
            print(f"Erro ao processar a imagem: {e}")
    else:
        print("Erro: A imagem não está no formato esperado (8-bit uint8).")

result = face_recognition.compare_faces([imgCheck_encoding], imgMinistroDoMeioAmbiente_encoding)
print("Result: ", result)

# Mostra imagens para verificação visual
cv2.imshow("Img", imgCheck)
cv2.imshow("ImgMinistroDoMeioAmbiente", imgMinistroDoMeioAmbiente)
cv2.waitKey(0)
cv2.destroyAllWindows()

#Lhe proporciona o acesso de acordo

