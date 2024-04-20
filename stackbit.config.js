import { defineStackbitConfig } from '@stackbit/types'

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'gatsby',
  nodeVersion: '18', 
  experimental: { 
    ssg: { 
      logPatterns: { 
        up: ['success onPreInit'], 
      }, 
    }, 
  },
})