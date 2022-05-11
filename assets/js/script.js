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
$(".container .description").on("click", function (event) {
	console.log($(this).parent().attr("id"));
	var text = $(this).children("p").text().trim();
	var textInput = $("<textarea>").addClass("formControl").val(text).select();
	$(this).children("p").replaceWith(textInput);
	textInput.trigger("focus");
});

$(".container .description").on("blur", "textarea", function () {
    console.log(this)
	var text = $(this).val().trim();
	var taskP = $("<p>").text(text);
    $(this).removeClass("formControl");
	$(this).replaceWith(taskP);
});

// save event title into local storage
