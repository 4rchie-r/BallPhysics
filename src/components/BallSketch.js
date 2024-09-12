// src/components/BallSketch.js
import React from 'react';
import p5 from 'p5';
import Particle from './Particle';

class BallSketch extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  Sketch = (p) => {
    let particles = [];
    let font;
    const textSize = 100;
    const particleSize = 5;
    const springStrength = 0.01; // Adjust this for softer return
    const damping = 0.95; // Adjust this for smoothness
    const repulsionStrength = 2;
    const returnDelay = 1000; // 1 second delay
    let lastInteractionTime = 0;

    p.preload = () => {
      font = p.loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      let points = font.textToPoints('Hi! I am Archie!', 100, p.height / 2, textSize, {
        sampleFactor: 0.15,
      });

      points.forEach((point) => {
        let particle = new Particle(point.x, point.y, particleSize, [p.random(255), p.random(255), p.random(255)], p, springStrength, repulsionStrength, damping);
        particles.push(particle);
      });
    };

    p.draw = () => {
      p.background(220);

      let currentTime = p.millis();
      let mouseHovered = false;

      particles.forEach((particle) => {
        if (particle.checkHover(p.mouseX, p.mouseY)) {
          mouseHovered = true;
          lastInteractionTime = currentTime;
        }

        if (currentTime - lastInteractionTime > returnDelay) {
          particle.returning = true;
        }

        particle.update();
        particle.show();
      });

      // If there was no mouse interaction, we still need to ensure particles start returning
      if (!mouseHovered) {
        lastInteractionTime = currentTime - returnDelay; // Force particles to start returning
      }
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  componentWillUnmount() {
    this.myP5.remove();
  }

  render() {
    return <div ref={this.myRef} style={{ width: '100%', height: '100vh' }} />;
  }
}

export default BallSketch;
