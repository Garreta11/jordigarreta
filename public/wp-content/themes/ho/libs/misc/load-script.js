function loadScript(path, condition=true) {
	if (path && condition) {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.src = path;
		var x = document.getElementsByTagName('script')[0];
		x.parentNode.insertBefore(s, x);
	}
}