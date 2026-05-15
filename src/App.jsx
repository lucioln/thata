import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Flame, Zap, Star } from 'lucide-react';

// =========================================================
// CONFIG — Personalize aqui!
// =========================================================
const CONFIG = {
  herName: "Thaisa",

  timeline: [
    {
      icon: "✨",
      text: "Quando nossas conversas começaram a virar parte dos meus dias...",
    },
    {
      icon: "🍝",
      text: "Quando os momentos simples com você começaram a significar muito...",
    },
    {
      icon: "⛪",
      text: "Quando percebi que a gente estava construindo algo de verdade...",
    },
    {
      icon: "❤️",
      text: "E hoje eu só preciso te perguntar uma coisa...",
    },
  ],

  questions: [
    {
      context:
        "Desde o começo, tinha algo diferente na forma como a gente se conectava...",
      question:
        "Qual era uma das minhas partes favoritas dos nossos dias juntos?",
      options: [
        "As nossas conversas e risadas",
        "Assistir filme juntos",
        "Sair pra lugares caros",
      ],
      answer: "As nossas conversas e risadas",
      errorMessage:
        "Hmmmm, pensa no que fazia qualquer dia ficar leve pra mim 💭",
      correctMessage:
        "Isso mesmo 🥹 Era impossível não gostar de estar contigo.",
      letterLine:
        "Foi nas nossas conversas mais simples que eu comecei a perceber o quanto tua presença fazia diferença nos meus dias.",
    },

    {
      context:
        "Você começou a ocupar espaços da minha vida sem nem perceber...",
      question:
        "Qual dessas atitudes suas sempre me marcou muito?",
      options: [
        "Cozinhar pra mim",
        "Me dar presentes caros",
        "Me acordar cedo",
      ],
      answer: "Cozinhar pra mim",
      errorMessage:
        "Tem uma coisa muito simples que sempre mexeu comigo 💭",
      correctMessage:
        "Claro ❤️ Eu sempre senti carinho nos teus detalhes.",
      letterLine:
        "Cada cuidado teu, até nos detalhes mais simples, me fazia sentir querido de um jeito leve e verdadeiro.",
    },

    {
      context:
        "Te ver fazendo parte da minha rotina começou a parecer tão natural...",
      question:
        "Qual desses momentos me fez sentir que a gente estava construindo algo real?",
      options: [
        "Quando você começou a se aproximar da minha família",
        "Quando fomos ao shopping",
        "Quando assistimos filme juntos",
      ],
      answer:
        "Quando você começou a se aproximar da minha família",
      errorMessage:
        "Não foi um momento qualquer… foi algo que mexeu comigo de verdade 💭",
      correctMessage:
        "Isso mesmo 🫶🏽 Ali eu senti algo diferente.",
      letterLine:
        "Quando te vi se aproximando da minha família e se incluindo na minha vida de forma tão natural, eu percebi que aquilo já estava ficando muito maior pra mim.",
    },

    {
      context:
        "Mesmo depois dos nossos medos e dúvidas, escolhemos continuar...",
      question:
        "O que fez nossa relação mudar de verdade?",
      options: [
        "A gente começou a se escolher e construir juntos",
        "O tempo resolveu tudo sozinho",
        "As coisas simplesmente aconteceram",
      ],
      answer:
        "A gente começou a se escolher e construir juntos",
      errorMessage:
        "Foi algo que exigiu escolha dos dois 💭",
      correctMessage:
        "Exatamente ❤️ E acho que foi aí que tudo ficou ainda mais bonito.",
      letterLine:
        "O que mais me fez acreditar na gente foi perceber que, mesmo com medo, nós escolhemos construir algo verdadeiro juntos.",
    },

    {
      context:
        "Depois de tudo que vivemos até aqui...",
      question:
        "Qual é o sentimento que mais sinto quando estou com você?",
      options: [
        "Paz",
        "Ansiedade",
        "Confusão",
      ],
      answer: "Paz",
      errorMessage:
        "A resposta sempre esteve no jeito que a gente se sente junto 🤍",
      correctMessage:
        "Isso ❤️ E é raro encontrar alguém que faça a vida ficar leve assim.",
      letterLine:
        "Hoje, quando penso em nós dois, o sentimento que mais fala alto em mim é paz. E acho que amar alguém também é isso.",
    },
  ],

  letterOpening:
    "Thaisa, a verdade é que você foi entrando na minha vida aos poucos... primeiro nas conversas, depois nas risadas, nos momentos simples e nos detalhes. E quando eu percebi, já tinha criado um espaço teu aqui dentro.",

  letterClosing:
    "A gente passou por dúvidas, medos e momentos difíceis, mas talvez tenha sido justamente isso que fez tudo se tornar tão verdadeiro. Porque mesmo depois de tudo, nós escolhemos continuar. Escolhemos construir.\n\nE foi vendo teu cuidado comigo, tua presença, tua forma de me incluir na tua vida e de se aproximar da minha, que eu percebi o quanto isso deixou de ser só sentimento. Virou escolha. Virou paz.\n\nHoje eu não quero só viver momentos contigo. Quero construir algo bonito, leve e verdadeiro ao teu lado.",

  proposalText:
    "Então agora eu só preciso te perguntar uma coisa: você aceita namorar comigo? ❤️",

  successMessage:
    "Que essa seja só a primeira página da história mais bonita que a gente ainda vai viver juntos. Eu te amo. ❤️",

  maxLives: 3,
};

// =========================================================
// Hook: Typewriter
// =========================================================
function useTypewriter(text, speed = 35, active = true) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    setDisplayed('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);

  return { displayed, done };
}

// =========================================================
// Partículas
// =========================================================
const HeartParticles = () => {
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    setHearts(Array.from({ length: 12 }).map((_, i) => ({
      id: i, left: Math.random() * 100,
      duration: 18 + Math.random() * 25,
      delay: Math.random() * 12,
      size: 8 + Math.random() * 12,
    })));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(h => (
        <motion.div key={h.id} className="absolute bottom-[-40px] text-pink-200/25"
          style={{ left: `${h.left}%`, fontSize: h.size }}
          animate={{ y: ['0vh', '-110vh'], rotate: [0, 360] }}
          transition={{ duration: h.duration, repeat: Infinity, delay: h.delay, ease: 'linear' }}>
          <Heart fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

// =========================================================
// Progress + Lives
// =========================================================
const ProgressBar = ({ current, total }) => (
  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
    <motion.div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500"
      initial={{ width: 0 }}
      animate={{ width: `${(current / total) * 100}%` }}
      transition={{ duration: 0.5, ease: 'easeOut' }} />
  </div>
);

const LivesDisplay = ({ lives, max }) => (
  <div className="flex gap-1 items-center">
    {Array.from({ length: max }).map((_, i) => (
      <motion.div key={i} animate={i >= lives ? { scale: [1, 1.4, 0.7, 1] } : {}} transition={{ duration: 0.4 }}>
        <Heart size={20} fill={i < lives ? '#f43f5e' : 'none'} stroke={i < lives ? '#f43f5e' : '#d1d5db'} strokeWidth={2} />
      </motion.div>
    ))}
  </div>
);

// =========================================================
// XP Flutuante
// =========================================================
const FloatingXP = ({ value, onDone }) => (
  <motion.div className="fixed top-1/3 left-1/2 -translate-x-1/2 text-2xl font-black text-yellow-400 drop-shadow-lg z-50 pointer-events-none"
    initial={{ opacity: 1, y: 0, scale: 0.6 }} animate={{ opacity: 0, y: -70, scale: 1.3 }}
    transition={{ duration: 1, ease: 'easeOut' }} onAnimationComplete={onDone}>
    +{value} XP ⚡
  </motion.div>
);

// =========================================================
// App
// =========================================================
export default function App() {
  const [step, setStep] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lives, setLives] = useState(CONFIG.maxLives);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerState, setAnswerState] = useState(null);
  const [revealedLines, setRevealedLines] = useState([]);
  const [showXp, setShowXp] = useState(false);
  const [xpValue, setXpValue] = useState(10);
  const [noClicks, setNoClicks] = useState(0);
  const [noPos, setNoPos] = useState({});
  const [noMessage, setNoMessage] = useState('');
  const [noGone, setNoGone] = useState(false);

  const noMessages = [
    'Onde você acha que vai? 😂',
    'Impossível escapar! 🏃',
    'Esse botão não serve pra nada... 🙈',
    'Ei, volta aqui! 😤',
    'Definitivamente não... 😏',
  ];

  // ── Welcome → Quiz
  const handleStart = () => setStep('quiz');

  // ── Resposta
  const handleOptionClick = (option) => {
    if (answerState !== null) return;
    setSelectedOption(option);
    const q = CONFIG.questions[currentQuestion];
    if (option === q.answer) {
      const earned = 10 + (streak + 1) * 5;
      setStreak(s => s + 1);
      setXp(p => p + earned);
      setXpValue(earned);
      setShowXp(true);
      setRevealedLines(prev => [...prev, q.letterLine]);
      setAnswerState('correct');
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setStreak(0);
      setAnswerState('wrong');
      if (newLives <= 0) setTimeout(() => setStep('gameover'), 1200);
    }
  };

  // ── Continuar
  const handleContinue = () => {
    setSelectedOption(null);
    setAnswerState(null);
    if (answerState === 'correct') {
      if (currentQuestion < CONFIG.questions.length - 1) {
        setCurrentQuestion(p => p + 1);
      } else {
        setStep('anticipation');
      }
    }
  };

  // ── Antecipação → Carta → Pedido
  useEffect(() => {
    if (step === 'anticipation') {
      const t = setTimeout(() => setStep('letter'), 3500);
      return () => clearTimeout(t);
    }
  }, [step]);

  // ── Botão NÃO
  const handleNoInteraction = (e) => {
    if (e.type === 'touchstart') e.preventDefault();
    const n = noClicks + 1;
    setNoClicks(n);
    setNoMessage(noMessages[Math.min(n - 1, noMessages.length - 1)]);
    if (n >= 6) { setNoGone(true); return; }
    setNoPos({ position: 'fixed', top: `${Math.random() * 55 + 20}%`, left: `${Math.random() * 60 + 10}%` });
  };

  // ── Sim
  const handleYes = () => {
    setStep('success');
    const burst = (o) => confetti({ colors: ['#f43f5e', '#fb7185', '#fda4af', '#fce7f3', '#fbbf24'], ...o });
    burst({ particleCount: 160, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => burst({ particleCount: 100, spread: 90, origin: { y: 0.5 } }), 600);
    setTimeout(() => burst({ particleCount: 80, spread: 120, origin: { y: 0.7 } }), 1200);
  };

  // ── Option styling
  const optionClass = (opt) => {
    const base = 'w-full py-4 px-5 rounded-2xl text-base font-semibold transition-all min-h-[58px] flex items-center gap-3 border-2';
    if (!selectedOption) return `${base} bg-white border-gray-200 text-gray-800 hover:border-rose-300 hover:bg-rose-50 active:scale-95`;
    const correct = CONFIG.questions[currentQuestion].answer;
    if (opt === correct) return `${base} bg-green-50 border-green-400 text-green-700`;
    if (opt === selectedOption) return `${base} bg-red-50 border-red-400 text-red-600`;
    return `${base} bg-white border-gray-200 text-gray-400 opacity-50`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50 flex flex-col items-center justify-center p-4 relative font-sans">
      <HeartParticles />
      {showXp && <FloatingXP value={xpValue} onDone={() => setShowXp(false)} />}

      <AnimatePresence mode="wait">

        {/* ── WELCOME ── */}
        {step === 'welcome' && <WelcomeScreen key="welcome" onStart={handleStart} />}

        {/* ── QUIZ ── */}
        {step === 'quiz' && (
          <motion.div key={`q${currentQuestion}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }} className="z-10 w-full max-w-md">

            {/* HUD */}
            <div className="flex justify-between items-center mb-3 px-1">
              <LivesDisplay lives={lives} max={CONFIG.maxLives} />
              <div className="flex gap-2">
                {streak >= 2 && (
                  <span className="flex items-center gap-1 bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                    <Flame size={11} />{streak}x
                  </span>
                )}
                <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full">
                  <Zap size={11} />{xp} XP
                </span>
              </div>
            </div>
            <ProgressBar current={currentQuestion} total={CONFIG.questions.length} />

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">

              {/* Contexto narrativo */}
              <p className="text-xs text-gray-400 italic mb-3 text-center">{CONFIG.questions[currentQuestion].context}</p>
              <p className="text-xs tracking-widest uppercase text-rose-400 font-semibold mb-1 text-center">
                Pergunta {currentQuestion + 1} / {CONFIG.questions.length}
              </p>
              <h2 className="text-xl font-bold text-gray-800 mb-5 text-center leading-snug">
                {CONFIG.questions[currentQuestion].question}
              </h2>

              {/* Opções */}
              <div className="space-y-3 mb-4">
                {CONFIG.questions[currentQuestion].options.map((opt, i) => (
                  <motion.button key={i} onClick={() => handleOptionClick(opt)} disabled={!!selectedOption}
                    whileTap={!selectedOption ? { scale: 0.97 } : {}}
                    animate={answerState === 'wrong' && opt === selectedOption ? { x: [0, -8, 8, -5, 5, 0] } : {}}
                    transition={{ duration: 0.35 }}
                    className={optionClass(opt)}>
                    <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 text-left">{opt}</span>
                    {selectedOption && opt === CONFIG.questions[currentQuestion].answer && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-500 font-bold">✓</motion.span>
                    )}
                    {selectedOption && opt === selectedOption && opt !== CONFIG.questions[currentQuestion].answer && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-red-500 font-bold">✗</motion.span>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Feedback + Continuar */}
              <AnimatePresence>
                {answerState && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className={`rounded-2xl px-4 py-3 mb-3 ${answerState === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <p className={`font-bold text-sm ${answerState === 'correct' ? 'text-green-700' : 'text-red-600'}`}>
                        {answerState === 'correct' ? '🎉 Incrível!' : '💔 Não foi dessa vez...'}
                      </p>
                      <p className={`text-sm ${answerState === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
                        {answerState === 'correct'
                          ? CONFIG.questions[currentQuestion].correctMessage
                          : CONFIG.questions[currentQuestion].errorMessage}
                      </p>
                    </div>
                    <motion.button whileTap={{ scale: 0.97 }} onClick={handleContinue}
                      className={`w-full py-4 rounded-2xl font-bold text-white text-base border-b-4 active:border-b-0 transition-all ${answerState === 'correct' ? 'bg-green-500 border-green-700' : 'bg-rose-500 border-rose-700'}`}>
                      {answerState === 'correct' ? 'Continuar →' : 'Tentar de novo →'}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ── ANTECIPAÇÃO ── */}
        {step === 'anticipation' && (
          <motion.div key="anticipation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="z-10 text-center max-w-xs w-full flex flex-col items-center gap-6">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
              className="text-8xl">💌</motion.div>
            <TypewriterText text="Antes de continuar, eu preciso te dizer uma coisa..." className="text-xl text-gray-700 font-medium italic leading-relaxed" speed={50} />
          </motion.div>
        )}

        {/* ── CARTA ── */}
        {step === 'letter' && (
          <LetterScreen key="letter" lines={revealedLines} xp={xp} onContinue={() => setStep('proposal')} />
        )}

        {/* ── PEDIDO ── */}
        {step === 'proposal' && (
          <motion.div key="proposal" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="z-10 text-center max-w-sm w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-7xl mb-6">💍</motion.div>

            <TypewriterText text={CONFIG.proposalText}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 leading-snug block" speed={60} />

            <div className="flex flex-col sm:flex-row justify-center gap-4 relative min-h-[130px] sm:min-h-[60px]">
              <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} onClick={handleYes}
                className="w-full sm:w-auto bg-rose-500 text-white font-bold py-4 px-12 rounded-2xl shadow-lg border-b-4 border-rose-700 hover:bg-rose-600 text-lg z-20">
                SIM 💕
              </motion.button>

              {!noGone && (
                <motion.button
                  onMouseEnter={handleNoInteraction} onTouchStart={handleNoInteraction}
                  animate={{ scale: Math.max(1 - noClicks * 0.12, 0.3) }}
                  style={noClicks > 0 ? noPos : {}}
                  title={noMessage}
                  className="bg-gray-100 text-gray-400 font-bold py-4 px-12 rounded-2xl text-lg border-b-4 border-gray-200 transition-all z-10 w-full sm:w-auto whitespace-nowrap">
                  NÃO
                </motion.button>
              )}
              {noGone && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-400 italic self-center">
                  O botão fugiu de vez! 😂
                </motion.p>
              )}
            </div>
            {noClicks > 0 && !noGone && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={noClicks}
                className="text-xs text-gray-400 mt-4 italic">{noMessage}</motion.p>
            )}
          </motion.div>
        )}

        {/* ── GAME OVER ── */}
        {step === 'gameover' && (
          <motion.div key="gameover" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="z-10 text-center max-w-sm w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="text-7xl mb-4">😢</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Acabaram os corações!</h2>
            <p className="text-gray-500 mb-6">Tudo bem! Vamos tentar de novo juntos?</p>
            <button onClick={() => { setStep('quiz'); setCurrentQuestion(0); setLives(CONFIG.maxLives); setXp(0); setStreak(0); setSelectedOption(null); setAnswerState(null); setRevealedLines([]); }}
              className="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl border-b-4 border-rose-700 hover:bg-rose-600 text-base">
              Recomeçar 🔄
            </button>
          </motion.div>
        )}

        {/* ── SUCESSO ── */}
        {step === 'success' && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="z-10 text-center max-w-sm w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} className="text-8xl mb-4">❤️</motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">SIM! 🎉</h1>
            <div className="flex justify-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
                  <Star size={22} fill="#fbbf24" className="text-yellow-400" />
                </motion.div>
              ))}
            </div>
            <p className="text-base text-gray-600 leading-relaxed mb-6">{CONFIG.successMessage}</p>
            <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
              <p className="text-rose-600 font-bold">🏆 {xp} XP conquistados</p>
              <p className="text-rose-400 text-sm">Missão concluída com amor!</p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// =========================================================
// Tela de Boas-Vindas
// =========================================================
function WelcomeScreen({ onStart }) {
  return (
    <motion.div key="welcome" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="z-10 text-center max-w-sm w-full">
      <motion.div className="text-7xl mb-6" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }}>🥰</motion.div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Para você, com amor 💕</h1>
      <p className="text-gray-400 text-sm mb-8">Cada pergunta abre um pedacinho do meu coração.</p>

      {/* Timeline */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-5 mb-6 text-left space-y-4">
        {CONFIG.timeline.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 * i + 0.3 }}
            className="flex items-start gap-3">
            <div className="text-2xl">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-600 italic">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={onStart}
        className="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg border-b-4 border-rose-700 hover:bg-rose-600 text-base active:border-b-0">
        Iniciar Nossa Jornada ✨
      </motion.button>
    </motion.div>
  );
}

// =========================================================
// Tela da Carta
// =========================================================
function LetterScreen({ lines, xp, onContinue }) {
  const fullLetter = [CONFIG.letterOpening, ...lines, CONFIG.letterClosing].join('\n\n');
  const { displayed, done } = useTypewriter(fullLetter, 30, true);
  return (
    <motion.div key="letter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="z-10 w-full max-w-sm">
      <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-6 sm:p-8 mb-4">
        <p className="text-xs tracking-widest uppercase text-rose-400 font-semibold mb-4 text-center">✉️ Uma carta para você</p>
        <p className="text-gray-700 leading-relaxed italic whitespace-pre-wrap text-base min-h-[160px]">
          {displayed}
          {!done && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="inline-block ml-0.5 w-0.5 h-4 bg-rose-400 align-middle" />}
        </p>
      </div>
      <AnimatePresence>
        {done && (
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.97 }}
            onClick={onContinue}
            className="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg border-b-4 border-rose-700 hover:bg-rose-600 text-base active:border-b-0">
            Continuar... 💕
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// =========================================================
// Typewriter Component
// =========================================================
function TypewriterText({ text, className, speed = 35 }) {
  const { displayed, done } = useTypewriter(text, speed, true);
  return (
    <span className={className}>
      {displayed}
      {!done && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="inline-block ml-0.5 w-0.5 h-5 bg-rose-400 align-middle" />}
    </span>
  );
}
