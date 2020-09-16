<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;

class SiteController extends Controller
{
    public function actionPing()
    {
        if (\file_exists($_SERVER['DOCUMENT_ROOT'] . '/../.migrated') === false) {
            $response = new Response();
            $response->statusCode = 503;
            $response->data = Yii::t('app', 'migration not completed');

            return $response;
        }
        $response = new Response();
        $response->statusCode = 200;
        $response->data = Yii::t('app', 'pong');

        return $response;
    }

    public function actionError()
    {
        $response = new Response();
        $response->statusCode = 400;
        $response->data = json_encode(
            [
                'name' => 'Bad Request',
                'message' => Yii::t('app', 'The system could not process your request. Please check and try again.'),
                'code' => 0,
                'status' => 400,
                'type' => 'yii\\web\\BadRequestHttpException'
            ]
        );

        return $response;
    }

    /**
     * TwiML to notify the restaurant of an order
     *
     * return $string
     */
//    public function actionNotify() {
//
//        // Your Account SID and Auth Token from twilio.com/console
//        $account_sid = 'AC27b919b20f36e2831a2d349bfbccf3f0';
//        $auth_token = 'd4c94170174f4b0ab4203f39e76930e3';
//// In production, these should be environment variables. E.g.:
//// $auth_token = $_ENV["TWILIO_ACCOUNT_SID"]
//
//// A Twilio number you own with Voice capabilities
//        $twilio_number = "+18174096444";
//
//// Where to make a voice call (your cell phone?)
//        $to_number = "+52 55 3453 0087";
//
//        $client = new Client($account_sid, $auth_token);
//        $client->account->calls->create(
//            $to_number,
//            $twilio_number,
//            array(
//                "url" => getenv("API_HOST").":8888/playwait"
//            )
//        );
//
////
////
////        $response = new VoiceResponse();
////        $response->enqueue('support', ['waitUrl' => 'http://s3.amazonaws.com/com.twilio.sounds.music/index.xml']);
////
////
////        $dial = $response->dial('');
////        $dial->queue('support', ['url' => 'about_to_connect.xml']);
////
////        echo $response;
//    }

}
