<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{
    protected $fillable = [
        'user_id',
        'phone',
        'gender',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
