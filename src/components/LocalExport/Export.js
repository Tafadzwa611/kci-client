import React from 'react';
import { jsPDF } from "jspdf";

function Export() {
  const doc = new jsPDF();
  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");

  return (
    <div>
      PDF
    </div>
  )
}

export default Export;