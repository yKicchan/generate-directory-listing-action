Language: [🇺🇸](./README.md) [🇯🇵](./README.ja.md)

[![GitHub Release](https://img.shields.io/github/v/release/yKicchan/generate-directory-listing-action)](https://github.com/yKicchan/generate-directory-listing-action/releases)
[![license](https://img.shields.io/github/license/yKicchan/generate-directory-listing-action)](https://github.com/yKicchan/generate-directory-listing-action/blob/main/LICENSE)
[![CI](https://github.com/yKicchan/generate-directory-listing-action/actions/workflows/ci.yml/badge.svg)](https://github.com/yKicchan/generate-directory-listing-action/actions/workflows/ci.yml)
[![Deploy](https://github.com/yKicchan/generate-directory-listing-action/actions/workflows/deploy.yml/badge.svg)](https://github.com/yKicchan/generate-directory-listing-action/actions/workflows/deploy.yml)
[![Coverage](https://ykicchan.github.io/generate-directory-listing-action/coverage/badge.svg)](https://ykicchan.github.io/generate-directory-listing-action/coverage)

# Generate Directory Listing Action

This Action generates an `index.html` that can explore the specified directory.  
It is useful for viewing static pages, such as those published on GitHub Pages.

## Demo

Here is a preview of the `index.html` generated using this Action.  
For religious reasons, it also supports Dark mode.

| Light Theme | Dark Theme |
| --- | --- |
| ![Light Theme Demo](https://github.com/user-attachments/assets/12db5a6a-4b25-45dd-aab6-eac3163e4d10) | ![Dark Theme Demo](https://github.com/user-attachments/assets/db7691a9-8e37-47ac-920f-aa0b4e634b99) |

The actual demo page generated with this Action is available on GitHub Pages:  
https://ykicchan.github.io/generate-directory-listing-action/

## Usage

The simplest way to use this Action is to invoke it and specify the target directory.

```yml
- name: Generate Directory listing
  uses: yKicchan/generate-directory-listing-action@v1
  with:
    target: dist
```

### Specifying the Version

This Action follows semantic versioning.  
From a [security perspective](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions), pinning the version using a commit hash is highly recommended.  
If you want to receive updates, you can specify either the major or minor version.  

```yml
# Fully pin the version to avoid updates
uses: yKicchan/generate-directory-listing-action@COMMIT_SHA
uses: yKicchan/generate-directory-listing-action@v1.0.0

# Pin the minor version to receive patch updates only
uses: yKicchan/generate-directory-listing-action@v1.0

# Pin the major version to receive compatible updates
uses: yKicchan/generate-directory-listing-action@v1

```

### Exclude Specific Files

By using the `ignore` option, you can exclude files that match specific patterns.

> [!tip]
> To specify multiple patterns, separate them with commas.

```yml
- name: Generate Directory listing
  uses: yKicchan/generate-directory-listing-action@v1
  with:
    target: dist
    ignore: "**/*.map"
```

### Changing the Display Format

You can change the display format using the `viewType` option.
Currently, `table` and `list` are available, with the default being `table`.
Below is an example of the `list` display.

```yml
- name: Generate Directory listing
  uses: yKicchan/generate-directory-listing-action@v1
  with:
    target: dist
    viewType: "list"
```

| Light Theme | Dark Theme |
| --- | --- |
| ![light](https://github.com/user-attachments/assets/7046a514-17d9-49e0-b090-8fa462256088) | ![dark](https://github.com/user-attachments/assets/6b952edd-8d82-4dee-a290-19da264580eb) |

### Customize Appearance

You can load additional CSS to customize the appearance of the generated `index.html`.

> [!warning]
> To ensure your customizations are applied correctly, please pin the version completely.  
> Example: `uses: yKicchan/generate-directory-listing-action@v1.0.0`  
> The HTML structure may change with version updates.

```yml
- name: Generate Directory listing
  uses: yKicchan/generate-directory-listing-action@v1
  with:
    target: dist
    # Specify the path relative to the target directory
    theme: "./custom.css"
```

## Options

Customizable options are available for flexibility.  
For detailed specifications, check [action.yml](./action.yml).

| Key | Type | Required | Default Value | Description |
| --- | --- | --- | --- | --- |
| `target` | string | yes | - | The target directory to make browsable |
| `viewType` | string | no | `"table"` | Specifies the display format.<br>Currently, `table` and `list` are available options. |
| `ignore` | string | no | - | Glob patterns to exclude from the search. Multiple patterns can be specified using commas. |
| `showHiddenFiles` | boolean | no | `false` | Whether to display hidden files |
| `theme` | string | no | - | CSS styles to enhance the generated `index.html`. Specify the path relative to the `target` directory. |
| `override` | boolean | no | `false` | Whether to overwrite an existing `index.html` |
