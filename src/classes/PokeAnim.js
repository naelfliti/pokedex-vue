import {gsap, Bounce} from 'gsap'

class pokeAnim {
  constructor() {
    this.bind()
    this.audio;
    this.pokemons;
  }

  init(container) {
    this.audio = container.querySelector('audio')
    this.pokemons = container.querySelectorAll('.image')

    
    this.pokemons.forEach(image => {
      console.log(image)
        image.addEventListener("click", ()=>{
          console.log('ici')
        gsap.to(image, {ease: Bounce.easeOut, y: -50 })
      })
    });
  }

  update() {

  }

  bind() {

  }
}

const _instance = new pokeAnim()
export default _instance