import React from 'react';
import styles from '../styles/TraitPicker.module.css';
import { TRAITS } from '../lib/personaEngine';

export default function TraitPicker({ selectedTraits, onChange, onRandomize }) {
  const toggleTrait = (trait) => {
    if (selectedTraits.includes(trait)) {
      onChange(selectedTraits.filter((t) => t !== trait));
    } else if (selectedTraits.length < 3) {
      onChange([...selectedTraits, trait]);
    }
  };

  return (
    <div className={styles.picker}>
      <h3>Select up to 3 traits</h3>
      <div className={styles.traits}>
        {TRAITS.map((trait) => (
          <button
            key={trait}
            className={`${styles.trait} ${selectedTraits.includes(trait) ? styles.selected : ''}`}
            onClick={() => toggleTrait(trait)}
          >
            {trait}
          </button>
        ))}
      </div>
      <div className={styles.actions}>
        <button onClick={onRandomize}>🎲 Surprise Me</button>
      </div>
    </div>
  );
}