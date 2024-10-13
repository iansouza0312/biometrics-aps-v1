from flask import Flask, request, jsonify
from face_recognition import process_image, compare_faces
from database import init_db, save_face_encoding, get_face_encoding

app = Flask(__name__)

# Inicializa o banco de dados
init_db()


# Rota para processar a imagem recebida
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "Nenhuma imagem enviada"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "Arquivo inválido"}), 400

    img_encoding = process_image(file)

    if img_encoding is not None:
        # Salva a codificação no banco
        save_face_encoding(file.filename, img_encoding)
        return jsonify({"message": "Imagem processada e codificação salva!"})
    else:
        return jsonify({"error": "Nenhuma face detectada"}), 400


# Rota para comparar a imagem enviada com uma imagem armazenada
@app.route('/compare', methods=['POST'])
def compare():
    if 'image' not in request.files or 'name' not in request.form:
        return jsonify({"error": "Faltando parâmetros"}), 400

    file = request.files['image']
    name = request.form['name']

    # Processa a imagem recebida
    img_encoding = process_image(file)
    if img_encoding is None:
        return jsonify({"error": "Nenhuma face detectada na imagem"}), 400

    # Recupera a codificação salva no banco de dados
    stored_encoding = get_face_encoding(name)
    if stored_encoding is None:
        return jsonify({"error": "Face não encontrada no banco de dados"}), 404

    # Compara as faces
    result = compare_faces(stored_encoding, img_encoding)
    return jsonify({"match": result})


if __name__ == '__main__':
    app.run(debug=True)
