---
id: __tag_topic
title: Topic
---

- A general `Tag` type for type of Section/Chapter/Topic/SubTopic/SubsubTopic so on.
- It is of two types
  - If it is independent of `Grade`, `Subject` and `Syllabus`, then it is identified as `__topic_type1`
  - If it is tied to `Grade`, `Subject`, and `Syllabus`, then it's identified as `__topic_type2`

# Type 1

## Type 1 Examples

### Example 1

```
{
    title: "Thermodynamics",
    __type: "__topic_type1",
    __status: "__enabled",
    __visibility: "__public",
    __createdBy: "b2Pq2vt503a6dRSbxBoOKBB1m623",
    __lang: "__en"
}
```

## Type 1 Fields

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

`__topic_type1`

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

# Type 2

## Type 2 Examples

### Example 1

A `__topic_type2` type. Belongs to Physics Grade 11 from PCTB-2020.

```
{
    title: "Vectors & Equilibrium",
    __type: "__topic_type2",
    __misc:
    {
      __grade: 1,
      __subject: 1,
      __syllabus: 1,
      __book: "English Book I",
      __subtype: '__chapter',
      __topic_code: "T02", // chapter number
    },
    __status: "__enabled",
    __visibility: "__public",
    __createdBy: "b2Pq2vt503a6dRSbxBoOKBB1m623",
    __lang: "__en"
}
```

### Example 2

A `__topic_type2` type. Belongs to Physics Grade 11 from PCTB-2020, and Chapter 02.

```
{
    title: "Rectangular Coordinate System",
    __type: "__topic_type2",
    __parentId: 1, // id of __subtype = "__chapter"
    __misc:
    {
      __grade: 1, // redundant. easily gettable from _parentId
      __subject: 1, // redundant. easily gettable from _parentId
      __syllabus: 1,
      __book: "English Book I",
      __subtype: '__article_L1',
      __topic_code: "T01" // article number in the chapter
    },
    __status: "__enabled",
    __visibility: "__public",
    __createdBy: "b2Pq2vt503a6dRSbxBoOKBB1m623",
    __lang: "__en"
}
```

## Type 2 Fields

### title

`string` (compulsory)

### description

`text` (optional)

### \_\_shortcode

`string` (null)

### \_\_parentId

`integer` (null for `__book`, non-null for others).

### \_\_orderInParent

`integer` (null for `__book`, non-null for others).

### \_\_hierarchyLevel

`integer` (optional). Common values include

```
{
  1 for => __misc.__subtype = "__book",
  2 for => __misc.__subtype = "__section",
  3 for => __misc.__subtype = "__chapter",
  4 for => __misc.__subtype = "__article_L1",
  5 for => __misc.__subtype = "__article_L2",
  6 for => __misc.__subtype = "__article_L3"
}
```

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
