<?php

namespace app\modules\v1\controllers;

use yii\web\Controller;
use Twilio\Rest\Client;
use Twilio\TwiML\VoiceResponse;

class TwilioController extends Controller
{
    public $enableCsrfValidation = false;

    public function actionIndex() {

        $request = \Yii::$app->request;

        $current_user_name = $request->get('name');
        $provider_phone_number = $request->get('providerPhone');


        \Yii::$app->response->format = \yii\web\Response::FORMAT_RAW;


        $response = new VoiceResponse();
        $response->say('Hello '.$current_user_name.', please wait for the provider');
        $response->dial($provider_phone_number);
        $response->say('Goodbye');


        return $response->asXML();

    }
}
