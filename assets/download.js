/* POSTER: El Camino del Tesista - Equipo 03 - MITE LTE UTN | assets/download.js
   Requires html2canvas (loaded via CDN in index.html)                          */

async function descargar(formato) {
  const btnPng = document.getElementById('btn-png');
  const btnJpg = document.getElementById('btn-jpg');

  btnPng.disabled = true;
  btnJpg.disabled = true;
  btnPng.textContent = 'Generando...';
  btnJpg.textContent = 'Generando...';

  const poster = document.getElementById('poster');

  try {
    const canvas = await html2canvas(poster, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#fdfaf4',
      logging: false,
    });

    const esPng   = formato === 'png';
    const mime    = esPng ? 'image/png' : 'image/jpeg';
    const ext     = esPng ? 'png' : 'jpg';
    const calidad = esPng ? undefined : 0.95;

    canvas.toBlob(function (blob) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'poster_camino_tesista_equipo03.' + ext;
      a.click();
      URL.revokeObjectURL(a.href);

      btnPng.disabled = false;
      btnJpg.disabled = false;
      btnPng.textContent = '⬇ Descargar PNG HD';
      btnJpg.textContent = '⬇ Descargar JPG HD';
    }, mime, calidad);

  } catch (err) {
    console.error('Error al generar imagen:', err);
    btnPng.disabled = false;
    btnJpg.disabled = false;
    btnPng.textContent = '⬇ Descargar PNG HD';
    btnJpg.textContent = '⬇ Descargar JPG HD';
    alert('Error al generar la imagen. Intentá de nuevo.');
  }
}
