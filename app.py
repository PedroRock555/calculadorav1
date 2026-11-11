from flask import Flask, request, jsonify, send_from_directory
from calculadora import calcular

app = Flask(__name__)


@app.route("/")
def inicio():
    return send_from_directory(".", "index.html")


@app.route("/<path:arquivo>")
def arquivos(arquivo):
    if arquivo in ["style.css", "script.js"]:
        return send_from_directory(".", arquivo)

    return "Arquivo não encontrado", 404


@app.route("/calcular", methods=["POST"])
def realizar_calculo():
    dados = request.get_json(silent=True) or {}

    try:
        numero1 = float(dados["numero1"])
        numero2 = float(dados["numero2"])
        operacao = dados["operacao"]

        resultado = calcular(numero1, numero2, operacao)

        return jsonify({"resultado": resultado})

    except (ValueError, TypeError, KeyError) as erro:
        return jsonify({"erro": str(erro)}), 400


if __name__ == "__main__":
    app.run(debug=True)
