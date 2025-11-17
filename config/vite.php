<?php

use craft\helpers\App;

$useDevServer = App::env('ENVIRONMENT') === 'dev' || App::env('CRAFT_ENVIRONMENT') === 'dev';

return [
    'useDevServer' => App::env('ENVIRONMENT') === 'dev' || App::env('CRAFT_ENVIRONMENT') === 'dev',
    'devServerInternal' => 'https://localhost:3000',
    'devServerPublic' => App::env('SITE_URL') . ':3000',
    'serverPublic' => App::env('SITE_URL') . '/dist/',
    'manifestPath' => '@webroot/dist/.vite/manifest.json',
];
