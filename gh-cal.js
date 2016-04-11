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

var $container = $("<div></div>").css({"z-index": 1000, margin: "auto", position: "absolute", top: 0, left: 0, bottom: 0, right: 0})
var $cal = $("#contributions-calendar").clone().removeAttr('id');
$container.html($cal);
$("body").prepend($container);
getEventListeners(window.document).click[2].remove();

$cal.on("click", "rect", function(e) {
  var $rect = $(this);
  var nextCount = getNextDataCount($rect.data("count"));
  $rect.data("count", nextCount);
  $rect.attr("data-count", nextCount);
  $rect.attr("fill", getColor(nextCount));
});

function getDates() {
  return $cal.find("rect").map(function(i, el) {
    var dateArray = el.getAttribute("data-date").split("-");
    return dateArray[1] + dateArray[2] + "1138" + dateArray[0].slice(2,4);
  }).get();
}

function getCountValues() {
  return $cal.find("rect").map(function(i, el) {
    return el.getAttribute("data-count");
  }).get();
}

function buildBashDateArray() {
  var output = "DATES_ARRAY=(";
  output += getDates().join(" ");
  return output + ")";
}

function getGitDates() {
  return $cal.find("rect").map(function(i, el) {
    var date = el.getAttribute("data-date")
    return date + "T11:38";
  }).get();
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

