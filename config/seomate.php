<?php

use craft\helpers\App;

return [
    'siteName' => [
        'default' => App::env('SEO_NAME'),
    ],
    'defaultProfile' => 'default',
    'fieldProfiles' => [
        'default' => [
            'title' => ['seo.seoTitle', 'headline', 'title'],
            'description' => ['seo.seoDescription'],
            'image' => ['seo.seoImage']
        ],
    ],
    'sitemapEnabled' => true,
    'outputAlternate' => false,
    'sitemapConfig' => [
        'elements' => [
            'home' => ['changefreq' => 'weekly', 'priority' => 0.5],
            'map' => ['changefreq' => 'weekly', 'priority' => 0.5],
            'search' => ['changefreq' => 'weekly', 'priority' => 0.5],
            'pages' => [
                'elementType' => \craft\elements\Entry::class,
                'criteria' => ['section' => 'pages', 'seoHideGenerated' => 0],
                'params' => ['changefreq' => 'weekly', 'priority' => 1],
            ],
            'blog' => [
                'elementType' => \craft\elements\Entry::class,
                'criteria' => ['section' => 'blog', 'seoHideGenerated' => 0],
                'params' => ['changefreq' => 'weekly', 'priority' => 1],
            ],
        ],
        'custom' => [
            '/rick-and-morty-datastar' => ['changefreq' => 'weekly', 'priority' => 1],
            '/flexible-grid-layout' => ['changefreq' => 'weekly', 'priority' => 1],
            '/hypermedia-todolist-craft-cms-datastar' => ['changefreq' => 'weekly', 'priority' => 1],
        ],
    ],
];
