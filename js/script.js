const circle = document.querySelector('.circle'),
    filteredImg = document.querySelector('.img_with_filter'),
    link = document.querySelector('.link'),
    filterImg = document.querySelectorAll('.filterImg'),
    intensityCount = document.querySelector('.range-text>span'),
    inputFile = document.querySelector('.inputFile');

const img = new Image;
img.src = '';

//    load image

const loadImages = ()=>{
    
        img.src = link.value;

    setTimeout(()=>{

        if (img.width > document.documentElement.clientWidth) { //  big  img
            if (img.width-img.height>=0) { //  horizontal  img
                circle.parentElement.style.maxWidth = img.width + 'px';
                circle.parentElement.style.height = img.height * document.documentElement.clientWidth / img.width + 'px';
            } else {   // vertical  img
                circle.parentElement.style.height = document.documentElement.clientHeight+'px';
                circle.parentElement.style.maxWidth =               document.documentElement.clientHeight / img.height * img.width + 'px';     
            }
        } else {   //   small img
            if (img.width-img.height>=0) { //  horizontal  img
                circle.parentElement.style.maxWidth = document.documentElement.clientWidth + 'px';
                circle.parentElement.style.height = img.height * document.documentElement.clientWidth / img.width + 'px';
            } else {   // vertical  img
                circle.parentElement.style.height = document.documentElement.clientHeight+'px';
                circle.parentElement.style.maxWidth =               document.documentElement.clientHeight / img.height * img.width + 'px';     
            }
        }
        
    } , 1000);

    filteredImg.style.backgroundImage = 'url(' + link.value + ')';
    filteredImg.parentElement.style.backgroundImage = 'url(' + link.value + ')';
    
    const changeBG = img => img.src = link.value;

    filterImg.forEach(changeBG);
    link.value = '';
}


link.addEventListener('input', loadImages);
loadImages();


//   swipper

const doOnDrag = (evt) => {
    evt.preventDefault();

    let mousePositionX;
    if (evt.clientX > circle.parentElement.offsetWidth) {
        mousePositionX = circle.parentElement.offsetWidth - 20;
    } else {
        mousePositionX = evt.screenX - circle.offsetWidth / 2;
    }
    circle.style.left = mousePositionX + 'px';
    filteredImg.style.width = mousePositionX + 20 + 'px';
}

const doOnSwipe = (evt) => {
    evt.preventDefault();

    let mousePositionX;
    if (evt.changedTouches[0].clientX > circle.parentElement.offsetWidth) {
        mousePositionX = circle.parentElement.offsetWidth - 20;
    } else {
        mousePositionX = evt.changedTouches[0].screenX - circle.offsetWidth / 2;
    }
    circle.style.left = mousePositionX + 'px';
    filteredImg.style.width = mousePositionX + 20 + 'px';
}

circle.addEventListener('touchstart', () => {
    filteredImg.parentElement.addEventListener('touchmove', doOnSwipe);
});
circle.addEventListener('touchend', () => {
    filteredImg.parentElement.removeEventListener('touchmove', doOnSwipe);
});
filteredImg.parentElement.addEventListener('mouseup', () => {
    filteredImg.parentElement.removeEventListener('mousemove', doOnSwipe);
});



circle.addEventListener('mousedown', () => {
    filteredImg.parentElement.addEventListener('mousemove', doOnDrag);
});
circle.addEventListener('mouseup', () => {
    filteredImg.parentElement.removeEventListener('mousemove', doOnDrag);
});
filteredImg.parentElement.addEventListener('mouseup', () => {
    filteredImg.parentElement.removeEventListener('mousemove', doOnDrag);
});



//          range

const range = document.querySelector('.range');

range.addEventListener('input', () => {
    let rangeVal = range.value;
    intensityCount.textContent = rangeVal;
    let styles = getComputedStyle(filteredImg).filter;
    filteredImg.style.filter = '';
    filteredImg.style.filter = styles.split('(')[0] + `(${rangeVal})`;
});


//   drag filter

filteredImg.addEventListener('dragover', evt => {
    evt.preventDefault();
})
filteredImg.addEventListener('drop', (evt) => { 
    let rangeVal = range.value;
    let styles = getComputedStyle(filteredImg).filter;
    filteredImg.style.filter = '';

    const data = event.dataTransfer.getData('text/html');
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, 'text/html');
    if (doc.documentElement.querySelector('.filterImg')) {
        let imgStyle = doc.documentElement.querySelector('.filterImg').classList[1];
        event.target.classList = 'img_with_filter ' + imgStyle;
    }
    event.preventDefault();
});

//     filter click

const filterClicked = theseFilter => {
    let styles = getComputedStyle(theseFilter).filter;
    theseFilter.addEventListener('click', () => {
        filteredImg.style.filter = styles;
    });
}

filterImg.forEach(filterClicked);


//      drop custome image


const renderLocalImage = () => {
    img.src = reader.result;

    

    setTimeout( ()=>{

        if (img.width > document.documentElement.clientWidth) { //  big  img
            if (img.width-img.height>=0) { //  horizontal  img
                circle.parentElement.style.maxWidth = img.width + 'px';
                circle.parentElement.style.height = img.height * document.documentElement.clientWidth / img.width + 'px';
            } else {   // vertical  img
                circle.parentElement.style.height = document.documentElement.clientHeight+'px';
                circle.parentElement.style.maxWidth =               document.documentElement.clientHeight / img.height * img.width + 'px';    
            }
        } else {   //   small img
            if (img.width-img.height>=0) { //  horizontal  img
                circle.parentElement.style.maxWidth = document.documentElement.clientWidth + 'px';
                circle.parentElement.style.height = img.height * document.documentElement.clientWidth / img.width + 'px';
            } else {   // vertical  img
                circle.parentElement.style.height = document.documentElement.clientHeight+'px';
                circle.parentElement.style.maxWidth =               document.documentElement.clientHeight / img.height * img.width + 'px';   
            }
        }
        
    } , 1000);
    filteredImg.style.backgroundImage = 'url(' + reader.result + ')';
    filteredImg.parentElement.style.backgroundImage = 'url(' + reader.result + ')';
    
    const changeBG = img => img.src = reader.result;

    filterImg.forEach(changeBG);
    link.value = '';
}


  let reader = new FileReader();



  filteredImg.addEventListener('drop', (evt)=>{
    if (!evt.dataTransfer.files[0]) {
        return;
      }
    let files = evt.dataTransfer.files[0];
    
    if (!files.type.match('image.*')) {
        return alert('Eror! You only can load images!');
    }

    reader.addEventListener('loadend', renderLocalImage);
    reader.readAsDataURL(files);

    
   
  }, false);


  //                input  by  file manager


inputFile.addEventListener('input', evt => {
    let files = evt.target.files[0];
    
    if (!files.type.match('image.*')) {
        return alert('Eror! You only can load images!');
    }
    

    reader.readAsDataURL(files);

    reader.addEventListener('loadend', renderLocalImage);
    
})


document.addEventListener('dragover', (evt) => {
    evt.preventDefault();
    filteredImg.style.border = '5px dashed #33cc66';
});
document.addEventListener('dragstart', (evt) => {
    filteredImg.style.border = '5px dashed #33cc66';
});
document.addEventListener('dragend', (evt) => {
    evt.dataTransfer.effectAllowed = 'none';
    evt.preventDefault();
    filteredImg.style.border = '';
});
document.addEventListener('drop', (evt) => {
    evt.dataTransfer.effectAllowed = 'none';
    evt.preventDefault();
    filteredImg.style.border = '';
});



