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
} from 'lucide-react';
import { useCvViewer } from '../../hooks/useCvViewer';
import CvInfoCard from './CvInfoCard';
import { CV_INFO_CARDS } from '../../constants/cv/cvInfoCards';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MAX_PAGE_WIDTH = 720;
const MIN_PAGE_WIDTH = 240;

const CvViewer = ({ teacher, onDownload }) => {
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

  if (!teacher.cvUrl) return null;

  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
          <FileText className="w-6 h-6 mr-3 text-blue-600" />
          Professional CV
        </h2>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
            <button onClick={zoomOut} className="p-1 hover:bg-gray-200 rounded" title="Zoom Out">
              <ZoomOut className="w-4 h-4 text-gray-700" />
            </button>
            <span className="text-sm font-medium text-gray-700">{zoomLevel}%</span>
            <button onClick={zoomIn} className="p-1 hover:bg-gray-200 rounded" title="Zoom In">
              <ZoomIn className="w-4 h-4 text-gray-700" />
            </button>
          </div>
          <button
            onClick={toggleFullscreen}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            <Maximize2 className="w-4 h-4" />
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>
          <button
            onClick={onDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      <div
        id="cv-container"
        ref={containerRef}
        className="border border-gray-300 rounded-xl bg-gray-50 py-8 px-4 flex flex-col items-center"
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
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Loading</span>
                </button>
                <button
                  onClick={onDownload}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors mx-auto"
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
                    <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full" />
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
                  className="flex items-center space-x-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
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
                  className="flex items-center space-x-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {CV_INFO_CARDS.map((card) => (
          <CvInfoCard key={card.id} {...card} />
        ))}
      </div>

      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">CV Information</h4>
            <p className="text-gray-700 text-sm">
              This document contains the teacher's complete professional profile including detailed qualifications,
              teaching methodology, past student success stories, additional certifications, and professional references.
              All documents are verified by our admin team for authenticity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CvViewer;
