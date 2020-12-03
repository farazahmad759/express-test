---
id: __question
title: Questions
sidebar_label: Questions
---

- Inherited from `QbPost` model.
- N:M associated with `Tag` model.
- N:M associated with `QbPost` model.

## Fields

### type

`integer`. Associated with `Tag` model. Possible values are stored in `Tags` table with `__type` field set equal to `__question_type`.

### title

`null`

### description

`null`

### content

```
{
    "__statements": {
    "__en": "Which of the following is a vector?",
    "__ur": "ان میں سے کونسا ویکٹر ہے؟"
    },
    "__choices": [
        {
            "__en": "Force",
            "__ur": "فورس",
            "__is_correct": true,
            "__comments": ""
        },
        {
            "__en": "Time",
            "__ur": "ٹائم",
            "__is_correct": false,
            "__comments": ""
        },
        {
            "__en": "Mass",
            "__ur": "ماس",
            "__is_correct": false,
            "__comments": ""
        },
        {
            "__en": "Temperature",
            "__ur": "ٹمپریچر",
            "__is_correct": false,
            "__comments": ""
        }
    ],
    "__answers": {
        "__en": "",
        "__ur": ""
    }
}
```

### category1

`<grade_id>`. Associated with `Tag` model. It's redundant though as the same information is also stored inside `__misc` field, and the `tag` itself has such information.

### category2

`<subject_id>`. Associated with `Tag` model. It's redundant though as the same information is also stored inside `__misc` field, and the `tag` itself has such information.

### category3

`<topic_id>`. Associated with `Tag` model. Irrespective of `syllabus`, `book`, `chapter`, etc. It's redundant though as the same information is also stored inside `__misc` field, and the `tag` itself has such information.

### difficulty

`integer [1 to 10]`

### \_\_parentId

Used for passage \_\_question

### \_\_relevantId\_

Used for reworded relevant \_\_question

### \_\_orderInParent

an `integer` if the question belongs to a passage, `null` otherwise

### \_\_hierarchyLevel

an `integer` value for nested tree type.

### \_\_misc

`JSON object`. Stores information in the form like

```
{
    __book: <book_id>,
    __section: <section_id>,
    __chapter: <chapter_id>,
    __topicL1: <topicL1_id>,
    __topicL2: <topicL2_id>
}
```

### \_\_raw

All columns other than `__raw` itself merged in the form of a `JSON` object

### \_\_type

`string`. Possible values are stored in `Tags` table with `__type` field set equal to `__qbpost_type`. Common values include

- `__exam`
- `__passage`
- `__question`

### \_\_status

`string`. Possible values are stored in `Tags` table with `__type` field set equal to `__status_type`. Common values for `__status` are

- `__enabled`
- `__disabled`
- `__pending`

### \_\_visibility

`string`. Possible values are stored in `Tags` table with `__type` field set equal to `__visibility_type`. Common values for `__visibility` are

- `__public`: Visible to everyone for FREE
- `__private`: Only visible to author
- `__paid`: Visible to paid customers and the author himself

### \_\_createdBy

`UUID`. The UUID of the author

### \_\_lang

`string`.

Possible values are from `Tag` model with `__type` field set to `__language`. Not needed for `Question` type of `QbPost`. The language for \_\_question is handled inside of `content` column.
