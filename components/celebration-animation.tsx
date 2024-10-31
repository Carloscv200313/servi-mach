'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export function CelebrationAnimation({ startCelebration }: { startCelebration: boolean }) {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (startCelebration) {
      setShowCelebration(true); // Iniciar la celebración solo cuando se activa desde el padre

      // Lanzar confeti al iniciar la celebración
      confetti({
        particleCount: 200,
        spread: 300,
        origin: { y: 0.5, x: 0.3 }
      });

      // Repetir el efecto de confeti cada segundo durante 5 segundos
      const interval = setInterval(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 4000);

      return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }
  }, [startCelebration]);

  const balloons = [
    { color: '#FF6B6B', delay: 0 },
    { color: '#4ECDC4', delay: 0.2 },
    { color: '#45B7D1', delay: 0.4 },
    { color: '#F7DC6F', delay: 0.6 },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 z-50">
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full h-full">
              {/* Balloons */}
              {balloons.map((balloon, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${25 * (index + 1)}%`,
                    bottom: '-100px',
                  }}
                  initial={{ y: 0 }}
                  animate={{
                    y: [-100, -1000], // Hacia arriba, fuera de la pantalla
                    transition: {
                      duration: 5, // Duración total
                      delay: balloon.delay,
                    },
                  }}
                >
                  <svg width="50" height="60" viewBox="0 0 50 60">
                    <path
                      d="M25 0 C38.8071 0 50 11.1929 50 25 C50 38.8071 38.8071 50 25 50 C11.1929 50 0 38.8071 0 25 C0 11.1929 11.1929 0 25 0 Z"
                      fill={balloon.color}
                    />
                    <path d="M25 50 L25 60" stroke={balloon.color} strokeWidth="2" />
                  </svg>
                </motion.div>
              ))}

              {/* Fireworks */}
              {[...Array(10)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 2, 0], // Mayor explosión
                    opacity: [1, 0], // Desaparece rápidamente
                  }}
                  transition={{
                    duration: 5, // Cambiar a 0.5 segundos para que exploten rápido
                    delay: index * 0.1, // Un pequeño retraso entre cada explosión
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="20" fill={`hsl(${Math.random() * 360}, 100%, 50%)`} />
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
