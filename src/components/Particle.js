// src/components/Particle.js
class Particle {
    constructor(x, y, size, color, p, springStrength, repulsionStrength, damping) {
      this.p = p; // Store p5 instance
      this.originX = x;  
      this.originY = y;
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.velocity = this.p.createVector(0, 0);
      this.acceleration = this.p.createVector(0, 0);
      this.springStrength = springStrength; // Lower this value for softer return
      this.repulsionStrength = repulsionStrength;
      this.damping = damping; // Adjust this for smoothness
      this.returning = false;
      this.distanceToOriginal = 0;
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      if (this.returning) {
        const returnForce = this.p.createVector(this.originX - this.x, this.originY - this.y);
        returnForce.mult(this.springStrength);
        this.applyForce(returnForce);
  
        this.velocity.add(this.acceleration);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.mult(this.damping);
        this.acceleration.mult(0);
  
        this.distanceToOriginal = this.p.dist(this.x, this.y, this.originX, this.originY);
        if (this.distanceToOriginal < 1) {
          this.x = this.originX;
          this.y = this.originY;
          this.returning = false;
        }
      } else {
        this.velocity.add(this.acceleration);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.mult(this.damping);
        this.acceleration.mult(0);
      }
    }
  
    show() {
      this.p.fill(this.color);
      this.p.noStroke();
      this.p.ellipse(this.x, this.y, this.size, this.size);
    }
  
    checkHover(mouseX, mouseY) {
      const distance = this.p.dist(this.x, this.y, mouseX, mouseY);
      if (distance < 50) {
        const repulsionForce = this.p.createVector(this.x - mouseX, this.y - mouseY);
        repulsionForce.setMag(this.repulsionStrength);
        this.applyForce(repulsionForce);
        return true;
      }
      return false;
    }
  }
  
  export default Particle;
  