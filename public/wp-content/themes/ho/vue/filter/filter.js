Vue.filter('formatDate', function(value) {
	if (value) {
		if(window.lang === "de")
			return moment(String(value)).format('D. MMMM');
		else
			return moment(String(value)).format('D MMMM');
	}
});


Vue.filter('formatTime', function(value) {
	if (value) {
		if(window.lang === "en")
			return moment(String(value),[moment.ISO_8601, 'HH:mm']).format("hh:mm A")
		else
			return value;
	}
});

Vue.filter('formatTimeEnd', function(value) {
	if (value) {
		if(window.lang === "en")
			return moment(String(value),[moment.ISO_8601, 'HH:mm']).format("hh:mm A")
		else
			return value+" Uhr";
	}
});

Vue.filter('trim', function(value) {
	if (value) {
		return value.trim();
	}
});

Vue.filter('formatDay', function(value) {
	if (value) {
		return moment(String(value)).format('dddd')
	}
});

Vue.filter('formatEvent', function(value) {
	if (value) {
		return moment(String(value)).format('dd D.MM.')
	}
});

Vue.filter('formatEventLong', function(value) {
	if (value) {
		if(window.lang === "en")
			return moment(String(value)).format('D MMMM');
		else
			return moment(String(value)).format('dddd, D.MM.');
	}
});


Vue.filter('secondsAsTime',function(secs)
{
	var hr  = Math.floor(secs / 3600);
	var min = Math.floor((secs - (hr * 3600))/60);
	var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
	if (min < 10){
		min = "0" + min;
	}
	if (sec < 10){
		sec  = "0" + sec;
	}
	return min + ':' + sec;
});