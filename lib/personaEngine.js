const TRAITS = [
  'courage', 'rebellion', 'melancholy', 'logic', 'ambition',
  'compassion', 'pride', 'vengeance', 'wisdom', 'chaos'
];

const ELEMENTS = ['Fire', 'Ice', 'Electric', 'Wind', 'Psychic', 'Nuclear', 'Bless', 'Curse'];

const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateStats = () => ({
  STR: 10 + Math.floor(Math.random() * 10),
  MAG: 10 + Math.floor(Math.random() * 10),
  END: 10 + Math.floor(Math.random() * 10),
  AGI: 10 + Math.floor(Math.random() * 10),
  LUK: 10 + Math.floor(Math.random() * 10),
});

const generatePersonaName = (traits) => {
  const key = traits.sort().slice(0, 2).join('+');
  const names = {
    'vengeance+wisdom': 'Draumir',
    'chaos+compassion': 'Nyxelorn',
    'rebellion+ambition': 'Zerakai',
    'logic+pride': 'Sevranel',
    default: 'Caelaris'
  };
  return names[key] || names.default;
};

const generateSignatureSkill = (name, traits) =>
  `${name.slice(0, 4)}-Omega: Unleash ${traits[0].toUpperCase()}-fueled judgment.`;

const generateSpeech = (traits, name) => {
  return [
    'I am thou, thou art I...',
    `Thou who art born of ${traits[0]} and ${traits[1]},`,
    `Bearer of ${traits[2]}'s fire, and wielder of the unknown,`,
    `Now rise, ${name}, and rend the chains of fate!`
  ].join('\n');
};

const generatePersona = (traits) => {
  const name = generatePersonaName(traits);
  const speech = generateSpeech(traits, name);
  const element = randomPick(ELEMENTS);
  const weak = randomPick(ELEMENTS.filter(e => e !== element));
  const resist = randomPick(ELEMENTS.filter(e => ![element, weak].includes(e)));
  const absorb = randomPick(ELEMENTS.filter(e => ![element, weak, resist].includes(e)));

  return {
    name,
    traits,
    speech,
    imagePrompt: `A highly detailed fantasy portrait of a mythical Persona named ${name}, inspired by traits of ${traits.join(', ')}. Anime style, dark shadows, glowing eyes, ornate mask, dramatic background.`,
    element,
    weak,
    resist,
    absorb,
    stats: generateStats(),
    signatureSkill: generateSignatureSkill(name, traits)
  };
};

export { TRAITS, generatePersona };
