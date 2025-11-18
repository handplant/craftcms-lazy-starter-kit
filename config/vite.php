<?php

use craft\helpers\App;

$useDevServer = App::env('ENVIRONMENT') === 'dev' || App::env('CRAFT_ENVIRONMENT') === 'dev';

return [
    'useDevServer' => $useDevServer,
    'checkDevServer' => true,
    'devServerInternal' => 'http://localhost:3000',
    'devServerPublic' => App::env('SITE_URL') . ':3000',
    'manifestPath' => Craft::getAlias('@webroot') . '/dist/.vite/manifest.json',
    'serverPublic' => Craft::getAlias('@web') . '/dist/',
];
