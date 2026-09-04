import { useState, useRef, useEffect, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  FileText,
  Download,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { useCvViewer } from '../../hooks/useCvViewer';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MAX_PAGE_WIDTH = 720;
const MIN_PAGE_WIDTH = 240;

const CvViewer = ({ teacher, onDownload }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const {
    zoomLevel,
    isFullscreen,
    pdfError,
    numPages,
    pageNumber,
    flipDirection,
    zoomIn,
    zoomOut,
    toggleFullscreen,
    reloadPdf,
    handlePdfError,
    onDocumentLoadSuccess,
    goToPrevPage,
    goToNextPage,
  } = useCvViewer();

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(MAX_PAGE_WIDTH);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pageWidth = useMemo(() => {
    const fitWidth = Math.min(MAX_PAGE_WIDTH, Math.max(MIN_PAGE_WIDTH, containerWidth - 32));
    return Math.round(fitWidth * (zoomLevel / 100));
  }, [containerWidth, zoomLevel]);

  if (!teacher?.cvUrl) return null;

  return (
    <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6 w-full max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 flex items-center">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-brand-600 shrink-0" />
          Professional CV
        </h2>
        <div className="flex items-center flex-wrap gap-2 sm:gap-3 sm:space-x-0">
          <div className="flex items-center space-x-2 bg-stone-100 rounded-lg px-3 py-1">
            <button onClick={zoomOut} className="p-1 hover:bg-stone-200 rounded" title="Zoom Out">
              <ZoomOut className="w-4 h-4 text-gray-700" />
            </button>
            <span className="text-sm font-medium text-gray-700">{zoomLevel}%</span>
            <button onClick={zoomIn} className="p-1 hover:bg-stone-200 rounded" title="Zoom In">
              <ZoomIn className="w-4 h-4 text-gray-700" />
            </button>
          </div>
          <button
            onClick={toggleFullscreen}
            className="flex items-center space-x-2 px-3 py-2 bg-brand-50 text-brand-700 font-medium rounded-lg hover:bg-brand-100 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            <Maximize2 className="w-4 h-4" />
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>
          <button
            onClick={isAuthenticated ? onDownload : undefined}
            className={`btn-brand-primary px-4 py-2 text-sm ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isAuthenticated}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          id="cv-container"
          ref={containerRef}
          className={`border border-stone-300 rounded-xl bg-stone-50 py-5 px-3 sm:py-8 sm:px-4 flex flex-col items-center w-full max-w-full overflow-x-auto ${!isAuthenticated ? 'blur-md select-none' : ''}`}
        >
        {pdfError ? (
          <div className="w-full max-w-lg flex flex-col items-center justify-center bg-white rounded-lg py-16">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load CV</h3>
              <p className="text-gray-600 mb-4">There was an issue loading the PDF document.</p>
              <div className="space-y-3">
                <button
                  onClick={reloadPdf}
                  className="btn-brand-primary px-4 py-2 text-sm mx-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Loading</span>
                </button>
                <button
                  onClick={onDownload}
                  className="flex items-center space-x-2 px-4 py-2 border border-stone-300 text-gray-700 font-medium rounded-lg hover:bg-stone-50 transition-colors mx-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Instead</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="cv-flip-perspective">
              <Document
                file={teacher.cvUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={handlePdfError}
                loading={
                  <div
                    className="flex items-center justify-center"
                    style={{ width: pageWidth, height: Math.round(pageWidth * 1.414) }}
                  >
                    <div className="animate-spin h-8 w-8 border-2 border-brand-600 border-t-transparent rounded-full" />
                  </div>
                }
              >
                <div
                  key={pageNumber}
                  className={`cv-page shadow-lg rounded-sm overflow-hidden ${
                    flipDirection === 'next' ? 'cv-page-flip-next' : 'cv-page-flip-prev'
                  }`}
                >
                  <Page
                    pageNumber={pageNumber}
                    width={pageWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              </Document>
            </div>

            {numPages > 1 && (
              <div className="flex items-center space-x-4 mt-5">
                <button
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                  className="flex items-center space-x-1 px-3 py-2 bg-white border border-stone-300 rounded-lg text-gray-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>
                <span className="text-sm font-medium text-gray-600 tabular-nums">
                  Page {pageNumber} of {numPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  className="flex items-center space-x-1 px-3 py-2 bg-white border border-stone-300 rounded-lg text-gray-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
        </div>

        {!isAuthenticated && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/30 backdrop-blur-[2px] rounded-xl border border-stone-200 shadow-inner p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
              <Lock className="w-8 h-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">CV is Protected</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You must be logged in to view and download {teacher.name}'s professional CV and qualifications.
            </p>
            <Link to="/login" state={{ from: location }} className="btn-brand-primary px-6 py-3 shadow-lg hover:shadow-xl transition-all">
              Log In to View CV
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CvViewer;
