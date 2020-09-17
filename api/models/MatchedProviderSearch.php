<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;

class MatchedProviderSearch extends Model
{
    public $q;
    public $page = 1;
    public $per_page = 20;

    public function rules()
    {
        return [
            [['page', 'per_page'], 'integer'],
            [['q'], 'string', 'max' => 50],
        ];
    }

    public function formName()
    {
        return '';
    }

    public function getDataProvider()
    {
        $queryParams = [];
        $query = MatchedProvider::find();

        if ($this->q) {
            $query->andWhere([
                'or',
                ['like', 'matched_provider.name', $this->q],
                ['like', 'matched_provider.email', $this->q],
                ['like', 'matched_provider.type', $this->q],
                ['like', 'matched_provider.phone', $this->q],
                ['like', 'matched_provider._ID', $this->q],
                ['like', 'matched_provider.status', $this->q]
            ]);
            $queryParams['q'] = $this->q;
        }

        $page = $this->page > 0 ? ($this->page - 1) : 0;
        $pageSize = (int)$this->per_page;

        $provider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'forcePageParam' => true,
                'page' => $page,
                'pageParam' => 'page',
                'defaultPageSize' => $pageSize,
                'pageSizeLimit' => [1, 100],
                'pageSizeParam' => 'per_page',
                'validatePage' => true,
                'params' => $queryParams,
            ],
            'sort' => [
                'defaultOrder' => [
                    'id' => SORT_DESC,
                ]
            ]
        ]);

        $rows = $provider->getModels();
        $pagination = array_intersect_key(
            (array)$provider->pagination,
            array_flip(
                \Yii::$app->params['paginationParams']
            )
        );

        $pagination['firstRowNo'] = $pagination['totalCount'] - ($page * $pageSize);

        return [
            'rows' => $rows,
            'pagination' => $pagination,
        ];
    }
}
