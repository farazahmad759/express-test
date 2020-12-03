---
id: __tag_syllabus
title: Syllabus
---

- A particular `Tag` type for type of syllabuses.

## Examples

### Example 1

```
{
    title: "Punjab Textbook Board 2020",
    __shortcode: "PCTB-2020",
    __type: "__syllabus",
    __status: "__enabled",
    __visibility: "__public",
    __createdBy: "b2Pq2vt503a6dRSbxBoOKBB1m623",
    __lang: "__en"
}
```

### Example 2

```
{
    title: "MDCAT 2020",
    __shortcode: "MDCAT-2020",
    __type: "__syllabus",
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

`string` (compulsory)

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

`__syllabus`

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
