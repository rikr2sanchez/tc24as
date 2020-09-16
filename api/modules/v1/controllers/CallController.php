<?php

namespace app\modules\v1\controllers;

use yii\rest\Controller;
use Twilio\Twiml;

class CallController extends Controller {

    /**
     * TwiML to notify the restaurant of an order
     *
     * return $string
     */
    public function actionNotify() {

        $order_number  = "ORDER0001";
        $customer_name = "RICARDO SANCHEZ";
        $response      = new Twiml();
        $response->say( 'Hello, you have a new customer order from ' . $customer_name . ' reference ' . $order_number . '. Please check your merchant app or control panel for order details. Press 1 to confirm this message.' );

        \Yii::$app->response->format = \yii\web\Response::FORMAT_XML;

        echo $response;
    }
}
