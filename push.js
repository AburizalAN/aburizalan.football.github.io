var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BCZ4cRkYqhShXpsHVdKzrLmYbDQ3lSIQjnkp1bm8xFCfHFuN9g0baYhxroAsXTrR5qUt-IWQcLQlxsNMLLK0l58",
   "privateKey": "bbF7DzCicVmIm0tP0Bqej0yhUPC1fU-QpAlQEh6fCZs"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/faljCpIsFrQ:APA91bFbS6rER4nKqnK3ZjkLqKGL1TnNCK6x-Hzt9Kz-I6_mvxfFn2zGkgJHEr951gU3iHTHMKV4aQIV79atIzV6e27UJaw8iH3LtcvfxNwitQENaI6eKWYdYxX5eYNtF4E5Yx78elBQ",
   "keys": {
       "p256dh": "BHsHCTNPxsa1dp+HOxkHaxICCd9YKWz7y7A4b6iPsxAx5FXXwTI9Ko3Elvm8MOPL3hgcs2zPIdYsFrXqk8P378c=",
       "auth": "eIkEYqFdRacHAAWVOKCKrg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '452845773000',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);