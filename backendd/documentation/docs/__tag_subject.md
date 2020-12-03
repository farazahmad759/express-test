---
id: __tag_subject
title: Subject
---

- A particular `Tag` type for type of subjects.
- Has 1:M relation with `QbPost` through `__QbPost_Tags` table via `subjectId` column.
- M:N relation with `Tag->Grade`

## Examples

### Example 1

```
{
    title: "Physics",
    __type: "__subject",
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

`integer` (null)

### \_\_orderInParent

`integer` (null)

### \_\_hierarchyLevel

`integer` (null)

### \_\_misc

`JSON` object (null)

### \_\_raw

`JSON` object (null)

### \_\_type

`__subject`

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
