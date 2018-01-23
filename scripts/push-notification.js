var pubKey = 'BCbDQlXsCxH5cauMXIYCLHlWc0-jgc35BU0p_sVw9bTmkuRurwuDbuVzBM_5xqkL3ku8rmh2uOPKOREvgLoEkGI';
// yCO2UzZrSHNZJ4Khb50AlzsjZ6hUpVYjFQ34mrpJIss
var notifyBtn = document.getElementById('notify-btn'),
    btnIcon = notifyBtn.children[0];
var sp;

if ( 'serviceWorker' in navigator && 'PushManager' in window ) {
	notifyBtn.classList.remove('hidden');

	/* actually there is no permission in notification
		 instead they have requestPermission tbh I don't event know why this works :(
		 and even the requestPermission is not working
	*/
	// conditional statment is to check the permission
	if (Notification.permission !== 'denied') {
		notifyBtn.disabled = false;
	}

	navigator.serviceWorker.ready
	.then( sw => {
		sp = sw;
		sw.pushManager.getSubscription()
		.then( s => {
			var isSubscribed = s !== null;
			btnIcon.innerHtml = isSubscribed ? '&#x2606' : '&#x2605'; // this is to add the icon change it has nothing to do with permission
		});
	});
}

notifyBtn.addEventListener('click', function(event) {
	this.disabled = true;
	sp.pushManager.getSubscription()
	.then( s => {
		if ( s !== null) {
			s.unsubscribe();
			/* .unsubscribe will unsubscribe in browser,message server 
				 but we have to manually do things in our web server
				 TODO: tell our web server to do things
			*/
			btnIcon.innerHTML = '&#x2606';
			this.disabled = false;
		}else {
			sp.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey:urlB64ToUint8Array(pubKey)
			}) // UNCOMMENT 'api/subscription' promise after api creation
			/* .then( s => fetch('api/subscription', {
				headers: {'Content-Type': 'application/json'},
				method: 'POST',
				credentials: 'same-origin',
				body: JSON.stringify(s),
			})) */
			.then( res => {
				btnIcon.innerHTML = '&#x2605';
				this.disabled = false;
			});
		}
	});
});

// copied from https://github.com/GoogleChromeLabs/web-push-codelab/blob/master/app/scripts/main.js#L31-L44
function urlB64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}