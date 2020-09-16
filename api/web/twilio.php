<?php
require_once "../vendor/twilio/sdk/src/Twilio/autoload.php";

$name = 'Caller';
$provider_phone = '+1 111111111';


if(isset($_GET['name'])) {
    $name = preg_replace('/[^-a-zA-Z]/', '', $_GET['name']);
}

if(isset($_GET['providerPhone'])) {
    $provider_phone =  preg_replace('/[^0-9+-]/', '', $_GET['providerPhone']);
}

$response = new Twilio\TwiML\VoiceResponse();
$response->say('Hello '.$name.', please wait for the provider');
//$response->play('https://api.twilio.com/cowbell.mp3');
$response->dial($provider_phone);
$response->say('Goodbye');
print $response;
