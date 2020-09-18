<?php

namespace app\modules\v1\controllers;

use app\models\Setting;
use yii\web\Controller;
use Twilio\Rest\Client;
use Twilio\TwiML\VoiceResponse;

class CallController extends Controller
{
    public function actionIndex() {

        $request = \Yii::$app->request;

        $sid_setting = Setting::find()->where(['meta_key' => 'twilio_sid'])->one();
        $sid = $sid_setting->meta_value;

        $token_setting = Setting::find()->where(['meta_key' => 'twilio_token'])->one();
        $token = $token_setting->meta_value;

        $twilio_phone_setting = Setting::find()->where(['meta_key' => 'twilio_phone'])->one();
        $twilio_phone = $twilio_phone_setting->meta_value;

        $admin_name = $request->get('adminName'); //TODO: get from User model data
        $admin_phone = $request->get('adminPhone'); //TODO: get from User model data

        $provider_phone_number = $request->get('providerPhone');

        $twiml_url = 'http://167.99.171.118/api/twilio?name='.$admin_name.'&providerPhone='.urlencode($provider_phone_number);

        $client = new Client($sid, $token);

        $call = $client->calls->create(
            $admin_phone, // Call this number
            $twilio_phone, // From a valid Twilio number
            [
                'url' => $twiml_url
            ]
        );
    }
}
