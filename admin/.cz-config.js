module.exports = {
  messages: {
    type: '选择一种你的提交类型:',
    customScope: '「可选」 选择一个影响scope（例如：模块、组件）:',
    subject: '短说明（请限制在100个字符内）:\n',
    body: '「可选」 长说明，使用"|"换行：\n',
    breaking: '「可选」 非兼容性说明:\n',
    footer: '「可选」 关联关闭的工单issue（例如：#1234）:\n',
    confirmCommit: '确定提交说明?',
  },
  types: [
    {
      value: 'feat',
      name: 'feat:     新增一个功能、特性',
    },
    {
      value: 'fix',
      name: 'fix:      修复一个缺陷、bug',
    },
    {
      value: 'refactor',
      name: 'refactor: 代码重构，没有新增功能或修复bug',
    },
    {
      value: 'style',
      name: 'style:    不影响代码含义的更改（空格、格式、缺少分号等）',
    },
    {
      value: 'docs',
      name: 'docs:     变更文档（如README.md）',
    },
    {
      value: 'perf',
      name: 'perf:     优化相关（如提升性能、用户体验等）',
    },
    {
      value: 'test',
      name: 'test:     新增测试用例（包括单元测试、集成测试)',
    },
    {
      value: 'build',
      name: 'build:    影响构建系统或外部依赖关系的更改',
    },
    {
      value: 'chore',
      name: 'chore:    其他不修改src或测试文件的更改',
    },
    {
      value: 'ci',
      name: 'ci:       对ci配置文件和脚本的更改',
    },
    {
      value: 'revert',
      name: 'revert:   还原以前的提交',
    },
  ],
  allowBreakingChanges: ['feat', 'fix'],
};
