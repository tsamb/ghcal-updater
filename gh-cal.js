// copy and paste the following code into the Chrome console on your GH user profile

function GHPainter() {
  this.cal = this.initCalendar();
  this.rects = this.buildRects();
  this.removeExistingListeners();
}

GHPainter.prototype.buildContainer = function() {
  var container = document.createElement("div");
  container.style.cssText = 'z-index: 1000; margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0';
  return container;
}

GHPainter.prototype.initCalendar = function() {
  var cal = document.getElementsByClassName("calendar-graph")[0]//.cloneNode(true);
  var styles = document.createElement("style");
  styles.innerText = "@-webkit-keyframes gold-glow { from { box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #FFDD1B, 0 0 70px #FFDD1B, 0 0 80px #FFDD1B, 0 0 100px #FFDD1B, 0 0 150px #FFDD1B; } to { box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #FFDD1B, 0 0 35px #FFDD1B, 0 0 40px #FFDD1B, 0 0 50px #FFDD1B, 0 0 75px #FFDD1B; } }";
  document.head.appendChild(styles);
  cal.querySelector("svg").style.cssText = "-webkit-animation: gold-glow 0.75s ease-in-out infinite alternate; -moz-animation: gold-glow 0.75s ease-in-out infinite alternate; animation: gold-glow 0.75s ease-in-out infinite alternate;";
  return cal;
}

GHPainter.prototype.buildRects = function() {
  var rects = this.cal.querySelectorAll("rect");
  return Array.prototype.map.call(rects, function(el) {
    return new Rect(el);
  });
}

GHPainter.prototype.drawContainer = function() {
  document.body.insertBefore(this.container, document.body.firstChild);
}

GHPainter.prototype.removeExistingListeners = function() {
  getEventListeners(window.document).click[2].remove();
}

GHPainter.prototype.getGitDates = function() {
  return this.rects.map(function(rect) {
    return rect.gitDate();
  });
}

GHPainter.prototype.getCountValues = function() {
  return this.rects.map(function(rect) {
    return rect.countDiff();
  });
}

GHPainter.prototype.buildBashCountsArray = function() {
  var output = "COUNTS_ARRAY=(";
  output += this.getCountValues().join(" ");
  return output + ")";
}

GHPainter.prototype.buildGitDatesArray = function() {
  var output = "DATES_ARRAY=(";
  output += this.getGitDates().join(" ");
  return output + ")";
}

function Rect(el) {
  this.el = el;
  this.originalCount = this.setOriginalCount();
  this.currentCount = this.originalCount;
  this.bindClickListener();
}

Rect.prototype.setOriginalCount = function() {
  return parseInt(this.el.getAttribute("data-count"));
}

Rect.prototype.countDiff = function() {
  return this.currentCount - this.originalCount;
}

Rect.prototype.gitDate = function() {
  return this.el.getAttribute("data-date") + "T11:38";
}

Rect.prototype.bindClickListener = function() {
  this.el.addEventListener("click", function(e) {
    if (e.target && e.target.tagName === "rect") {
      this.cycleCurrentCount();
    }
  }.bind(this));
}

Rect.prototype.cycleCurrentCount = function() {
  if (this.currentCount === 0) {
    this.currentCount = 1;
  } else if (this.currentCount < 25) {
    this.currentCount = 37;
  } else if (this.currentCount < 50) {
    this.currentCount = 62;
  } else if (this.currentCount < 75) {
    this.currentCount = 100;
  } else if (this.currentCount >= 75) {
    this.currentCount = this.originalCount;
  }
  this.render();
}

Rect.prototype.render = function() {
  this.el.setAttribute("data-count", this.currentCount);
  this.el.setAttribute("fill", this.currentFill());
}

Rect.prototype.currentFill = function() {
  if (this.currentCount === 0) {
    return "#eeeeee";
  } else if (this.currentCount < 25) {
    return "#D6E685";
  } else if (this.currentCount < 50) {
    return "#8CC665";
  } else if (this.currentCount < 75) {
    return "#44A340";
  } else if (this.currentCount >= 60) {
    return "#1E6823";
  }
}

var painter = new GHPainter;
