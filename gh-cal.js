// copy and paste the following code into the Chrome console on your GH user profile

function GHPainter() {
  this.container = this.buildContainer();
  this.cal = this.initCalendar();
  this.rects = this.buildRects();
  this.drawContainer();
  this.removeExistingListeners();
}

GHPainter.prototype.buildContainer = function() {
  var container = document.createElement("div");
  container.style.cssText = 'z-index: 1000; margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0';
  return container;
}

GHPainter.prototype.initCalendar = function() {
  var cal = document.getElementById("contributions-calendar").cloneNode(true);
  cal.removeAttribute("id");
  this.container.appendChild(cal);
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
  } else if (this.currentCount >= 75) {
    return "#1E6823";
  }
}

var painter = new GHPainter;
