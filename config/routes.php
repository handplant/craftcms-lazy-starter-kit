<?php
/**
 * Site URL Rules
 *
 * You can define custom site URL rules here, which Craft will check in addition
 * to routes defined in Settings → Routes.
 *
 * Read all about Craft’s routing behavior, here:
 * https://craftcms.com/docs/5.x/routing.html
 */

return [
    'robots.txt' => ['template' => '_robots'],
    'hypermedia-todolist-craft-cms-datastar' => ['template' => '_custom/todo'],
];
