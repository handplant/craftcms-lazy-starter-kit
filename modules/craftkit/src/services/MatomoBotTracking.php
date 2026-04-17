<?php

namespace modules\craftkit\services;

use Craft;
use craft\helpers\App;
use yii\base\Component;

class MatomoBotTracking extends Component
{
    private const array BOTS = [
        'gptbot',
        'chatgpt-user',
        'chatgpt-browser',
        'oai-searchbot',
        'claudebot',
        'anthropic-claude',
        'claude-web',
        'claude-searchbot',
        'claude-user',
        'anthropic-ai',
        'amazonbot',
        'bytespider',
        'ccbot',
        'google-extended',
        'facebookbot',
        'meta-externalagent',
        'perplexitybot',
        'perplexity-user',
        'applebot-extended',
        'cohere-ai',
        'mistralai-user',
        'gemini',
        'githubcopilotchat',
        'google-notebooklm',
        'xai-bot',
        'deepseekbot',
        'youbot',
    ];

    public function trackAiBot(): void
    {
        $matomoUrl = App::env('MATOMO_URL');
        $siteId = App::env('MATOMO_SITE_ID');

        if (!$matomoUrl || !$siteId) {
            return;
        }

        $request = Craft::$app->getRequest();

        if ($request->getIsConsoleRequest()) {
            return;
        }

        $uaOriginal = $request->getUserAgent() ?? '';
        $ua = strtolower($uaOriginal);

        $matched = false;
        foreach (self::BOTS as $bot) {
            if (str_contains($ua, $bot)) {
                $matched = true;
                break;
            }
        }

        if (!$matched) {
            return;
        }

        $base = rtrim($matomoUrl, '/') . '/matomo.php';
        $tokenAuth = App::env('MATOMO_TOKEN_AUTH');

        $query = http_build_query(array_filter([
            'idsite' => $siteId,
            'rec' => 1,
            'recMode' => 1,
            'apiv' => 1,
            'url' => $request->getAbsoluteUrl(),
            'action_name' => $request->getPathInfo() ?: '/',
            'ua' => $uaOriginal,
            'source' => 'CraftCMS',
            'http_status' => http_response_code() ?: null,
            'cip' => ($tokenAuth && $request->getUserIP()) ? $request->getUserIP() : null,
        ]));

        $endpoint = $base . '?' . $query;

        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
                'content' => $tokenAuth ? 'token_auth=' . urlencode($tokenAuth) : '',
                'timeout' => 2,
            ],
        ]);

        $result = file_get_contents($endpoint, false, $context);
        Craft::warning('[MatomoBot] ua=' . $uaOriginal . ' ' . strlen($result ?: '') . 'b', __METHOD__);
    }
}
