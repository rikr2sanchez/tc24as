<?php

namespace app\models;

use Firebase\JWT\JWT;
use Yii;
use yii\behaviors\TimestampBehavior;
use yii\db\Expression;
use yii\rbac\Permission;
use yii\web\Request as WebRequest;

/**
 * Class User
 *
 * @property integer $id
 * @property string $type
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property string $password_hash
 * @property string $_ID
 * @property integer $status
 * @package app\api\v1\models
 */
class MatchedProvider extends \yii\db\ActiveRecord
{

    const STATUS_CONTACTING = 0;
    const STATUS_TALKED = 1;
    const STATUS_ASSESSTMENT = 2;
    const STATUS_CONTRACT = 3;
    const STATUS_CANCEL = 4;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'matched_providers';
    }


    /**
     * Finds provider by _ID
     *
     * @param string $_ID
     * @return static|null
     */
    public static function findByID($_ID)
    {
        $provider = static::findOne(['_ID' => $_ID]);
        return $provider;
    }

    /**
     * Finds provider by name
     *
     * @param string $name
     * @return static|null
     */
    public static function findByName($name)
    {
        $provider = static::findOne(['name' => $name]);
        return $provider;
    }



    public function fields()
    {
        $fields = [
            'id',
            'type',
            'name',
            'email',
            'phone',
            '_ID',
            'status',
        ];

        return $fields;
    }

    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->getPrimaryKey();
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['type', 'string'],
            ['name', 'required'],
            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'string', 'length' => [3, 50]],
            [
                'phone',
                'match',
                'pattern' => '/^(?:00|\+)([0-9]|\-)+$/',
                'message' => Yii::t(
                    'app',
                    'Phone can only contain numeric characters and symbols +-'
                )
            ],
            ['_ID', 'string'],
            ['status', 'in', 'range' => [self::STATUS_CONTACTING, self::STATUS_TALKED, self::STATUS_ASSESSTMENT, self::STATUS_CONTRACT, self::STATUS_CANCEL]],
        ];
    }

}
