<?php

namespace modules\craftkit\controllers;

use yii\web\Response;
use craft\web\Controller;

class WellKnownController extends Controller
{
    protected array|int|bool $allowAnonymous = true;

    public function actionApiCatalog(): Response
    {
        $response = $this->asJson(['linkset' => []]);
        $response->headers->set('Content-Type', 'application/linkset+json');
        return $response;
    }
}
