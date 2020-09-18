<?php

namespace app\modules\v1;

use yii\web\Response;

class Module extends \yii\base\Module
{
    public $controllerNamespace = 'app\modules\v1\controllers';

    public function init()
    {
        parent::init();


        \Yii::configure($this, [
            'as contentNegotiator' => [
                'class' => 'yii\filters\ContentNegotiator',

                'formats' => [
                    'application/html' => Response::FORMAT_HTML,
                    'application/json' => Response::FORMAT_JSON,
                    'application/xml' => Response::FORMAT_XML,
                    'text/html' => Response::FORMAT_RAW
                ],
            ],
        ]);


        \Yii::$app->response->on(Response::EVENT_BEFORE_SEND, function ($event) {
            $response = $event->sender;

            if($event->sender->format == 'raw') {
                return;
            }

            $response = $event->sender;

            if ($response->format == 'html') {
                return $response;
            }

            $responseData = $response->data;

            if (is_string($responseData) && json_decode($responseData)) {
                $responseData = json_decode($responseData, true);
            }

            if ($response->statusCode >= 200 && $response->statusCode <= 299) {
                $response->data = [
                    'success' => true,
                    'status' => $response->statusCode,
                    'data' => $responseData,
                ];
            } else {
                $response->data = [
                    'success' => false,
                    'status' => $response->statusCode,
                    'data' => $responseData,
                ];
            }
        });
        \Yii::$app->user->enableSession = false;
    }
}
