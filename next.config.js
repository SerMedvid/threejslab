/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
          "test": /\.(glsl|vs|fs|vert|frag)$/,
          "exclude": /node_modules/,
          "loader": 'ts-shader-loader'
        })
     
        return config
      },
}

module.exports = nextConfig
