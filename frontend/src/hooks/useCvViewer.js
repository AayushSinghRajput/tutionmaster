import { useState, useEffect, useCallback } from 'react';

const ZOOM_STEP = 25;
const ZOOM_MIN = 50;
const ZOOM_MAX = 200;

export const useCvViewer = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [flipDirection, setFlipDirection] = useState('next');

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + ZOOM_STEP, ZOOM_MAX));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - ZOOM_STEP, ZOOM_MIN));

  const toggleFullscreen = () => {
    const cvContainer = document.getElementById('cv-container');
    if (!document.fullscreenElement) {
      cvContainer.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const onDocumentLoadSuccess = useCallback(({ numPages: total }) => {
    setNumPages(total);
    setPageNumber(1);
    setPdfError(false);
  }, []);

  const handlePdfError = useCallback(() => setPdfError(true), []);

  const goToPrevPage = () => {
    setFlipDirection('prev');
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setFlipDirection('next');
    setPageNumber((prev) => Math.min(prev + 1, numPages || prev));
  };

  const reloadPdf = () => {
    setPdfError(false);
    setPageNumber(1);
  };

  return {
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
  };
};
