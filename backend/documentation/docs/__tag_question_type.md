---
id: __tag_question_type
title: Question Type
---

- A particular `Tag` type for type of questions.
- Many to One relation with `QbPost` through `type` field.

## Examples

### Example 1

```
{
    title: "Synonym",
    description: "For English Class 11",
    __parentId: 1,
    misc:
    {
        __grade: 1,
        __subject: 1,
        __marks: 1,
        __statements: {
            __en: "Choose the similar word",
            __ur: "ان میں سے ملتے جلتے لفظ کا انتخاب کیجئے"
        },
        __substatements: {
            __en: "Choose the similar word",
            __ur: "ان میں سے ملتے جلتے لفظ کا انتخاب کیجئے"
        }
    }
    __type: "__question_type",
    __status: "__enabled",
    __visibility: "__public",
    __createdBy: "b2Pq2vt503a6dRSbxBoOKBB1m623",
    __lang: "__en"
}
```

## Fields

### title

`string` (compulsory)

### description

`text` (optional)

### \_\_shortcode

`string` (null)

### \_\_parentId

`integer` (compulsory)

Refers to `__question_parenttype`

### \_\_orderInParent

`integer` (null)

### \_\_hierarchyLevel

`integer` (null)

### \_\_misc

`JSON` object (compulsory)

```
{
    __grade: <grade_id>,
    __subject: <subject_id>,
    __marks: <integer>,
    __statements: {
        __en: "Choose the similar word",
        __ur: "ان میں سے ملتے جلتے لفظ کا انتخاب کیجئے"
    },
    __substatements: {
        __en: "Choose the similar word",
        __ur: "ان میں سے ملتے جلتے لفظ کا انتخاب کیجئے"
    }
}
```

### \_\_raw

`JSON` object (null)

### \_\_type

`__question_type`

### \_\_status

`string` (compulsory, default `__enabled`)

Possible values are from `Tag` model with `__type` field set to `__status_type`.

### \_\_visibility

`string` (compulsory, default `__public`)

Possible values are from `Tag` model with `__type` field set to `__status_type`.

### \_\_createdBy

`UUID`

### \_\_lang

`string` (compulsory, default `__en`)

Possible values are from `Tag` model with `__type` field set to `__language`.
