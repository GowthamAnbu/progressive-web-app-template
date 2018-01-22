var pubKey = 'BCbDQlXsCxH5cauMXIYCLHlWc0-jgc35BU0p_sVw9bTmkuRurwuDbuVzBM_5xqkL3ku8rmh2uOPKOREvgLoEkGI';
// yCO2UzZrSHNZJ4Khb50AlzsjZ6hUpVYjFQ34mrpJIss

var notifyBtn = document.getElementById('notify-btn')//,
    /* btnIcon = notifyBtn.children[0] */; // Original code

if ( 'serviceWorker' in navigator && 'PushManager' in window ) {
    notifyBtn.classList.remove('hidden');

    /* actually there is no permission in notification
       instead they have requestPermission tbh I don't event know why this works :(
       and even the requestPermission is not working
    */
    if (Notification.permission !== 'denied') {
        console.log('if');
        notifyBtn.removeAttribute('disabled');
    }/* else {
        notifyBtn.setAttribute('disabled', true);
        console.log('else');
    } */ // this code is not needed since I have added the disabled attribute directly to the html

    navigator.serviceWorker.ready
    .then( sw => {
        // sp.sw = sw; // saving globally for other purposes /* error since no sp is found */

        /* have to check the conditional statement
           for isSubscribed mainly the setAttribute and the removeAttribute
        */
        /* UNCOMMENT the else part of isSubscribed for real code;
           COMMENTED it testing purposes actually the real code
           does something else related to unicode YUCK
        */
        sw.pushManager.getSubscription()
        .then( s => {
            var isSubscribed = s !== null;
            console.log('value is: ', isSubscribed);
            if (isSubscribed) {
                notifyBtn.setAttribute('disabled', true);
            }/* else {
                notifyBtn.removeAttribute('disabled');
            } */
            // btnIcon.innerHtml = isSubscribed ? '&#xf1f6' : '&#xf0f3'; // Original code
        })
    })
}