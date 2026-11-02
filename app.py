
from flask import Flask, request, jsonify
from flask_cors import CORS
from calculadora import calcular

app = Flask(__name__)

CORS(app)

@app.route("/calcular", methods=["POST"])
def realizar_calculo():

    dados = request.get_json()

    numero1 = dados.get("numero1")
    numero2 = dados.get("numero2")
    operacao = dados.get("operacao")

    try:
        resultado = calcular(numero1, numero2, operacao)

        return jsonify({
            "resultado": resultado
        })

    except (ValueError, TypeError) as erro:

        return jsonify({
            "erro": str(erro)
        }), 400


if __name__ == "__main__":
    app.run(debug=True)

