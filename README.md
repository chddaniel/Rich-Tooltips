# Rich-Tooltips

Rich-Tooltips is a lightweight library for creating customizable tooltips with optional media (images, videos) and text content. This library allows you to display tooltips with rich content like text, images, or videos on hover, providing a modern user experience.

## Features

- **Text Tooltips**: Display custom text on hover.
- **Image Tooltips**: Show images on hover for a richer experience.
- **Video Tooltips**: Embed videos (autoplay or loop) in tooltips.


### For local testing & development

- Can run on NPM 10.2.4, Node v21.2.0
- Clone the repo and run `npm install`
- Run `npm start` to start up the webpack server for live reload.

### Usage

1. Add the `data-tooltip` property to the element that should have a tooltip.
2. Add the `data-text` property with the value for the text that will appear in the tooltip.
3. Add the `data-video` or `data-image` property with the value being the src to the media item.

### Examples

#### Tooltip with Text only
```html
<button data-tooltip data-text="This is a text tooltip">
  Hover over me!
</button>
```

#### Tooltip with Image
```html
<button data-tooltip data-image="https://example.com/image.jpg">
  Hover over me to see an image
</button>
```

#### Tooltip with Video
```html
<button data-tooltip data-video="https://example.com/video.mp4">
  Hover over me to see a video
</button>
```

#### Tooltip with Text and Media (Image/Video)
```html
<button data-tooltip data-text="Here’s a cool video!" data-video="https://example.com/video.mp4">
  Hover over me for video and text
</button>
```

