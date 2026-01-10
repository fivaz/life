// force commit

module.exports = {
	extends: 'semantic-release-monorepo',
	branches: ['main', 'test-release'],
	tagFormat: 'svelendar-v${version}',
	plugins: [
		'@semantic-release/commit-analyzer',
		[
			'@semantic-release/release-notes-generator',
			{
				preset: 'conventionalcommits',
				presetConfig: {
					types: [
						{ type: 'feat', section: '✨ New Features', hidden: false },
						{ type: 'fix', section: '🐛 Bug Fixes', hidden: false },
						{ type: 'perf', section: '🚀 Performance', hidden: false },
						{ type: 'revert', section: '⏪ Reverts', hidden: false },
						{ type: 'chore', hidden: true },
						{ type: 'docs', hidden: true },
						{ type: 'style', hidden: true },
						{ type: 'refactor', hidden: true },
						{ type: 'test', hidden: true },
						{ type: 'build', hidden: true },
						{ type: 'ci', hidden: true },
					],
				},
			},
		],
		['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],
		['@semantic-release/npm', { npmPublish: !process.env.DRY_RUN, pkgRoot: '.' }],
		[
			'@semantic-release/git',
			{
				assets: ['package.json', 'CHANGELOG.md'],
				message:
					'chore(svelendar): release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
			},
		],
		'@semantic-release/github',
	],
};
