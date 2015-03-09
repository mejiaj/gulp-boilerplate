# Gulp Boilerplate
An opinionated Gulp boilerplate build for writing SCSS, JS, SVG Sprites.

## Getting started

1. Install Node using NVM
  1. Download [NVM](https://github.com/creationix/nvm)
  2. Install Node v0.10.35 `nvm install 0.10.35`
  3. Select v0.10.35 as the default `nvm alias default 0.10.35`
2. Install Gulp `npm install gulp -g`
3. Install dependencies locally `npm install`
4. Profit

## Current list of tasks

- SASS compiler
- JSLinter
- Autoprefixer
- CSS and JS minifier
- SVG Sprites with PNG fallbacks (works like the Compass magic sprites)

## Available commands

- `gulp`
- `gulp watch`
- `gulp styles`
- `gulp scripts`
- `gulp clean`

## Opinionated SCSS styles

  - `_base.scss`
    - Uses Paul Irish's box-sizing reset
  - `_typography.scss`
    - Creates basic heading, line-height, and margin styles
  - `_variables.scss`
    - Basic variables for typography, colors, z-indexes, and the sprite sheets.

## Credits
- Mark Goodyeah (@markgoodyear) for creating a starters guide to Gulp with instructions. [Check out Mark's post](http://markgoodyear.com/2014/01/getting-started-with-gulp/).
- Mike Street (@liquidlight) for his work on creating the SVG sprite templates in SASS and the PNG fallback mixins. [Read more on the Liquid Light blog](https://www.liquidlight.co.uk/blog/article/creating-svg-sprites-using-gulp-and-sass/).
