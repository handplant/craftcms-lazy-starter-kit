<?php

namespace modules\craftkit;

use Craft;

use craft\events\RegisterComponentTypesEvent;
use craft\events\RegisterTemplateRootsEvent;
use craft\web\UrlManager;
use craft\events\RegisterUrlRulesEvent;
use craft\web\View;
use craft\services\Utilities;
use yii\base\Event;
use yii\base\Module;
use modules\craftkit\utilities\FieldUsageUtility;

class Craftkit extends Module
{
    public function init(): void
    {
        parent::init();

        Craft::setAlias('@modules', dirname(__DIR__, 2));
        Craft::setAlias('@craftkit', __DIR__);
        $this->controllerNamespace = 'modules\\craftkit\\src\\controllers';
        Craft::info('Craftkit module loaded', __METHOD__);

        // Register template roots
        Event::on(
            View::class,
            View::EVENT_REGISTER_CP_TEMPLATE_ROOTS,
            function(RegisterTemplateRootsEvent $event) {
                $event->roots[$this->id] = __DIR__ . '/templates';
            }
        );

        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_SITE_URL_RULES,
            function(RegisterUrlRulesEvent $event) {
                $event->rules['craftkit/ping'] = 'craftkit/ping/index';
            }
        );

        Event::on(
            Utilities::class,
            Utilities::EVENT_REGISTER_UTILITIES,
            function(RegisterComponentTypesEvent $event) {
                $event->types[] = FieldUsageUtility::class;
            }
        );
    }
}
