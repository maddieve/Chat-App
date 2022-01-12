import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

class UserHelperLibrary {
  constructor(lang) {
    this.state = {
      opened: true
    }

    this.text = ((lang) => {
      switch (lang) {
        case "ru":
          return {
            tabs: 'Выделить активный элемент',
            animations: 'Блокировать анимации',
            blackAndWhite: 'Черно-белая страница',
            inverse: 'Инверсия цветов',
            links: 'Подчеркивать ссылки',
            size: 'Увеличить размер',
            cursorBlack: 'Черный курсор',
            cursorWhite: 'Белый курсор',
            title: 'Подчеркивать заголовки',
            textSize: {
              text: 'Текст',
              sm: 'Мал.',
              md: 'Сред.',
              mx: 'Бол.'
            },
            reset: 'Сбросить'  
          }
        case "ro":
          return {
            tabs: 'Navigare pron tastatura',
            animations: 'Blocare animatii',
            blackAndWhite: 'Tonuri de gri',
            inverse: 'Culori inversate',
            links: 'Linkuri subliniate',
            size: 'Marime',
            cursorBlack: 'Cursor negru',
            cursorWhite: 'Cursor alb',
            title: 'Titlurile subliniate',
            textSize: {
              text: 'Text',
              sm: 'Mic',
              md: 'Medium',
              mx: 'Mare'
            },
            reset: 'Resetare'  
          }
        default:
          return {
            tabs: 'Highlight Selected Items',
            animations: 'Block animations',
            blackAndWhite: 'Black and white page',
            inverse: 'Color inversion',
            links: 'Underline links',
            size: 'Increase size',
            cursorBlack: 'Black cursor',
            cursorWhite: 'White cursor',
            title: 'Underline headings',
            textSize: {
              text: 'Text',
              sm: 'Small',
              md: 'Med.',
              mx: 'Max'
            },
            reset: 'Reset' 
          }  
      }
    })(lang);
  }

  domNode(){
    return `
      <div id="helperLibrary" class="userHelperLibrary">
        <div id="toggleHelper" class="user-helper-toogleButton">
          <i class="fas fa-universal-access"></i>
        </div>  
          <div class="user-helper-block" style="display: none">
            <div class="user-helper-content">
              <div class="user-helper-btn user-helper-topButton helperLogicBtn" data-option="helper-core-tabHighlight">
                <div class="user-helper-icon"><i class="far fa-keyboard"></i></div><span>${this.text.tabs}</span>
              </div>
              <div class="user-helper-btn helperLogicBtn" data-option="helper-core-blockAnim">
                <div class="user-helper-icon"><i class="far fa-lightbulb"></i></div><span>${this.text.animations}</span>
              </div>
            </div>
            <div class="user-helper-middleContent">
              <div class="user-helper-midBtn helperLogicBtn" data-option="helper-core-grey"><i class="fas fa-low-vision"></i><span>${this.text.blackAndWhite}</span></div>
              <div class="user-helper-midBtn helperLogicBtn" data-option="helper-core-invert"><i class="fas fa-adjust"></i><span>${this.text.inverse}</span></div>
              <div class="user-helper-midBtn helperLogicBtn" data-option="helper-core-underline"><i class="fas fa-link"></i><span>${this.text.links}</span></div>
              <div class="user-helper-midBtn helperLogicBtn" data-option="helper-core-zoom"><i class="fas fa-search-plus"></i><span>${this.text.size}</span></div>
              <div class="user-helper-midBtn helperLogicBtn" data-option="helper-core-blmouse"><i class="fas fa-mouse-pointer"></i>${this.text.cursorBlack}</div>
              <div class="user-helper-midBtn helperLogicBtn" data-option="helper-core-whmouse"><i class="fas fa-arrow-circle-up"></i>${this.text.cursorWhite}</div>
            </div>
            <div class="user-helper-midBtn helperLogicBtn" data-option="helper-core-titlesubline"><i class="fas fa-heading"></i><span>${this.text.title}</span></div>
            <div class="user-helper-content">
              <div class="user-helper-btn helper-btn-bottom helper-btn" data-option="">
                <span>${this.text.textSize.text}: <button class="user-helper-fontBtn" data-font="15px">${this.text.textSize.sm}</button>, <button class="user-helper-fontBtn" data-font="18px">${this.text.textSize.md}</button>, <button class="user-helper-fontBtn" data-font="20px">${this.text.textSize.mx}</button> <button class="user-helper-fontBtn" data-font=""><i class="fas fa-sync-alt"></i></button></span>
              </div>
              <div class="user-helper-btn helper-btn-bottom user-helper-bottomButton restare-btn helper-btn" data-option="helper-core-blockAnim helper-core-grey helper-core-invert helper-core-underline helper-core-zoom helper-core-blmouse helper-core-titlesubline helper-core-tabHighlight helper-core-whmouse">
                <span>${this.text.reset}</span>
              </div>
            </div>
          </div>
      </div>
    `
  }

  toggleHelper(){
    this.state.opened = !this.state.opened;
    document.getElementsByClassName('user-helper-block')[0].style.display = this.state.opened ? 'none' : '';
  }

  createDom(){
    document.body.insertAdjacentHTML("afterbegin", `<div id="root-helper">${this.domNode()}</div>`);
    this.addListeners();
  }

  addListeners(){
    const toggleFontBtn = document.querySelectorAll(".user-helper-fontBtn");
    const toggleShowHelperBtn = document.getElementById("toggleHelper");
    const helperToggleOptionBtn = document.querySelectorAll(".helperLogicBtn");
    const restareBtn = document.querySelector(".restare-btn");

    toggleShowHelperBtn.addEventListener("click", ()=>{
      this.toggleHelper();
    });

    helperToggleOptionBtn.forEach((btn)=>{
      btn.addEventListener("click", function () {
        if(this.classList.contains("pressed-btn")){
          this.classList.remove("pressed-btn");
        } else {
          this.classList.add("pressed-btn");
        }
        if(document.body.classList.contains(this.dataset.option)){
          document.body.classList.remove(this.dataset.option);
        }else{
          document.body.classList.add(this.dataset.option);
        }
      })
    });

    restareBtn.addEventListener("click", function(){
      const options = this.dataset.option.split(" ");
      options.forEach(optionClass => document.body.classList.remove(optionClass));
      helperToggleOptionBtn.forEach(btn => btn.classList.remove("pressed-btn"));
      document.body.style.fontSize = "";
    });

    toggleFontBtn.forEach(btn =>{
      btn.addEventListener("click", function () {
        document.body.style.fontSize = this.dataset.font;
      })
    });
  }
}

const initialOptions = {
  destroy: false,
  lang: 'ro'
}

export default (options = initialOptions)=>{

  const { destroy, lang } = options;
 
  if(!window.helperLibrary && !destroy){
    const $helper = new UserHelperLibrary(lang);
    $helper.createDom();
  }

  if(destroy){
    setTimeout(()=> {
      if(window['root-helper']){
        window['root-helper'].remove();
      }
    }, 0);
  }
}