Lang: [🇺🇸](./README.md) [🇯🇵](./README.ja.md)

[![license](https://img.shields.io/github/license/yKicchan/generate-directory-listing-action)](https://github.com/yKicchan/generate-directory-listing-action/blob/main/LICENSE)

# Generate Directory Listing Action

This Action generates an `index.html` by exploring the specified directory.  
It is useful for browsing static pages hosted on platforms like GitHub Pages.

## Usage

The simplest way to use this Action is to invoke it and specify the target directory.

```yml
- name: Generate Directory listing
  uses: yKicchan/generate-directory-listing-action@v1
  with:
    target: dist
```

### Exclude Specific Files

By using the ignore option, you can exclude files that match specific patterns.

```yml
- name: Generate Directory listing
  uses: yKicchan/generate-directory-listing-action@v1
  with:
    target: dist
    ignore: "**/*.map"
```

To specify multiple patterns, separate them with commas.

```yml
- name: Generate Directory listing
  uses: yKicchan/generate-directory-listing-action@v1
  with:
    target: dist
    ignore: "**/*.map, **/secret"
```

### Customize Appearance

You can load additional CSS to customize the appearance of the generated index.html.

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
| target | string | yes | - | The target directory to make browsable |
| ignore | string | no | - | Glob patterns to exclude from the search. Multiple patterns can be specified using commas. |
| showHiddenFiles | boolean | no | false | Whether to display hidden files |
| theme | string | no | - | CSS styles to enhance the generated `index.html`. Specify the path relative to the `target` directory. |
| override | boolean | no | false | Whether to overwrite an existing `index.html` |
