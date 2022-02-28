// @generated: @expo/next-adapter@3.1.20
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');
const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');
const withImages = require('next-images');

module.exports = withPlugins([
  [withExpo, { projectRoot: __dirname }],
  withFonts,
  withImages,
]);
