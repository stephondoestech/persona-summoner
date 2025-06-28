import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from '../styles/PersonaDisplay.module.css';

export default function PersonaDisplay({ persona }) {
  const cardRef = useRef();
  if (!persona) return null;

  const handleExport = async () => {
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = 190;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
    pdf.save(`${persona.name}_Compendium_Card.pdf`);
  };

  return (
    <div>
      <div ref={cardRef} className={styles.card}>
        <h2>{persona.name}</h2>
        <p><em>Born of: {persona.traits.join(', ')}</em></p>
        <img src={persona.imageUrl || '/defaultPersona.png'} alt={persona.name} />
        <div>
          <h4>Stats:</h4>
          {Object.entries(persona.stats).map(([key, val]) => (
            <div key={key}>{key}: {val}</div>
          ))}
        </div>
        <div>
          <h4>Affinities:</h4>
          <div>Element: {persona.element}</div>
          <div>Weak: {persona.weak}</div>
          <div>Resist: {persona.resist}</div>
          <div>Absorb: {persona.absorb}</div>
        </div>
        <div>
          <h4>Signature Skill:</h4>
          <div>{persona.signatureSkill}</div>
        </div>
        <div>
          <h4>Awakening Speech:</h4>
          <p style={{ whiteSpace: 'pre-line', fontStyle: 'italic' }}>{persona.speech}</p>
        </div>
      </div>
      <button onClick={handleExport} className={styles.exportButton}>
        Download Compendium Card
      </button>
    </div>
  );
}
