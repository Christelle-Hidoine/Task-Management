<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model {

    /**
     * Get the category that owns the task. Une seule category appartient à une tâche
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
