<?php

namespace modules\craftkit\controllers;

use yii\web\Response;
use craft\web\Controller;

class WellKnownController extends Controller
{
    protected array|int|bool $allowAnonymous = true;

    public function actionApiCatalog(): Response
    {
        return $this->asJson([
            'title' => 'craft-kit.dev API Catalog',
        ]);
    }
}
