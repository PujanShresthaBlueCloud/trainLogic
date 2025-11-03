import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

interface Particle {
  x: number;
  y: number;
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

interface FloatingChar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  size: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface Orbit {
  centerX: number;
  centerY: number;
  radius: number;
  angle: number;
  speed: number;
  planetSize: number;
  label: string;
}

export function AINetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Configuration - slowed down to 30% speed
    const nodeCount = 50;
    const maxDistance = 200;
    const particleCount = 30;
    const charCount = 20;
    const starCount = 80;
    const orbitCount = 3;

    // Colors
    const purple1 = '#8B5CF6';
    const purple2 = '#A78BFA';
    const purple3 = '#C4B5FD';

    // Create nodes
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.0015, // Slowed down to 30%
        vy: (Math.random() - 0.5) * 0.0015, // Slowed down to 30%
        radius: Math.random() * 3 + 2,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const fromNode = Math.floor(Math.random() * nodes.length);
      let toNode = Math.floor(Math.random() * nodes.length);
      while (toNode === fromNode) {
        toNode = Math.floor(Math.random() * nodes.length);
      }

      particles.push({
        x: nodes[fromNode].x,
        y: nodes[fromNode].y,
        fromNode,
        toNode,
        progress: Math.random(),
        speed: (0.002 + Math.random() * 0.003) * 0.03, // Slowed down to 30%
      });
    }

    // Create floating characters
    const characters = ['{', '}', '[', ']', '<', '>', '?', '/', '*', '#', '&', '@', '±'];
    const floatingChars: FloatingChar[] = [];
    for (let i = 0; i < charCount; i++) {
      floatingChars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, // Slowed down to 30%
        vy: (Math.random() - 0.5) * 0.3, // Slowed down to 30%
        char: characters[Math.floor(Math.random() * characters.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.006, // Slowed down to 30%
        opacity: 0.8 + Math.random() * 0.15,
        size: 20 + Math.random() * 30,
      });
    }

    // Create stars
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: (0.02 + Math.random() * 0.003) * 0.3, // Slowed down to 30%
      });
    }

    // Create orbits (AI concepts)
    const aiConcepts = [
      'Neural Networks',
      'Deep Learning',
      'Regression Models',
      'Training Data',
    ];
    
    const orbits: Orbit[] = [];
    for (let i = 0; i < orbitCount; i++) {
      // orbits.push({
      //   centerX: 150 + i * 400,
      //   centerY: 200 + (i % 2) * 300,
      //   radius: 40 + i * 15,
      //   angle: Math.random() * Math.PI * 2,
      //   speed: (0.003 + Math.random() * 0.002) * 0.03, // Slowed down to 30%
      //   planetSize: 4 + Math.random() * 3,
      //   label: aiConcepts[i % aiConcepts.length],
      // });
    }

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = 0.3 + Math.sin(star.twinklePhase) * 0.7;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.6})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Add small glow
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.radius * 2
        );
        gradient.addColorStop(0, `rgba(167, 139, 250, ${twinkle * 0.3})`);
        gradient.addColorStop(1, 'rgba(167, 139, 250, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw orbits
      orbits.forEach((orbit) => {
        // Update angle
        orbit.angle += orbit.speed;

        // Draw orbit path
        ctx.strokeStyle = `rgba(139, 92, 246, 0.15)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(orbit.centerX, orbit.centerY, orbit.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw center (AI core)
        const coreGradient = ctx.createRadialGradient(
          orbit.centerX,
          orbit.centerY,
          0,
          orbit.centerX,
          orbit.centerY,
          6
        );
        coreGradient.addColorStop(0, purple3);
        coreGradient.addColorStop(0.5, purple2);
        coreGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(orbit.centerX, orbit.centerY, 6, 0, Math.PI * 2);
        ctx.fill();

        // Calculate planet position
        const planetX = orbit.centerX + Math.cos(orbit.angle) * orbit.radius;
        const planetY = orbit.centerY + Math.sin(orbit.angle) * orbit.radius;

        // Draw planet with glow
        const planetGradient = ctx.createRadialGradient(
          planetX,
          planetY,
          0,
          planetX,
          planetY,
          orbit.planetSize * 2
        );
        planetGradient.addColorStop(0, purple3);
        planetGradient.addColorStop(0.5, purple1);
        planetGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.fillStyle = planetGradient;
        ctx.beginPath();
        ctx.arc(planetX, planetY, orbit.planetSize * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw planet core
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(planetX, planetY, orbit.planetSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw label
        ctx.font = '10px "Fira Code", monospace';
        ctx.fillStyle = `rgba(167, 139, 250, 0.5)`;
        ctx.textAlign = 'center';
        ctx.fillText(orbit.label, orbit.centerX, orbit.centerY + orbit.radius + 20);
      });

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Update pulse (slowed down)
        node.pulsePhase += 0.006; // 30% of 0.02

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - node.x;
          const dy = nodes[j].y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Draw node with pulse effect
        const pulseScale = 1 + Math.sin(node.pulsePhase) * 0.3;
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * pulseScale
        );
        
        gradient.addColorStop(0, purple2);
        gradient.addColorStop(0.5, purple1);
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
        ctx.fill();

        // Draw bright core
        ctx.fillStyle = purple3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw particles
      particles.forEach((particle) => {
        // Update progress
        particle.progress += particle.speed;

        // Reset if reached destination
        if (particle.progress >= 1) {
          particle.progress = 0;
          particle.fromNode = particle.toNode;
          particle.toNode = Math.floor(Math.random() * nodes.length);
          while (particle.toNode === particle.fromNode) {
            particle.toNode = Math.floor(Math.random() * nodes.length);
          }
        }

        // Calculate position
        const from = nodes[particle.fromNode];
        const to = nodes[particle.toNode];
        particle.x = from.x + (to.x - from.x) * particle.progress;
        particle.y = from.y + (to.y - from.y) * particle.progress;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          6
        );
        gradient.addColorStop(0, purple3);
        gradient.addColorStop(0.5, purple2);
        gradient.addColorStop(1, 'rgba(167, 139, 250, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw bright core
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw floating characters
      floatingChars.forEach((char) => {
        // Update position
        char.x += char.vx;
        char.y += char.vy;
        char.rotation += char.rotationSpeed;

        // Wrap around edges
        if (char.x < -50) char.x = canvas.width + 50;
        if (char.x > canvas.width + 50) char.x = -50;
        if (char.y < -50) char.y = canvas.height + 50;
        if (char.y > canvas.height + 50) char.y = -50;

        // Draw character
        ctx.save();
        ctx.translate(char.x, char.y);
        ctx.rotate(char.rotation);
        ctx.font = `${char.size}px "Fira Code", monospace`;
        ctx.fillStyle = `rgba(139, 92, 246, ${char.opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(char.char, 0, 0);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}
