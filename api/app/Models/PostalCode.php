<?php

namespace App\Models;

use App\Enum\CollectionLang;
use Jenssegers\Mongodb\Eloquent\Model;

class PostalCode extends Model
{
    // use this syntax when you need to change Connection or Collection
    // protected $connection = 'mongodb';
    protected $collection = CollectionLang::EN;
}
