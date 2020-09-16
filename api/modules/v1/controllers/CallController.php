<?php

namespace app\modules\v1\controllers;

use yii\web\Controller;
use Twilio\Rest\Client;
use Twilio\TwiML\VoiceResponse;

class CallController extends Controller
{
    public function actionIndex() {
        $sid = "AC27b919b20f36e2831a2d349bfbccf3f0"; // Your Account SID from www.twilio.com/console
        $token = "d4c94170174f4b0ab4203f39e76930e3"; // Your Auth Token from www.twilio.com/console

        $client = new Client($sid, $token);

// Read TwiML at this URL when a call connects (hold music)
        $call = $client->calls->create(
            '+525511393375', // Call this number
            '+18174096444', // From a valid Twilio number
            [
                'url' => 'http://167.99.171.118:8888/twilio.php'
            ]
        );
    }
}
