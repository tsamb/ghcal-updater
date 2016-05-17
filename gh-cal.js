function GHPainter() {
  this.container = this.buildContainer();
  this.cal = this.initCalendar();
  this.drawContainer();
  this.removeExistingListeners();
  this.bindNewListeners();
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

GHPainter.prototype.drawContainer = function() {
  document.body.insertBefore(this.container, document.body.firstChild);
}

GHPainter.prototype.removeExistingListeners = function() {
  getEventListeners(window.document).click[2].remove();
}

GHPainter.prototype.bindNewListeners = function() {
  this.cal.addEventListener("click", function(e) {
    if (e.target && e.target.tagName === "rect") {
      var nextCount = getNextDataCount(parseInt(e.target.getAttribute("data-count")));
      e.target.setAttribute("data-count", nextCount);
      e.target.setAttribute("fill", getColor(nextCount));
    }
  });  
}

var painter = new GHPainter;

// copy and paste the following code into the Chrome console on your GH user profile

function getNextDataCount(currentCount) {
  if (currentCount === 0) {
    return 1;
  } else if (currentCount < 25) {
    return 37;
  } else if (currentCount < 50) {
    return 62;
  } else if (currentCount < 75) {
    return 100;
  } else if (currentCount >= 75) {
    return 0;
  }
}

function getColor(count) {
  if (count === 0) {
    return "#eeeeee";
  } else if (count < 25) {
    return "#D6E685";
  } else if (count < 50) {
    return "#8CC665";
  } else if (count < 75) {
    return "#44A340";
  } else if (count >= 75) {
    return "#1E6823";
  }
}

function getMacDates() {
  var rects = painter.cal.querySelectorAll("rect");
  return Array.prototype.map.call(rects, function(el, i) {
    var dateArray = el.getAttribute("data-date").split("-");
    return dateArray[1] + dateArray[2] + "1138" + dateArray[0].slice(2,4);
  });
}

function getGitDates() {
  var rects = painter.cal.querySelectorAll("rect");
  return Array.prototype.map.call(rects, function(el, i) {
    var date = el.getAttribute("data-date")
    return date + "T11:38";
  });
}

function getCountValues() {
  var rects = painter.cal.querySelectorAll("rect");
  return Array.prototype.map.call(rects, function(el, i) {
    return el.getAttribute("data-count");
  });
}

function buildBashDateArray() {
  var output = "DATES_ARRAY=(";
  output += getDates().join(" ");
  return output + ")";
}

// once you have built your masterpiece by clicking on the calendar squares,
// call these two functions to retrieve the arrays for the bash script

function buildBashCountsArray() {
  var output = "COUNTS_ARRAY=(";
  output += getCountValues().join(" ");
  return output + ")";
}

function buildGitDateArray() {
  var output = "DATES_ARRAY=(";
  output += getGitDates().join(" ");
  return output + ")";
}
