from crypt import methods

from flask import Flask, request, jsonify
from services.faceRecognitionServices import FaceRecognitionService
from repositories.imagesRepository import ImageRepository

# definindo variaveis iniciais (flask p/ api, repositorio do BD e servicos)
app = Flask(__name__)
imageRepository = ImageRepository("facial_database.db")
faceServices = FaceRecognitionService()

# rotas para upload de imagem e realizacao de comparacoes
@app.route('/file_upload', methods=['POST'])
def imageUpload():
    if 'image' not in request.files:
        # 400 - bad request no upload de arquivos
        return jsonify({"error": "nenhuma imagem foi enviada atraves do upload de arquivos."}), 400

    file = request.files['image']
    user = request.form.get('user')

    # salvando a imagem e usuario
    path = faceServices.saveImage(file, user)
    # salvando encoding da imagem
    encoding = faceServices.encodingFace(path)

    if encoding is None:
        return jsonify({"error": "nenhuma face foi detectada, tente utilizar novas imagens."}), 400
    imageRepository.saveEncodedImage(user, encoding)

    # caso o registro ocorra de forma correta
    return jsonify({"message": "Upload e encoding da imagem completo!"}), 200

# rota para comparar as faces das imagens
@app.route('/compare', methods=['POST'])
def compare_faces():
    if 'image' not in request.files or 'user' not in request.form:
        return jsonify({"error": "Falta de parametros no envio para comparacao."}), 400

    file = request.files['image']
    user = request.form.get('user')

    path = faceServices.saveImage(file, "temp")
    encoding = faceServices.encodingFace(path)
    if encoding is None:
        return jsonify({"error": "nenhuma face foi detectada, tente utilizar novas imagens."}), 400

    # verificando se o usuario existe
    encodedImage = imageRepository.getEncodedFace(user)
    if encodedImage is None:
        # servidor nao conseguiu encontrar o usuario - 404
        return jsonify({"error": "Nenhum usuario encontrado."}), 404

    query = faceServices.facesCompare(encodedImage, encoding)
    # caso as faces comparadas sejam iguais, retorna um json
    return jsonify({"match": query}), 200

# rodando a aplicacao
if __name__ == '__main__':
    app.run(debug=True)