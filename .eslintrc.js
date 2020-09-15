module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'airbnb-base',
    'plugin:nuxt/base',
  ],
  // add your custom rules here
  rules: {
    'vue/no-v-html': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'max-len': [
      'error',
      {
        'ignorePattern': '<\s*path[^>]*\/>'
      }
    ],
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'import/prefer-default-export': 0,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    'no-underscore-dangle': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 0,
    'no-irregular-whitespace': 0,
    // vue default rules
    // doc: https://vuejs.github.io/eslint-plugin-vue/rules/
    'vue/attributes-order': ['error', {
      order: [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        'UNIQUE',
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT',
      ],
    }],
    'vue/no-async-in-computed-properties': ['error'],
    'vue/no-duplicate-attributes': ['error', {
      'allowCoexistClass': true,
      'allowCoexistStyle': true
    }],
    'vue/no-parsing-error': ['error', {
      'abrupt-closing-of-empty-comment': true,
      'absence-of-digits-in-numeric-character-reference': true,
      'cdata-in-html-content': true,
      'character-reference-outside-unicode-range': true,
      'control-character-in-input-stream': true,
      'control-character-reference': true,
      'eof-before-tag-name': true,
      'eof-in-cdata': true,
      'eof-in-comment': true,
      'eof-in-tag': true,
      'incorrectly-closed-comment': true,
      'incorrectly-opened-comment': true,
      'invalid-first-character-of-tag-name': true,
      'missing-attribute-value': true,
      'missing-end-tag-name': true,
      'missing-semicolon-after-character-reference': true,
      'missing-whitespace-between-attributes': true,
      'nested-comment': true,
      'noncharacter-character-reference': true,
      'noncharacter-in-input-stream': true,
      'null-character-reference': true,
      'surrogate-character-reference': true,
      'surrogate-in-input-stream': true,
      'unexpected-character-in-attribute-name': true,
      'unexpected-character-in-unquoted-attribute-value': true,
      'unexpected-equals-sign-before-attribute-name': true,
      'unexpected-null-character': true,
      'unexpected-question-mark-instead-of-tag-name': true,
      'unexpected-solidus-in-tag': true,
      'unknown-named-character-reference': true,
      'end-tag-with-attributes': true,
      'duplicate-attribute': true,
      'end-tag-with-trailing-solidus': true,
      'non-void-html-element-start-tag-with-trailing-solidus': false,
      'x-invalid-end-tag': true,
      'x-invalid-namespace': true
    }],
    'vue/no-shared-component-data': ['error'],
    'vue/no-side-effects-in-computed-properties': ['error'],
    'vue/no-textarea-mustache': ['error'],
    'vue/no-unused-components': ['error', {
      'ignoreWhenBindingPresent': false,
    }],
    'vue/no-unused-vars': ['error'],
    'vue/no-use-v-if-with-v-for': ['error'],
    'vue/require-component-is': ['error'],
    'vue/require-prop-type-constructor': ['error'],
    'vue/require-render-return': ['error'],
    'vue/require-v-for-key': ['error'],
    'vue/require-valid-default-prop': ['error'],
    'vue/return-in-computed-property': ['error'],
    'vue/use-v-on-exact': ['error'],
    'vue/valid-template-root': ['error'],
    'vue/valid-v-bind': ['error'],
    'vue/valid-v-cloak': ['error'],
    'vue/valid-v-else-if': ['error'],
    'vue/valid-v-else': ['error'],
    'vue/valid-v-for': ['error'],
    'vue/valid-v-html': ['error'],
    'vue/valid-v-if': ['error'],
    'vue/valid-v-model': ['error'],
    'vue/valid-v-on': ['error'],
    'vue/valid-v-once': ['error'],
    'vue/valid-v-pre': ['error'],
    'vue/valid-v-show': ['error'],
    'vue/valid-v-text': ['error'],
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always'
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'always',
    }],
    'vue/html-end-tags': ['error'],
    'vue/html-indent': ['error'],
    'vue/html-quotes': ['error', 'double'],
    'vue/html-self-closing': ['error', {
      html: {
        normal: 'always',
        void: 'never'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 2,
      multiline: {
        max: 2,
        allowFirstLine: false,
      },
    }],
    'vue/multiline-html-element-content-newline': ['error'],
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/no-multi-spaces': ['error', {
      ignoreProperties: false
    }],
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
    'vue/no-template-shadow': ['error'],
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/require-default-prop': ['error'],
    'vue/require-prop-types': ['error'],
    'vue/singleline-html-element-content-newline': ['error'],
    'vue/v-bind-style': ['error', 'shorthand'],
    'vue/v-on-style': ['error', 'shorthand'],
    'vue/order-in-components': ['error', {
      'order': [
        'el',
        'name',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        'mixins',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'data',
        'computed',
        'watch',
        'LIFECYCLE_HOOKS',
        'methods',
        ['template', 'render'],
        'renderError'
      ]
    }],
    'vue/this-in-template': ['error', 'never'],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
  },
}
