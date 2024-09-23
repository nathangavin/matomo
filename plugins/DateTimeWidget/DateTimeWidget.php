<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\DateTimeWidget;

class DateTimeWidget extends \Piwik\Plugin
{
    public function registerEvents()
    {

        return [
            'CronArchive.getArchivingAPIMethodForPlugin' => 'getArchivingAPIMethodForPlugin',
            'AssetManager.getJavaScriptFiles' => 'getJsFiles'
        ];
    }

    public function getJsFiles(&$jsFiles) {
        $jsFiles[] = "plugins/DateTimeWidget/javascripts/plugin.js";
    }
    
    // support archiving just this plugin via core:archive
    public function getArchivingAPIMethodForPlugin(&$method, $plugin)
    {
        if ($plugin == 'DateTimeWidget') {
            $method = 'DateTimeWidget.getExampleArchivedMetric';
        }
    }
}
