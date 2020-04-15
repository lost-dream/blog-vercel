window.onload = function () {
  function showtime() {
    const hours =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours(),
      minutes =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes(),
      seconds =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
    return hours + ":" + minutes + ":" + seconds;
  }

  let clockWrap = document.querySelectorAll(".sidebar-clock");
  for (let i = 0; i < clockWrap.length; i++) {
    const div1 = clockWrap[i].querySelectorAll("text");
    setInterval(() => {
      for (let i in div1) {
        div1[i].innerHTML = showtime();
      }
    }, 1000);
  }
};
