import { copySync } from 'fs-extra'
import consola from 'consola'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  rollup: {
    emitCJS: true,
  },
  declaration: true,
  entries: [
    // Plugin
    {
      input: 'src/index.ts',
      outDir: 'dist',
      name: 'index',
      format: 'esm',
      ext: 'mjs',
    },
    {
      input: 'src/index.ts',
      outDir: 'dist',
      name: 'index',
      format: 'cjs',
      ext: 'cjs',
    },
    // Nuxt
    {
      input: 'src/nuxt/module.ts',
      outDir: 'dist',
      name: 'nuxt',
      format: 'esm',
      ext: 'mjs',
    },
    {
      input: 'src/nuxt/module.ts',
      outDir: 'dist',
      name: 'nuxt',
      format: 'cjs',
      ext: 'cjs',
    },
  ],
  externals: [
    '@nuxt/kit',
    '@nuxt/schema',
    'nuxt3',
    'nuxt',
    'vue',
    'defu',
    '@vueuse/motion',
    'csstype',
    '@vueuse/shared',
    'framesync',
    'style-value-types',
    '@vue/compiler-core',
    '@babel/parser',
    '@vue/shared',
    '@vueuse/core',
  ],
  hooks: {
    'build:done': () => {
      copySync('src/nuxt/runtime', 'dist/runtime')

      consola.info('Nuxt runtime copied to `dist/`!')
    },
  },
})
