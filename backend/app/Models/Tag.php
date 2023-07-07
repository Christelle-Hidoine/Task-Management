<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Task;

class Tag extends Model {


    /**
     * The tasks that belong to the tags.
     */
    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class, 'tag_task', 'tag_id', 'task_id');
    }
}
