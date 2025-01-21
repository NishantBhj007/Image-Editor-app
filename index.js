let fileInput = document.querySelector(".file-input");
let chooseImgButton = document.querySelector(".choose-img");
let previewImg = document.querySelector(".preview-img img");
let container = document.querySelector(".editor-panel");
let filterOption = document.querySelectorAll(".filter button");
let filterName = document.querySelector(".slider .name");
let rotateOptions = document.querySelectorAll(".rotate button");
let filterSlider = document.querySelector(".slider input");
let filterValue = document.querySelector(".slider .value");
let resetFilterButton = document.querySelector(".reset-filter");
let saveImgButton = document.querySelector(".save-img");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;
let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const applyFilters = () => {
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `;
  previewImg.style.transform = `rotate(${rotate}deg)  scale(${flipHorizontal},${flipVertical})`;
};

container.style.display = "none";
function loadImage() {
  let file = fileInput.files[0]; //getting user selected file
  //passing file url
  if (!file) {
    return;
  } else {
    container.style.display = "block";
    previewImg.src = URL.createObjectURL(file);
    resetFilterButton.click();
  }
}

filterOption.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if (option.id == "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id == "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id == "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active"); //selecting filter button
  if (selectedFilter.id == "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id == "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id == "inversion") {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  applyFilters();
};

rotateOptions.forEach((options) => {
  options.addEventListener("click", () => {
    if (options.id == "left") {
      rotate -= 90;
    } else if (options.id == "right") {
      rotate += 90;
    } else if (options.id == "horizontal") {
      flipHorizontal = flipHorizontal == 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical == 1 ? -1 : 1;
    }

    applyFilters();
  });
});

const resetFilter = () => {
  (brightness = 100),
    (saturation = 100),
    (inversion = 0),
    (grayscale = 0),
    (rotate = 0),
    (flipHorizontal = 1),
    (flipVertical = 1);
  filterOption[0].click();
  applyFilters();
};

const saveImage = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  context.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `;
  context.translate(canvas.width / 2, canvas.height / 2);
  if (rotate != 0) {
    context.rotate((rotate * Math.PI) / 180);
  }

  context.scale(flipHorizontal, flipVertical);
  context.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
};

fileInput.addEventListener("change", loadImage);

chooseImgButton.addEventListener("click", () => fileInput.click());

filterSlider.addEventListener("input", updateFilter);
resetFilterButton.addEventListener("click", resetFilter);
saveImgButton.addEventListener("click", saveImage);
