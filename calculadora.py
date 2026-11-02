def calcular(numero1, numero2, operacao):
    match operacao:

        case "soma":
            return numero1 + numero2

        case "subtracao":
            return numero1 - numero2

        case "multiplicacao":
            return numero1 * numero2

        case "divisao":
            if numero2 == 0:
                raise ValueError("Não é possível dividir por zero.")

            return numero1 / numero2
        case _:
            raise ValueError("Operação inválida.")
