/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
          test: /\.hdr$/,
          use:{
            loader: 'url-loader'
          }

        })
     
        return config
      },
}

module.exports = nextConfig
