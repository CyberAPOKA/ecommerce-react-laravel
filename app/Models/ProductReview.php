<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductReview extends Model
{
    protected $fillable = [
        'product_id', 'rating', 'comment', 'reviewer_name', 'reviewer_email'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
