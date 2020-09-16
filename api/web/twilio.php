<?php
require_once "../vendor/twilio/sdk/src/Twilio/autoload.php";

$response = new Twilio\TwiML\VoiceResponse();
$response->say('Hello');
$response->play('https://api.twilio.com/cowbell.mp3', ['loop' => 5]);
$response->dial('+52 55 3453 0087');
$response->say('Goodbye');
print $response;
