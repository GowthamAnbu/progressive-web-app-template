var pubKey = 'BCbDQlXsCxH5cauMXIYCLHlWc0-jgc35BU0p_sVw9bTmkuRurwuDbuVzBM_5xqkL3ku8rmh2uOPKOREvgLoEkGI';
// yCO2UzZrSHNZJ4Khb50AlzsjZ6hUpVYjFQ34mrpJIss

var notifyBtn = document.getElementById('notify-btn'),
    btnIcon = notifyBtn.children[0];

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
        // sp.sw = sw; // saving globally for other purposes /* error since no sp is found */

        sw.pushManager.getSubscription()
        .then( s => {
            var isSubscribed = s !== null;
            console.log('value is: ', isSubscribed);
            btnIcon.innerHtml = isSubscribed ? '&#x2606' : '&#x2605'; // this is to add the icon change it has nothing to do with permission
        })
    })
}