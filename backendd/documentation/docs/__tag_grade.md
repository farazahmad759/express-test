---
id: __tag_grade
title: Grade
---

- A particular `Tag` type for type of grades.
- Has 1:M relation with `QbPost` through `__QbPost_Tags` table via `gradeId` column.
- M:N relation with `Tag->Subject`

## Examples

### Example 1

```
{
    title: "Grade 09",
    __type: "__grade",
    __status: "__enabled",
    __visibility: "__public",
    __createdBy: "b2Pq2vt503a6dRSbxBoOKBB1m623",
    __lang: "__en"
}
```

## Fields

| Property           | Type      | Value             | Description                                                                                     |
| ------------------ | --------- | ----------------- | ----------------------------------------------------------------------------------------------- |
| \_\_tttLevel       | `integer` | `null`            | -                                                                                               |
| \_\_tttFormat      | `integer` | `null`            | -                                                                                               |
| title              | `string`  | any string        | -                                                                                               |
| description        | `text`    | any text          | -                                                                                               |
| \_\_shortcode      | `string`  | `null`            | -                                                                                               |
| \_\_parentId       | `integer` | `null`            | -                                                                                               |
| \_\_orderInParent  | `integer` | `null`            | -                                                                                               |
| \_\_hierarchyLevel | `integer` | `null`            | -                                                                                               |
| \_\_misc           | `object`  | `null`            | -                                                                                               |
| \_\_raw            | `object`  | `null`            | -                                                                                               |
| \_\_type           | `string`  | \_\_grade         | -                                                                                               |
| \_\_status         | `string`  | a string          | one of the values from `qbvalues.__shortcode` where `qbvalues.__type` == `__column__type`       |
| \_\_visibility     | `string`  | a string          | one of the values from `qbvalues.__shortcode` where `qbvalues.__type` == `__column__visibility` |
| \_\_createdBy      | `UUID`    | UUID of the owner | -                                                                                               |
| \_\_lang           | `string`  | a string          | -                                                                                               |
