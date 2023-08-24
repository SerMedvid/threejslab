/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(glsl|vert)$/,
          loader: 'ts-shader-loader'
        })
     
        return config
      },
}

module.exports = nextConfig
