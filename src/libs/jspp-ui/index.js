import Carousel from './Carousel';
import CarItem  from './Carousel/Item.vue'
import ButtonColor  from './ButtonColor'
let JsppUI = {};

JsppUI.install = (Vue)=>{
    Vue.component(Carousel.name,Carousel);
    Vue.component(CarItem.name,CarItem);
    Vue.component(ButtonColor.name,ButtonColor)
}

export default JsppUI;