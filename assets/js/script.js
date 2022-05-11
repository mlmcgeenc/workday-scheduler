// color code blocks for past / present / future
var evaluateCurrentTime = function (hour) {
	var currentTime = moment().format("h A");
	var hourText = $(hour).text().trim();
	var timeOfEvent = moment(hourText, "h a");

	$(hour).parent().children(".description").removeClass("past present future");

	if (moment(currentTime, "h a").isSame(timeOfEvent)) {
		$(hour).parent().children(".description").addClass("present");
	} else if (moment(currentTime, "h a").isBefore(timeOfEvent)) {
        $(hour).parent().children(".description").addClass("future");
	} else {
        $(hour).parent().children(".description").addClass("past");
	}
};

setInterval(function () {
	$(".time-block .hour").each(function (index, hour) {
		evaluateCurrentTime(hour);
	});
}, 1000);
// }, 1000 * 60 * 60);

// clicking on a time block allows the user to enter an event title

// save event title into local storage