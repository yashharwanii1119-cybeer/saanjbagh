import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
    this.setState({ error, info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#ffcccc', color: 'black', minHeight: '100vh', whiteSpace: 'pre-wrap', position: 'fixed', inset: 0, zIndex: 99999 }}>
          <h1>React Crashed!</h1>
          <p><strong>Error:</strong> {this.state.error?.toString()}</p>
          <details style={{ marginTop: '1rem' }}>
            <summary>Component Stack</summary>
            {this.state.info?.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children; 
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
