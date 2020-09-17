<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%matched_providers}}`.
 */
class m200916_224122_create_matched_providers_table extends Migration
{

    public function up()
    {
        $this->createTable('matched_providers', [
            'id' => $this->primaryKey(),
            'type' => $this->string(50),
            'name' => $this->string(100),
            'email' => $this->string(255),
            'phone' => $this->string(100),
            '_ID' => $this->string(20),
            'status' => $this->integer(2)
        ]);
    }


    public function down()
    {
        $this->dropTable('matched_providers');
        $this->dropTable('setting');
    }
}
