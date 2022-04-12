const withPlugins = require('next-compose-plugins')
const withOffline = require('next-offline')
const withFonts = require('next-fonts')
const withCss = require('@zeit/next-css')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
    enableSvg: true,
    devIndicators: {
        autoPrerender: false
    }
}

module.exports = withPlugins([
    [withOffline],
    [withFonts],
    [withCss],
    [withBundleAnalyzer, {
        generateInDevMode: true
    }]
], nextConfig)