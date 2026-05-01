import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: "",
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error.message,
    };
  }

  componentDidCatch(error) {
    console.error("Error capturado:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-box">
          <h2>Ocurrió un error al cargar esta pantalla</h2>
          <p>{this.state.message}</p>

          <button className="primary-button" onClick={this.props.onBack}>
            Volver al inicio
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}