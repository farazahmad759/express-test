---
id: __tag
title: Tags
sidebar_label: Tags
---

A general term used for various items such as Grades, Subjects, Syllabus etc. To create a new _type_, create an entry by setting a proper value for `__type` field

- Tag Type (\_\_tagtype)

## Common Tag Types

- Grade (\_\_grade)
- Subject (\_\_subject)
- Syllabus (\_\_syllabus)
- Boardyear (\_\_boardyear)
- Topic (\_\_topic)
- Post Supertype (\_\_post_superttype)
- Post Type (\_\_post_type)
- Excercise Numbering (\_\_exercise)

## Creating a new Tag Type

For demonstration purposes, let's create a `Tag` type called `Grade`. In order to do this we need to set the following values

### Mandatory fields

- Set `title` to **Grade**
- Set `__shortcode` to **\_\_grade**
- Set `__type` to **\_\_tagtype**

### Optional fields

All other fields are optional

## Introduction to common tag types

### Grade

- An independent `Tag` item. It has no parent.
- **Example**
  - _title_: `Grade 11`
  - _\_\_type_: `__grade`

### Subject

- An independent `Tag` item. It has no parent.
- **Example**
  - _title_: `Physics`
  - _\_\_type_: `__subject`

### Syllabus

- An independent `Tag` item. It has no parent.
- **Example 1**
  - _title_: `Punjab Curriculum and Textbook Board 2020`
  - _\_\_type_: `__syllabus`
  - \_\_shortcode: `PCTB-2020`
- **Example 2**
  - _title_: `MDCAT 2020`
  - _\_\_type_: `__syllabus`
  - \_\_shortcode: `MDCAT-2020`

### Book

- Depends on `Grade`, `Subject` and `Syllabus`.
- **Example**
  Let's say

  - _title_: `Book I`
  - _\_\_type_: `__book`
  - _misc_:

  ```
    {
        __grade: <grade_id>,
        __subject: <subject_id>,
        __syllabus: <syllabus_id>
    }
  ```

### Section

- Depends on `Book`.
- **Example**
  Let's say

  - _title_: `Book I`
  - _\_\_type_: `__section`
  - _\_\_parentId_: `<book_id>`

  ## Fields

|                 | \_\_tttLevel                          | \_\_tttFormat                        | title      | description | \_\_shortcode | \_\_parentId                                     | \_\_orderInParent                                         | \_\_hierarchyLevel                                                                                                                                 | \_\_misc                                                            | \_\_raw | \_\_type           | \_\_status | \_\_visibility | \_\_createdBy | \_\_lang |
| --------------- | ------------------------------------- | ------------------------------------ | ---------- | ----------- | ------------- | ------------------------------------------------ | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------- | ------------------ | ---------- | -------------- | ------------- | -------- |
| Grade           | `null`                                | `null`                               | any string | any text    | `null`        | `null`                                           | `null`                                                    | `null`                                                                                                                                             | `null`                                                              | `null`  | \_\_grade          | a string   | a string       | UUID of user  | a string |
| Subject         | `null`                                | `null`                               | any string | any text    | `null`        | `null`                                           | `null`                                                    | `null`                                                                                                                                             | `null`                                                              | `null`  | \_\_subject        | a string   | a string       | UUID of user  | a string |
| Syllabus        | `null`                                | `null`                               | any string | any text    | a string      | `null`                                           | `null`                                                    | `null`                                                                                                                                             | `null`                                                              | `null`  | \_\_syllabus       | a string   | a string       | UUID of user  | a string |
| Boardyears      | `null`                                | `null`                               | any string | any text    | a string      | `null`                                           | `null`                                                    | `null`                                                                                                                                             | `null`                                                              | `null`  | \_\_boardyear      | a string   | a string       | UUID of user  | a string |
| Post Supertypes | `null`                                | `null`                               | any string | any text    | `null`        | `null`                                           | `null`                                                    | `null`                                                                                                                                             | `{ for_qbposts_type: "any value from qbposts.__type" }`             | `null`  | \_\_post_supertype | a string   | a string       | UUID of user  | a string |
| Post Types      | `null`                                | `null`                               | any string | any text    | `null`        | `integer` (reference to a Post Supertype)        | `null`                                                    | `null`                                                                                                                                             | `null`                                                              | `null`  | \_\_post_type      | a string   | a string       | UUID of user  | a string |
| Topics          | `integer` (auto-generated from title) | `string` (auto-generated from title) | any string | any text    | `null`        | `null` or `integer` (reference to another topic) | `integer` (auto-generated, but currently not implemented) | `integer` (auto-generated. If `__parentId` is `null`, it is equal to 1, otherwise its value is +1 greater than the parent's hierarchyLevel value). | `{__topic_subtype: "syllabus_dependent" OR "syllabus_independent"}` | `null`  | \_\_topic          | a string   | a string       | UUID of user  | a string |
