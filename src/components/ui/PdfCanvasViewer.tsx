import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import Lenis from 'lenis';

// Set official PDF.js worker URL
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface PdfCanvasViewerProps {
  url: string;
  zoomLevel: number;
  onNumPages?: (numPages: number) => void;
}

export const PdfCanvasViewer: React.FC<PdfCanvasViewerProps> = ({ url, zoomLevel, onNumPages }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const pagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [renderFallback, setRenderFallback] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setRenderFallback(false);

    const renderPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url });
        const pdf = await loadingTask.promise;
        if (isCancelled) return;

        const numPages = pdf.numPages;
        if (onNumPages) onNumPages(numPages);

        const canvasList: HTMLCanvasElement[] = [];

        // Loop and render EVERY page of the document sequentially
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          if (isCancelled) return;

          const baseScale = (zoomLevel / 100) * 1.6;
          const viewport = page.getViewport({ scale: baseScale });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) continue;

          canvas.height = viewport.height;
          canvas.width = viewport.width;
          canvas.className = 'max-w-full h-auto block rounded-xl border-2 border-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] my-4 bg-white';

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
            canvas: canvas,
          };

          await page.render(renderContext).promise;
          canvasList.push(canvas);
        }

        if (!isCancelled && pagesContainerRef.current) {
          pagesContainerRef.current.innerHTML = '';
          canvasList.forEach(canvas => pagesContainerRef.current?.appendChild(canvas));
          setLoading(false);
        }
      } catch (err) {
        console.error('PDF.js Multi-page render fallback:', err);
        if (!isCancelled) {
          setRenderFallback(true);
          setLoading(false);
        }
      }
    };

    renderPdf();

    return () => {
      isCancelled = true;
    };
  }, [url, zoomLevel, onNumPages]);

  // Instantiate container-scoped Lenis smooth scrolling inside the modal
  useEffect(() => {
    if (!containerRef.current || !contentRef.current || loading) return;

    const modalLenis = new Lenis({
      wrapper: containerRef.current,
      content: contentRef.current,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.6,
    });

    let rafId: number;
    function raf(time: number) {
      modalLenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      modalLenis.destroy();
    };
  }, [loading, zoomLevel]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-start overflow-auto p-4 sm:p-6 bg-[#070A13] custom-pdf-scroll"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--c-accent, #FF2A55) var(--c-bg, #070A13)',
      }}
    >
      <div ref={contentRef} className="w-full flex flex-col items-center justify-start my-auto min-h-full py-4">
        {loading && (
          <div className="flex flex-col items-center justify-center my-auto py-16 gap-3 text-[var(--c-accent)]">
            <div className="w-10 h-10 border-4 border-[var(--c-accent)] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-black uppercase tracking-widest text-[var(--c-accent)]">
              Rendering Full PDF Document...
            </span>
          </div>
        )}

        {renderFallback ? (
          <iframe
            src={`${url}#toolbar=0&navpanes=0&view=FitH`}
            className="w-full h-full border-none min-h-[600px]"
            title="PDF Fallback"
          />
        ) : (
          <div
            ref={pagesContainerRef}
            className={`w-full flex flex-col items-center justify-start transition-all duration-300 ${
              loading ? 'hidden' : 'flex'
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default PdfCanvasViewer;
