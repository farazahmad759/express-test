---
id: __tag_question_parenttype
title: Question Parent Type
---

A parent item for question types. The only purpose of Question Type is to inherit `Question Types` from it.

## Examples

### Example 1

```
{
    title: "Multiple Choice",
    description: "General Question Type for Multiple Choice Questions",
    __type: "__question_parenttype",
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

`__question_parenttype`

### \_\_status

`string` (compulsory, default `__enabled`)

Possible values are from `Tag` model with `__type` field set to `__status_type`.

### \_\_visibility

`string` (compulsory, default `__public`)

Possible values are from `Tag` model with `__type` field set to `__status_type`.

### \_\_createdBy

`UUID` (compulsory)

### \_\_lang

`string` (compulsory, default `__en`)

Possible values are from `Tag` model with `__type` field set to `__language`.
