<?php

namespace modules\craftkit;

use Craft;
use craft\web\UrlManager;
use craft\events\RegisterUrlRulesEvent;
use yii\base\Event;
use yii\base\Module;

class Craftkit extends Module
{
    public function init(): void
    {
        parent::init();

        Craft::setAlias('@craftkit', __DIR__);
        $this->controllerNamespace = 'modules\\craftkit\\controllers';
        Craft::info('Craftkit module loaded', __METHOD__);

        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_SITE_URL_RULES,
            function(RegisterUrlRulesEvent $event) {
                $event->rules['craftkit/ping'] = 'craftkit/ping/index';
            }
        );
    }
}
