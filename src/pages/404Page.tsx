import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Flame, AlertTriangle, Home, RotateCcw, Timer, User, Droplets } from 'lucide-react';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_SIZE = 20;
const PLAYER_SPEED = 3;
const INTERACTION_TIME = 2000; // 2 secondes

// Génération aléatoire des positions
const generateRandomPosition = (width, height, excludeAreas = []) => {
  let x, y;
  let attempts = 0;
  do {
    x = Math.random() * (width - 100) + 50;
    y = Math.random() * (height - 100) + 50;
    attempts++;
  } while (
    excludeAreas.some(area => 
      x >= area.x - 60 && x <= area.x + area.width + 60 &&
      y >= area.y - 60 && y <= area.y + area.height + 60
    ) && attempts < 50
  );
  return { x, y };
};

export default function EPISimpleGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [player, setPlayer] = useState({ x: 50, y: 50 });
  const [fire, setFire] = useState({ x: 0, y: 0, extinguished: false });
  const [extinguisher, setExtinguisher] = useState({ x: 0, y: 0, taken: false });
  const [alarmButton, setAlarmButton] = useState({ x: 0, y: 0 });
  const [emergencyExit, setEmergencyExit] = useState({ x: 0, y: 0 });
  const [gameState, setGameState] = useState('start'); // start, alarm, getExtinguisher, extinguish, evacuate, won
  const [playerHasExtinguisher, setPlayerHasExtinguisher] = useState(false);
  const [alarmActivated, setAlarmActivated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [score, setScore] = useState(0);
  const [instructions, setInstructions] = useState('Utilisez les flèches pour vous déplacer');
  const [keys, setKeys] = useState({});
  const [interacting, setInteracting] = useState(false);
  const [interactionProgress, setInteractionProgress] = useState(0);
  const [currentInteraction, setCurrentInteraction] = useState(null);
  const gameRef = useRef(null);
  const interactionTimerRef = useRef(null);

  // Génération du niveau
  const generateLevel = useCallback(() => {
    // Bouton d'alarme en haut à gauche
    const alarm = { x: 50, y: 50, width: 60, height: 40 };
    
    // Sortie de secours en bas à droite
    const exit = { x: GAME_WIDTH - 120, y: GAME_HEIGHT - 80, width: 80, height: 60 };
    
    // Un seul extincteur
    const extinguisherPos = { 
      ...generateRandomPosition(GAME_WIDTH, GAME_HEIGHT, [alarm, exit]), 
      taken: false 
    };

    // Un seul feu
    const firePos = {
      ...generateRandomPosition(GAME_WIDTH, GAME_HEIGHT, [alarm, exit, extinguisherPos]),
      extinguished: false,
      size: 60
    };

    setAlarmButton(alarm);
    setEmergencyExit(exit);
    setExtinguisher(extinguisherPos);
    setFire(firePos);
  }, []);

  // Gestion des touches
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: true }));
      
      // Démarrer l'interaction avec E
      if (e.key === 'e' || e.key === 'E') {
        const nearbyInteraction = getNearbyInteraction();
        if (nearbyInteraction && !interacting) {
          startInteraction(nearbyInteraction);
        }
      }
    };

    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: false }));
      
      // Arrêter l'interaction si E est relâchée
      if (e.key === 'e' || e.key === 'E') {
        stopInteraction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [interacting]);

  // Mouvement du joueur
  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(() => {
      setPlayer(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (keys['ArrowLeft'] && newX > 0) newX -= PLAYER_SPEED;
        if (keys['ArrowRight'] && newX < GAME_WIDTH - PLAYER_SIZE) newX += PLAYER_SPEED;
        if (keys['ArrowUp'] && newY > 0) newY -= PLAYER_SPEED;
        if (keys['ArrowDown'] && newY < GAME_HEIGHT - PLAYER_SIZE) newY += PLAYER_SPEED;

        return { x: newX, y: newY };
      });
    }, 16); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [keys, gameStarted]);

  // Timer
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && gameState !== 'won') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameState('lost');
    }
  }, [timeLeft, gameStarted, gameState]);

  // Détection des objets à proximité
  const getNearbyInteraction = () => {
    const checkCollision = (obj1, obj2, threshold = 40) => {
      return Math.abs(obj1.x - obj2.x) < threshold && Math.abs(obj1.y - obj2.y) < threshold;
    };

    if (gameState === 'alarm' && checkCollision(player, alarmButton, 50)) {
      return 'alarm';
    }
    if (gameState === 'getExtinguisher' && !extinguisher.taken && checkCollision(player, extinguisher, 40)) {
      return 'extinguisher';
    }
    if (gameState === 'extinguish' && !fire.extinguished && checkCollision(player, fire, 50)) {
      return 'fire';
    }
    if (gameState === 'evacuate' && checkCollision(player, emergencyExit, 60)) {
      return 'exit';
    }
    return null;
  };

  // Démarrer une interaction
  const startInteraction = (type) => {
    setInteracting(true);
    setCurrentInteraction(type);
    setInteractionProgress(0);

    interactionTimerRef.current = setInterval(() => {
      setInteractionProgress(prev => {
        const newProgress = prev + (100 / (INTERACTION_TIME / 50)); // 50ms intervals
        
        if (newProgress >= 100) {
          completeInteraction(type);
          return 100;
        }
        return newProgress;
      });
    }, 50);
  };

  // Arrêter une interaction
  const stopInteraction = () => {
    if (interactionTimerRef.current) {
      clearInterval(interactionTimerRef.current);
      interactionTimerRef.current = null;
    }
    setInteracting(false);
    setInteractionProgress(0);
    setCurrentInteraction(null);
  };

  // Compléter une interaction
  const completeInteraction = (type) => {
    stopInteraction();

    switch (type) {
      case 'alarm':
        setAlarmActivated(true);
        setGameState('getExtinguisher');
        setInstructions('Alarme activée ! Récupérez l\'extincteur (maintenez E)');
        setScore(score + 20);
        break;
      
      case 'extinguisher':
        setExtinguisher(prev => ({ ...prev, taken: true }));
        setPlayerHasExtinguisher(true);
        setGameState('extinguish');
        setInstructions('Extincteur récupéré ! Éteignez le feu (maintenez E)');
        setScore(score + 15);
        break;
      
      case 'fire':
        setFire(prev => ({ ...prev, extinguished: true }));
        setGameState('evacuate');
        setInstructions('Feu éteint ! Dirigez-vous vers la sortie de secours (maintenez E)');
        setScore(score + 30);
        break;
      
      case 'exit':
        setGameState('won');
        setScore(score + 50);
        setInstructions('Évacuation réussie ! Procédure EPI complétée');
        break;
    }
  };

  const startGame = () => {
    generateLevel();
    setGameStarted(true);
    setGameState('alarm');
    setPlayer({ x: 50, y: 50 });
    setPlayerHasExtinguisher(false);
    setAlarmActivated(false);
    setTimeLeft(180);
    setScore(0);
    setInstructions('Appuyez et maintenez E près du bouton d\'alarme incendie !');
    setInteracting(false);
    setInteractionProgress(0);
  };

  const resetGame = () => {
    stopInteraction();
    setGameStarted(false);
    setGameState('start');
    setFire({ x: 0, y: 0, extinguished: false });
    setExtinguisher({ x: 0, y: 0, taken: false });
    setPlayerHasExtinguisher(false);
    setAlarmActivated(false);
    setTimeLeft(180);
    setScore(0);
    setInstructions('Utilisez les flèches pour vous déplacer');
  };

  const getInteractionText = () => {
    const nearby = getNearbyInteraction();
    if (!nearby) return '';

    switch (nearby) {
      case 'alarm': return 'Maintenez E pour déclencher l\'alarme';
      case 'extinguisher': return 'Maintenez E pour prendre l\'extincteur';
      case 'fire': return 'Maintenez E pour éteindre le feu';
      case 'exit': return 'Maintenez E pour évacuer';
      default: return '';
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-red-500 mb-4">404</h1>
            <p className="text-2xl text-gray-700 mb-2">🚨 Alerte Incendie ! 🚨</p>
            <p className="text-gray-600">Suivez la procédure EPI pour accéder à la page</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="flex justify-center mb-4">
              <Flame className="w-16 h-16 text-red-500 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Formation EPI - Procédure Simplifiée</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 p-6 rounded-lg text-left">
                <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="font-bold text-red-700 mb-3">Procédure (4 étapes)</h3>
                <ol className="text-red-600 space-y-2 list-decimal list-inside">
                  <li>🚨 Déclencher l'alarme incendie</li>
                  <li>🧯 Récupérer l'extincteur</li>
                  <li>🔥 Éteindre le feu</li>
                  <li>🚪 Évacuer par la sortie</li>
                </ol>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg text-left">
                <h3 className="font-bold text-blue-700 mb-3">Commandes</h3>
                <div className="space-y-2 text-blue-600">
                  <div>⬅️➡️⬆️⬇️ <strong>Flèches</strong> : Déplacement</div>
                  <div className="bg-yellow-100 p-2 rounded border">
                    <strong className="text-yellow-800">🔑 E (maintenir 2s)</strong> : Interactions
                  </div>
                  <div>⏱️ <strong>3 minutes</strong> pour compléter</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                <strong>💡 Astuce :</strong> Approchez-vous des objets et maintenez la touche <strong>E</strong> pendant 2 secondes pour interagir !
              </p>
            </div>

            <button
              onClick={startGame}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 flex items-center gap-2 mx-auto animate-pulse"
            >
              <Flame className="w-6 h-6" />
              🚨 DÉMARRER L'INTERVENTION 🚨
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'won') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-green-600 mb-4">Procédure EPI Réussie !</h2>
            <p className="text-xl text-gray-700 mb-6">
              Parfait ! Vous avez correctement suivi toute la procédure d'intervention.
            </p>
            
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{180 - timeLeft}s</div>
                  <div className="text-sm text-gray-600">Temps d'intervention</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">✅ Procédure EPI complétée :</h4>
              <div className="text-blue-700 text-sm space-y-1">
                <div>🚨 Alarme déclenchée ✓</div>
                <div>🧯 Extincteur récupéré ✓</div>
                <div>🔥 Feu éteint ✓</div>
                <div>🚪 Évacuation réussie ✓</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                Nouvelle intervention
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200">
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-red-500" />
              <span className="font-bold text-lg text-red-600">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="text-lg font-semibold">
              Score: <span className="text-green-600">{score}</span>
            </div>
            {playerHasExtinguisher && (
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded">
                <Droplets className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">Extincteur</span>
              </div>
            )}
          </div>
          <div className={`px-3 py-1 rounded text-sm font-medium ${
            alarmActivated ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {alarmActivated ? '🚨 ALARME ACTIVÉE' : 'Alarme inactive'}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4">
          <p className="text-yellow-800 font-medium">{instructions}</p>
        </div>

        {/* Zone de jeu */}
        <div 
          ref={gameRef}
          className="bg-gray-100 rounded-lg shadow-lg relative border-2 border-gray-300"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT, margin: '0 auto' }}
        >
          {/* Bouton d'alarme */}
          <div
            className={`absolute border-2 border-red-500 rounded flex items-center justify-center text-white font-bold text-xs ${
              alarmActivated ? 'bg-red-600' : 'bg-red-400 animate-pulse'
            }`}
            style={{
              left: alarmButton.x,
              top: alarmButton.y,
              width: alarmButton.width,
              height: alarmButton.height,
            }}
          >
            🚨 ALARME
          </div>

          {/* Extincteur */}
          {!extinguisher.taken && (
            <div
              className="absolute w-12 h-16 border-2 border-gray-400 rounded flex flex-col items-center justify-center bg-white"
              style={{ left: extinguisher.x, top: extinguisher.y }}
            >
              <Droplets className="w-6 h-6 text-blue-600" />
              <span className="text-xs font-bold mt-1">EAU</span>
            </div>
          )}

          {/* Feu */}
          {!fire.extinguished && (
            <div
              className="absolute rounded-full flex items-center justify-center animate-pulse bg-red-500"
              style={{
                left: fire.x,
                top: fire.y,
                width: fire.size,
                height: fire.size,
              }}
            >
              <div className="text-center">
                <Flame className="w-8 h-8 text-white animate-bounce" />
                <div className="text-white font-bold text-xs">FEU</div>
              </div>
            </div>
          )}

          {/* Sortie de secours */}
          <div
            className="absolute bg-green-500 border-2 border-green-700 rounded flex items-center justify-center text-white font-bold"
            style={{
              left: emergencyExit.x,
              top: emergencyExit.y,
              width: emergencyExit.width,
              height: emergencyExit.height,
            }}
          >
            <div className="text-center">
              <div className="text-2xl">🚪</div>
              <div className="text-xs">SORTIE</div>
            </div>
          </div>

          {/* Joueur */}
          <div
            className="absolute bg-blue-500 rounded-full border-2 border-blue-700 flex items-center justify-center transition-all duration-100"
            style={{
              left: player.x,
              top: player.y,
              width: PLAYER_SIZE,
              height: PLAYER_SIZE,
            }}
          >
            <User className="w-4 h-4 text-white" />
          </div>

          {/* Interface d'interaction */}
          {getNearbyInteraction() && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-3 rounded-lg">
              <div className="text-center">
                <div className="text-sm font-medium mb-2">{getInteractionText()}</div>
                {interacting && (
                  <div className="w-32 bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-100"
                      style={{ width: `${interactionProgress}%` }}
                    />
                  </div>
                )}
                {!interacting && (
                  <div className="text-xs text-gray-300">Appuyez et maintenez E</div>
                )}
              </div>
            </div>
          )}

          {/* Contrôles */}
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded text-xs">
            <div className="space-y-1">
              <div>⬅️➡️⬆️⬇️ Déplacement</div>
              <div>🔑 E (maintenir) Interaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}