const blink = function(content) {
  content.style.opacity = 0;
  setTimeout(() => {
    content.style.opacity = 100;
  }, 1000);
};

const toggleJar = function() {
  const jar = document.getElementById("wateringCane");
  jar.onclick = blink.bind(null, jar);
};

window.onload = toggleJar;
