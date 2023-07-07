# API endpoints

| Endpoint | HTTP method | Data to send | Description | Parameters |
|--|--|--|--|--|
| `/api/tasks` | GET | - | Get all tasks details | - |
| `/api/tasks/[id]` | GET | - | Get a single task details | `id` - ID of the task to show |
| `/api/tasks` | POST | `title` | Create a new task | - |
| `/api/tasks/[id]` | PUT | `title` | Update a task | `id` - ID of the task to update |
| `/api/tasks/[id]` | DELETE | - | Delete a task | `id` - ID of the task to delete |
| `/api/category` | GET | - | Get all category details | - |
| `/api/category/[id]` | GET | - | Get a single category details | `id` - ID of the category to show |
| `/api/category` | POST | `name` | Create a new category | - |
| `/api/category/[id]` | PUT | `name` | Update a category | `id` - ID of the category to update |
| `/api/category/[id]` | DELETE | - | Delete a category | `id` - ID of the category to delete |
| `/api/tag` | GET | - | Get all tag details | - |
| `/api/tag/[id]` | GET | - | Get a single tag details | `id` - ID of the tag to show |
| `/api/tag` | POST | `label` | Create a new tatagsk | - |
| `/api/tag/[id]` | PUT | `label` | Update a tag | `id` - ID of the tag to update |
| `/api/tag/[id]` | DELETE | - | Delete a tag | `id` - ID of the tag to delete |