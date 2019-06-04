// COUNTDOWN TIMER 
// https://codepen.io/Artmann/pen/qQqbOa

class Countdown {
	constructor() {
    this.duration = 0;
    this.elapsed = 0;
    this.isActive = false;
    this.lastFrameTime = Date.now();
    
    this.onTick = () => {};
    this.onCompleted = () => {};
    
    this.tick();
  }
  
  getTimeLeft() {
    const t = this.duration - this.elapsed;

    return Math.max(0, t);
  }
  
  pause() {
	  this.isActive = false;
    return this;
  }
  
  reset() {
    this.elapsed = 0;
  }
  
  setDuration(seconds) {
    this.lastFrameTime = Date.now();
    this.duration = seconds;
    
    return this;
  }
  
  start() {
	  this.isActive = true;
    return this;
  }
  
  tick() {
  	const currentFrameTime = Date.now();
    const deltaTime = currentFrameTime - this.lastFrameTime;
    this.lastFrameTime = currentFrameTime;

    if (this.isActive) {
      this.elapsed += deltaTime / 1000;
      this.onTick(this.getTimeLeft());
      
      if(this.getTimeLeft() <= 0) {
        this.pause();
        this.onCompleted();
      }
    }
    
    window.requestAnimationFrame(this.tick.bind(this));
  }
}

const countdown = new Countdown().setDuration(120);

const label = document.querySelector('#clock-display');

$('#clock-pause').on('click', function(){
  countdown.pause();
  $("#clock-start").removeClass('timer-hide');
  $("#clock-pause").addClass('timer-hide');
});

$('#clock-reset').on('click', function(){
  countdown.pause();
  $("#clock-start").removeClass('timer-hide');
  $("#clock-pause").addClass('timer-hide');
  countdown.reset();
  label.innerHTML = Math.ceil(countdown.getTimeLeft());
});

$('#clock-start').on('click', function(){
  countdown.start();
  $("#clock-start").addClass('timer-hide');
  $("#clock-pause").removeClass('timer-hide');
});

$(document).ready(function() {
  label.innerHTML = Math.ceil(countdown.getTimeLeft());
});

countdown.onTick = (time) => {
  label.innerHTML = Math.round(time);
};

countdown.onCompleted = () => {
  alert('Times up!');
};