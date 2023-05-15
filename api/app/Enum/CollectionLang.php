<?php

namespace App\Enum;

abstract class CollectionLang extends BaseEnum
{
    const EN = 'postal_codes_en';
    const MM = 'postal_codes_mm';

    const LANG_EN = 'en';
    const LANG_MM = 'mm';
    public static $langauges = [self::LANG_EN, self::LANG_MM];
}
