<?php

namespace modules\craftkit\utilities;

use Craft;
use craft\base\Utility;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use yii\base\InvalidRouteException;
use yii\console\Exception;

class FieldUsageUtility extends Utility
{
    public static function displayName(): string
    {
        return 'Field Usage';
    }

    public static function id(): string
    {
        return 'craftkit-field-usage';
    }

    public static function icon(): ?string
    {
        return Craft::getAlias('@app/icons/fields.svg'); // nimm ein beliebiges Icon
    }

    /**
     * @throws InvalidRouteException
     * @throws SyntaxError
     * @throws Exception
     * @throws RuntimeError
     * @throws \yii\base\Exception
     * @throws LoaderError
     */
    public static function contentHtml(): string
    {
        $view = Craft::$app->getView();

        return $view->renderTemplate('craftkit/fields/utility', [
            'grouped' => self::getFieldUsage()
        ]);
    }

    private static function getFieldUsage(): array
    {
        $fieldsService = Craft::$app->getFields();
        $allFields = $fieldsService->getAllFields();
        $entryTypes = Craft::$app->getEntries()->getAllEntryTypes();

        $grouped = [];

        foreach ($allFields as $masterField) {
            $masterUid = $masterField->uid;
            $typeName = $masterField::displayName();
            $icon = $masterField->getIcon();

            if (str_starts_with($icon, '@')) {
                $iconPath = $icon;
                $namespace = null;
            } else {
                $iconPath = '@app/icons/' . $icon . '.svg';
                $namespace = 'cp';
            }

            $instances = [];

            foreach ($entryTypes as $entryType) {
                $layout = $entryType->getFieldLayout();
                $layoutFields = $layout->getCustomFields();

                foreach ($layoutFields as $instanceField) {
                    if ($instanceField->uid !== $masterUid) {
                        continue;
                    }

                    $instances[] = [
                        'entryType' => $entryType->name,
                        'entryTypeHandle' => $entryType->handle,
                        'entryTypeEditUrl' => $entryType->getCpEditUrl(),
                        'instanceLabel' => $instanceField->name,
                        'instanceHandle' => $instanceField->handle,
                    ];
                }
            }

            $grouped[$typeName][] = [
                'masterLabel' => $masterField->name,
                'masterHandle' => $masterField->handle,
                'masterUid' => $masterField->uid,
                'masterType' => $typeName,
                'masterIcon' => [
                    'path' => $iconPath,
                    'namespace' => $namespace,
                ],
                'masterEditUrl' => $masterField->getCpEditUrl(),
                'instances' => $instances,
            ];
        }

        ksort($grouped);

        return $grouped;
    }
}
