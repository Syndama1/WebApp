var slideIndex = 0;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function cycleDiv() {
    plusDivs(1);

    setTimeout(cycleDiv, 10000);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slide");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove("active");
    x[i].classList.add("inactive");
  }
  x[slideIndex-1].classList.add("active");
  x[slideIndex-1].classList.remove("inactive");
}

