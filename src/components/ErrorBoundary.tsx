import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Console log will be stripped in production build, but helpful in dev
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen bg-white bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-md bg-white border-[3px] border-black rounded-[2.5rem] p-8 shadow-[8px_8px_0px_0px_#000] flex flex-col items-center gap-6">
            <span className="text-5xl">⚡</span>
            <span className="inline-block bg-[#00F5A0] text-black font-black text-xs px-4 py-1.5 rounded-full tracking-widest uppercase border border-black">
              SYSTEM ERROR
            </span>
            <h1 className="text-2xl font-black text-black uppercase leading-tight">
              SOMETHING WENT WRONG
            </h1>
            <p className="text-black/60 text-xs font-semibold leading-relaxed">
              An unexpected runtime error occurred. The application context has crashed, but you can reload to continue.
            </p>
            {this.state.error && (
              <pre className="w-full bg-black/5 p-4 rounded-xl border border-black/10 text-left text-[10px] font-mono text-black/70 overflow-x-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#00F5A0] hover:bg-black text-black hover:text-white font-black text-xs uppercase tracking-widest border-2 border-black rounded-full transition-all duration-300 shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] cursor-pointer"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
