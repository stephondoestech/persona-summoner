import { useState } from 'react';
import { TRAITS, generatePersona } from '../lib/personaEngine';
import PersonaDisplay from '../components/PersonaDisplay';
import TraitPicker from '../components/TraitPicker';

export default function Home() {
  const [persona, setPersona] = useState(null);
  const [traits, setTraits] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImage = async (prompt) => {
    const res = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    return data.imageUrl;
  };

  const handleGenerate = async () => {
    if (traits.length < 1) {
      alert('Select at least 1 trait!');
      return;
    }
    setLoading(true);
    const newPersona = generatePersona(traits);
    newPersona.imageUrl = await fetchImage(newPersona.imagePrompt);
    setPersona(newPersona);
    setLoading(false);
  };

  const handleRandomize = () => {
    const shuffled = [...TRAITS].sort(() => 0.5 - Math.random());
    setTraits(shuffled.slice(0, 3));
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Summon Your Persona</h1>
      <TraitPicker
        selectedTraits={traits}
        onChange={setTraits}
        onRandomize={handleRandomize}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Summoning...' : 'Reveal My Persona'}
      </button>
      <PersonaDisplay persona={persona} />
    </div>
  );
}