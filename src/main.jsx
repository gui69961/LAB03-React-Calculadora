import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "0",
      valor: null,
      operacao: null,
      novoNumero: true,
    };
  }

  digitar = (n) => {
    this.setState((s) => ({
      display:
        s.novoNumero || s.display === "0"
          ? n
          : s.display + n,
      novoNumero: false,
    }));
  };

  limpar = () => {
    this.setState({
      display: "0",
      valor: null,
      operacao: null,
      novoNumero: true,
    });
  };

  escolherOperacao = (op) => {
    this.setState((s) => ({
      valor: Number(s.display),
      operacao: op,
      novoNumero: true,
    }));
  };

  calcular = () => {
    this.setState((s) => {
      if (s.valor === null || !s.operacao) {
        return s;
      }

      const b = Number(s.display);
      let r = 0;

      if (s.operacao === "+") {
        r = s.valor + b;
      }

      if (s.operacao === "-") {
        r = s.valor - b;
      }

      if (s.operacao === "*") {
        r = s.valor * b;
      }

      if (s.operacao === "/") {
        r = b === 0 ? "Erro" : s.valor / b;
      }

      return {
        display: String(r),
        valor: null,
        operacao: null,
        novoNumero: true,
      };
    });
  };

  render() {
    const b = (txt, fn, cls = "") => (
      <button className={cls} onClick={fn}>
        {txt}
      </button>
    );

    return (
      <div className="calc">

        <div className="display">
          {this.state.display}
        </div>

        <div className="grid">

          {b("C", this.limpar, "clear")}

          {b(
            "*",
            () => this.escolherOperacao("*"),
            "op"
          )}

          {b(
            "/",
            () => this.escolherOperacao("/"),
            "op"
          )}

          {b(
            "-",
            () => this.escolherOperacao("-"),
            "op"
          )}

          {b(7, () => this.digitar("7"))}
          {b(8, () => this.digitar("8"))}
          {b(9, () => this.digitar("9"))}

          {b(
            "+",
            () => this.escolherOperacao("+"),
            "op"
          )}

          {b(4, () => this.digitar("4"))}
          {b(5, () => this.digitar("5"))}
          {b(6, () => this.digitar("6"))}

          {b(0, () => this.digitar("0"))}

          {b(1, () => this.digitar("1"))}
          {b(2, () => this.digitar("2"))}
          {b(3, () => this.digitar("3"))}

          {b("=", this.calcular, "igual")}

        </div>
      </div>
    );
  }
}

createRoot(document.getElementById("root")).render(
  <App />
);