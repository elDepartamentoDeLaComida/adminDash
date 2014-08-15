window.app.services.logFeedback = function (textStatus, data, jqEl) {
  if (!data.hasOwnProperty("logStatus")) {
    if (data.responseJSON.message.length > 50) {
      jqEl.html(textStatus + ": " + data.statusText);
    } else {
      jqEl.html(textStatus + ": " + data.responseJSON.message);
    }
    jqEl.css("color", "red");
  } else {
    if (data.logStatus === "success") {
      jqEl.html("Submission Success");
      jqEl.css("color", "green");
    } else {
      jqEl.html(textStatus + ": " + data.logStatus);
      jqEl.css("color", "red");
    }
  }
};
window.app.services.serializeJSON = function (obj) {
  var attr,
    result = "";
  for (attr in obj) {
    result += attr + "=" + obj[attr] + "&";
  }
  return result;
};