// display current day on page
document.getElementById('currentDay').textContent = moment().format('MMMM, dddd Do')

// color code blocks for past / present / future status
var evaluateCurrentTime = function () {
	$('.time-block .hour').each(function (index, hour) {
		console.log('evaluating time');
		var currentTime = moment().format('h A');
		var hourText = $(hour).text().trim();
		var timeOfEvent = moment(hourText, 'h a');

		$(hour).parent().children('.description').removeClass('past present future');

		if (moment(currentTime, 'h a').isSame(timeOfEvent)) {
			$(hour).parent().children('.description').addClass('present');
		} else if (moment(currentTime, 'h a').isBefore(timeOfEvent)) {
			$(hour).parent().children('.description').addClass('future');
		} else {
			$(hour).parent().children('.description').addClass('past');
		}
	});
};

setInterval(function () {
	evaluateCurrentTime(hour);
}, 1000 * 60);

// clicking on a time block allows the user to enter an event title
$('.container .description').on('click', function (event) {
	var text = $(this).children('p').text().trim();
	var textInput = $('<textarea>').addClass('formControl').val(text).select();
	$(this).children('p').replaceWith(textInput);
	textInput.trigger('focus');
});

$('.container .description').on('blur', 'textarea', function () {
	var text = $(this).val().trim();
	var taskP = $('<p>').text(text);
	$(this).removeClass('formControl');
	$(this).replaceWith(taskP);
});

// save event title into local storage
var tasks = {
	nineAm: '',
	tenAm: '',
	elevenAm: '',
	twelvePm: '',
	onePm: '',
	twoPm: '',
	threePm: '',
	fourPm: '',
	fivePm: '',
};

$('.saveBtn').click(function () {
	var taskHour = $(this).parent().attr('id');
	var taskTitle = $(this).parent().children('.description').text().trim();

	tasks[taskHour] = taskTitle;
	saveTasks();
});

var saveTasks = function () {
	localStorage.setItem('tasks', JSON.stringify(tasks));
};

// get tasks from local storage and display them
var loadTasks = function () {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	if (!tasks) {
		tasks = {
			nineAm: '',
			tenAm: '',
			elevenAm: '',
			twelvePm: '',
			onePm: '',
			twoPm: '',
			threePm: '',
			fourPm: '',
			fivePm: '',
		};
	}

	$('.container')
		.children('.row')
		.each(function () {
			idElm = $(this).attr('id');

			if (tasks.hasOwnProperty($(this).attr('id'))) {
				$(this).children('.description').children('p').text(tasks[idElm]);
			}
		});
};

loadTasks();
evaluateCurrentTime();
