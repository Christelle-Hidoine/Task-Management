<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Task extends Model {

    /**
     * Get the category that owns the task. Une seule category appartient à une tâche
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * The tags that belong to the tasks.
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'tag_task', 'task_id', 'tag_id');
    }
}
