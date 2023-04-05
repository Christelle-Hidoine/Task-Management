<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Task;

class Category extends Model {

    /**
     * Get the task for the categoy : category est lié à plusieurs tâches
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
