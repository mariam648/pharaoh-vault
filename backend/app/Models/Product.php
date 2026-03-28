<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
    'category_id',
    'name_ar',
    'name_en',
    'description_ar',
    'description_en',
    'price',
    'discount_price',
    'image',
    'gallery',
    'stock',
    'is_featured',
    'is_antique',
    'material',
    'color',
    'dimensions',
    'rating',
];

    protected $casts = [
        'gallery' => 'array',
        'is_featured' => 'boolean',
        'is_antique' => 'boolean',
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'rating' => 'decimal:1',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}