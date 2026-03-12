<?php

use craft\config\GeneralConfig;
use craft\helpers\App;

$environment = strtolower(App::env('CRAFT_ENVIRONMENT'));
$isDev = $environment === 'dev';
$isStaging = $environment === 'staging';
$isProduction = $environment === 'production';

$config = GeneralConfig::create()
    // --- Environment ---
    ->devMode((bool)(App::env('DEV_MODE') ?? false))
    ->isSystemLive((bool)(App::env('IS_SYSTEM_LIVE') ?? false))
    ->allowAdminChanges((bool)(App::env('ALLOW_ADMIN_CHANGES') ?? false))
    ->allowUpdates((bool)(App::env('ALLOW_UPDATES') ?? false))
    ->disallowRobots((bool)(App::env('DISALLOW_ROBOTS') ?? false))
    ->enableTemplateCaching((bool)(App::env('TEMPLATE_CACHE') ?? false))

    // --- Routing ---
    ->omitScriptNameInUrls(true)
    ->errorTemplatePrefix("_errors/")
    ->aliases([
        '@webroot' => dirname(__DIR__) . '/web',
        '@web' => App::env('SITE_URL') ?: null,
    ])

    // --- Security ---
    ->preventUserEnumeration(true)
    ->requireMatchingUserAgentForSession(!$isDev)
    ->maxInvalidLogins(5)
    ->elevatedSessionDuration('PT15M')

    // --- Tokens & Sessions ---
    ->defaultTokenDuration('P7D')
    ->previewTokenDuration('P7D')
    ->verificationCodeDuration('P7D')
    ->cacheDuration('P28D')

    // --- Content & Assets ---
    ->preloadSingles(true)
    ->defaultWeekStartDay(1)
    ->convertFilenamesToAscii(true)
    ->limitAutoSlugsToAscii(true)
    ->maxUploadFileSize(67_108_864) // 64 MB
    ->allowedFileExtensions(['jpg', 'png', 'jpeg', 'gif', 'svg', 'mp4', 'mov', 'mp3', 'wav', 'pdf', 'json', 'csv'])

    // --- Images ---
    ->transformSvgs(false)
    ->upscaleImages(false)
    ->generateTransformsBeforePageLoad(true)
    ->revAssetUrls(true)

    // --- Performance ---
    ->sendContentLengthHeader(true);

return $config;
