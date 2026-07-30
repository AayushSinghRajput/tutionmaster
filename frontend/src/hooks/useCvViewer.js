import { useState, useEffect } from 'react';

const ZOOM_STEP = 25;
const ZOOM_MIN = 50;
const ZOOM_MAX = 200;

export const useCvViewer = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfError, setPdfError] = useState(false);

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

  const reloadPdf = () => setPdfError(false);
  const handlePdfError = () => setPdfError(true);

  return {
    zoomLevel,
    isFullscreen,
    pdfError,
    zoomIn,
    zoomOut,
    toggleFullscreen,
    reloadPdf,
    handlePdfError,
  };
};