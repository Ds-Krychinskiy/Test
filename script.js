class MyForm {
  validationTextRegex = /^[^0-9]+$/;
  validationObj = {
    name: false,
    gender: false,
    country: false,
    city: false,
    files: false,
  } 

  name = '';
  gender = '';
  secondStepVisible = false;

  country = '';
  city = '';

  thirdStepVisible = false;
  files = {};

  constructor() {
    const gender = document.getElementById('gender');
    const name = document.getElementById('name');
    const country = document.getElementById('country');
    const city = document.getElementById('city');
    const files = document.getElementById('files');
   


    gender.addEventListener('change', this.onSelectChange)
    name.addEventListener('input', this.onNameChange)

    country.addEventListener('input', this.onCountryChange)
    city.addEventListener('input', this.onCityChange)

    files.addEventListener('change', this.onInputChange)
  }


 



  checkNewStep = () => {
    if (this.name && this.gender && !this.secondStepVisible) {
      const secondStep = document.getElementById('step-second');
      secondStep.classList.remove('hidden')
      this.secondStepVisible = true
      return;
    }

    if (this.country && this.city && !this.thirdStepVisible) {
      const thirdStep = document.getElementById('step-third');
      thirdStep.classList.remove('hidden')
      this.thirdStepVisible = true
      return
    }
  }

  checkButton = () => {
    const btn = document.getElementById('submit_button');
    if(this.validationObj.name && this.validationObj.city && this.validationObj.country) {
      btn.disabled = false
    } else {
      btn.disabled = true;
    }
  }


  checkTextValid = (value, valueName) => {
    const node = document.getElementById(valueName);
    if (value && value.match(this.validationTextRegex)) {
      this.validationObj[valueName] = true;
      node.classList.remove('invalid')
    } else {
      this.validationObj[valueName] = false;
      node.classList.add('invalid')
    }
    this.checkButton();
  }

  onSelectChange = (e) => {
    this.gender = e.target.value;
    this.checkNewStep()
  }

  onNameChange = (e) => {
    const { value } = e.target;
    const name = document.getElementById('name');
    this.checkTextValid(value, 'name')
    this.name = value;
    this.checkNewStep()
  }

  onCityChange = (e) => {
    const { value } = e.target;
    const city = document.getElementById('city');
    this.checkTextValid(value, 'city')
    this.city = value;
    this.checkNewStep()
  }

  onCountryChange = (e) => {
    const { value } = e.target;
    const country = document.getElementById('country');
    this.checkTextValid(value, 'country')
    this.country = value;
    this.checkNewStep()
  }

  onDeleteFile = (file) => {
    const id = `${file.name}${file.size}${file.lastModified}`;
    delete this.files[id]
    this.renderFiles();
  }

  renderFiles = () => { 
    const filesListView = document.getElementById('file_wraper'); 
    filesListView.innerHTML = ''; 
 
    Object.values(this.files).forEach(file => { 
      const fileContainer = document.createElement('div'); 
      fileContainer.classList.add("file_container"); 
      fileContainer.innerHTML = ` 
      <div class="output_img"> 
        <img id="img-preview" src="" alt=""> 
      </div> 
      <div class="name_img"> 
          <p class="fale_name">${file.name}</p> 
          <p class="extension">${file.type.split("/")[1].toUpperCase()} ${files.size/100000}mb</p> 
      </div> 
      <img class="delete" src="./img/Group 365.svg" alt="Delete">` 
      fileContainer.querySelector(".delete").addEventListener("click", () => this.onDeleteFile(file)); 
 
      const reader = new FileReader(); 
      reader.onload = (event) => { 
        const img = fileContainer.querySelector(".output_img img") 
        img.src = event.target.result.toString(); 
      }; 
      reader.readAsDataURL(file); 
 
      filesListView.appendChild(fileContainer); 
      setTimeout(() => { 
        const img = document.getElementById('img-preview'); 
        if (img.offsetHeight > img.offsetWidth) { 
          img.style.width = '40px'; 
          img.style.top = `calc(50% - ${Math.round(img.offsetHeight / 2)}px)`; 
        } else { 
          img.style.height = '40px'; 
          img.style.left = `calc(50% - ${Math.round(img.offsetWidth / 2)}px)`; 
        } 
      }, 100) 
    }); 
    this.checkNewStep() 
  }

  onInputChange = (e) => {
    Object.values(e.target.files).forEach((file) => {
      const id = `${file.name}${file.size}${file.lastModified}`;
      this.files[id] = file;
    })
    this.renderFiles();
  }


}

const form = new MyForm()

class Slider {
  maxSlideIndex = 2;
  slideIndex = 0;
  width = 0;

  constructor() {
    this.width = document.getElementById('slider').offsetWidth;
    const circles = document.getElementsByClassName('circle');
    const right = document.getElementById('right_button');
    const left = document.getElementById('left_button');


    [].forEach.call(circles, (circle, index) => {
      circle.addEventListener('click', () => {this.onCircleClick(index)})
    });
    right.addEventListener('click', this.rightClick);
    left.addEventListener('click', this.leftClick);
  }
  
 

  onCircleClick = (index) => {
    this.slideIndex = index;
    this.moveSliderLine();
  }

  rightClick = () => {
    if(this.slideIndex === this.maxSlideIndex){
      this.slideIndex = 0;
    } else {
      this.slideIndex++;
    }
    this.moveSliderLine();
  }


  leftClick = () => {
    if(this.slideIndex === 0){
      this.slideIndex = this.maxSlideIndex;
      
    } else {
      this.slideIndex--;
    }
    this.moveSliderLine();
  }

  moveSliderLine = () => {
    const sliderLine = document.getElementById('slider-line');
    sliderLine.style.transform = `translateX(${-this.width * this.slideIndex}px)`;
    sliderLine.style.webkitTransform = `translateX(${-this.width * this.slideIndex}px)`;
    sliderLine.style.msTransform = `translateX(${-this.width * this.slideIndex}px)`;
    this.changeActiveCircle();
  }

  changeActiveCircle = () =>{
    const circles = document.getElementsByClassName('circle');
    [].forEach.call(circles, (circle, index) => {
      if(index === this.slideIndex) {
        circle.classList.add("active");
      } else {
        circle.classList.remove("active");
      }
    })

  }
}


const slider = new Slider()