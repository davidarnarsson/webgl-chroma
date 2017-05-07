import { createId } from './utils'

class Webcam {
  constructor() {
    this.element = document.createElement('video');
    this.element.id = `webcam-${createId()}`;  
    this.element.autoplay = true; 
    document.appendChild(this.element); 

    
      navigator.getUserMedia({video: true}, this.handleStream, )
    
  }

  handleErrorz

  handleStream = (stream) => {
    this.element.src = window.URL.createObjectURL(stream); 
  }

  mount() {
    
  }
}