<?php

namespace modules\craftkit\controllers;

use Craft;
use yii\web\ForbiddenHttpException;
use yii\web\Response;
use craft\web\Controller;

class PingController extends Controller
{
    protected array|int|bool $allowAnonymous = false;

    public function actionIndex(): Response
    {

        $user = Craft::$app->user->identity;

        if (!$user || !$user->admin) {
            throw new ForbiddenHttpException('Admins only.');
        }

        $datastarPlugin = Craft::$app->plugins->getPlugin('datastar');
        $datastarVersion = $datastarPlugin ? $datastarPlugin->getVersion() : null;

        return $this->asJson([
            'pong' => true,
            'timestamp' => date(DATE_ATOM),
            'environment' => Craft::$app->env,
            'craft' => [
                'version' => Craft::$app->getVersion(),
                'cache' => Craft::$app->config->general->enableTemplateCaching,
                'site' => [
                    'handle' => Craft::$app->sites->currentSite->handle,
                    'language' => Craft::$app->sites->currentSite->language,
                ],
                'plugins' => array_keys(Craft::$app->plugins->getAllPlugins()),
                'datastar' => [
                    'installed' => (bool)$datastarPlugin,
                    'version' => $datastarVersion,
                ],
                'queue' => [
                    'total' => Craft::$app->queue->getTotalJobs(),
                ],
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                ],
            ],
            'php' => PHP_VERSION,
            'server' => [
                'software' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
                'address' => $_SERVER['SERVER_ADDR'] ?? 'unknown',
                'memory_usage' => memory_get_usage(true),
                'db_driver' => Craft::$app->db->driverName,
            ],
            'client' => Craft::$app->getRequest()->userIP,
            'uuid' => Craft::$app->security->generateRandomString(32),
        ]);
    }
}
