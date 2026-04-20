<?php

namespace modules\craftkit;

use Craft;

use craft\events\RegisterComponentTypesEvent;
use craft\events\RegisterTemplateRootsEvent;
use craft\web\UrlManager;
use craft\events\RegisterUrlRulesEvent;
use craft\web\View;
use craft\services\Utilities;
use yii\base\Application;
use yii\base\Event;
use yii\base\Module;
use yii\web\Response;
use modules\craftkit\utilities\FieldUsageUtility;
use modules\craftkit\services\MatomoBotTracking;

/**
 * @property MatomoBotTracking $matomoBotTracking
 */
class Craftkit extends Module
{
    public function init(): void
    {
        parent::init();

        Craft::setAlias('@modules', dirname(__DIR__, 2));
        Craft::setAlias('@craftkit', __DIR__);
        $this->controllerNamespace = 'modules\\craftkit\\src\\controllers';
        Craft::info('Craftkit module loaded', __METHOD__);

        $this->setComponents([
            'matomoBotTracking' => MatomoBotTracking::class,
        ]);

        // Makes module templates available in the CP under the module ID prefix
        Event::on(
            View::class,
            View::EVENT_REGISTER_CP_TEMPLATE_ROOTS,
            function(RegisterTemplateRootsEvent $event) {
                $event->roots[$this->id] = __DIR__ . '/templates';
            }
        );

        // Registers site routes handled by module controllers
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_SITE_URL_RULES,
            function(RegisterUrlRulesEvent $event) {
                $event->rules['craftkit/ping'] = 'craftkit/ping/index';
                $event->rules['.well-known/api-catalog'] = 'craftkit/well-known/api-catalog';
            }
        );

        // Adds RFC 8288 Link header on every response for agent discoverability
        Event::on(
            Response::class,
            Response::EVENT_BEFORE_SEND,
            function() {
                Craft::$app->response->headers->add('Link', '</.well-known/api-catalog>; rel="api-catalog"');
            }
        );

        // Registers the Field Usage utility in the CP
        Event::on(
            Utilities::class,
            Utilities::EVENT_REGISTER_UTILITIES,
            function(RegisterComponentTypesEvent $event) {
                $event->types[] = FieldUsageUtility::class;
            }
        );

        // Tracks known AI bots via Matomo after each request
        Event::on(
            Application::class,
            Application::EVENT_AFTER_REQUEST,
            function() {
                $this->matomoBotTracking->trackAiBot();
            }
        );
    }

    public function getMatomoBotTracking(): MatomoBotTracking
    {
        return $this->get('matomoBotTracking');
    }
}
