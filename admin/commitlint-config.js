module.exports = {
  extents: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'], // body开始于空白行
    'body-tense': [1, 'always', ['present-imperative']],
    'footer-leading-blank': [1, 'always'], // footer开始于空白行
    'footer-tense': [1, 'always', ['present-imperative']],
    'header-max-length': [2, 'always', 100], // 简述限制72字符长度
    'scope-case': [2, 'always', 'lowerCase'], // scope小写
    'subject-empty': [2, 'never'], // subject不为空
    'subject-full-stop': [2, 'never', '.'], // subject结尾不加'.'
    'subject-tense': [1, 'always', ['present-imperative']], // 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
    'type-case': [2, 'always', 'lowerCase'], // type小写
    'type-empty': [2, 'never'], // type不为空
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能（feature）
        'fix', // 修补bug
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'style', // 格式（不影响代码运行的变动）
        'docs', // 文档（documentation）
        'perf', // 性能优化
        'test', // 增加测试
        'build', // 修改构建打包文件
        'chore', // 构建过程或辅助工具的变动
        'ci', // 对ci配置文件和脚本的更改
        'revert', // 还原以前的提交
      ],
    ], // type关键字必须是其中之一
  },
};
