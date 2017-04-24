import { repositorySource } from '../../src/util/environment';

export const apiDirectory = '_apidocs';

export const cloneDirectory = '.repo';

export const distDirectory = '_build';

export const [ repoOwner, repoName ] = repositorySource().split('/');

export const api = {
	src: {
		options: {
			dest: '<%= apiDirectory %>',
			format: 'html',
			src: 'src'
		}
	}
};

export const clean = {
	build: [ '<%= distDirectory %>' ],
	dists: [ '<%= cloneDirectory %>' ],
	repo: [ '<%= cloneDirectory %>/**/*', '!.git/**' ]
};

export const copy = {
	'gh-pages': {
		expand: true,
		cwd: '<%= apiDirectory %>',
		src: '**',
		dest: '<%= cloneDirectory %>'
	},
	latest: {
		expand: true,
		cwd: '<%= distDirectory %>',
		src: '**',
		dest: '<%= cloneDirectory %>'
	},
	staticDistFiles: {
		expand: true,
		cwd: '.',
		src: [ 'README.md', 'LICENSE', 'package.json' ],
		dest: '<%= distDirectory %>'
	}
};

export const initAutomation = {
	repo: {
		options: {
			repoOwner: '<%= repoOwner %>',
			repoName: '<%= repoName %>'
		}
	}
};

export const intern = {
	unit: {
		options: {
			runType: 'client',
			config: '_build/tests/intern',
			reporters: [
				'Console', 'LcovHtml'
			]
		}
	}
};

export const prompt = {
	github: {
		options: {
			questions: [
				{
					config: 'github.username',
					type: 'input',
					message: 'Github username'
				},
				{
					config: 'github.password',
					type: 'password',
					message: 'Github password'
				}
			]
		}
	}
};

export const publish = {
	'gh-pages': {
		options: {
			branch: 'gh-pages',
			cloneDirectory: '<%= cloneDirectory %>'
		}
	},
	latest: {
		options: {
			branch: 'latest',
			cloneDirectory: '<%= cloneDirectory %>'
		}
	}
};

export const shell = {
	'build-ts': {
		command: 'tsc',
		options: {
			execOptions: {
				cwd: 'support'
			}
		}
	}
};

export const sync = {
	latest: {
		options: {
			branch: 'latest',
			cloneDirectory: '<%= cloneDirectory %>'
		}
	},
	'gh-pages': {
		options: {
			branch: 'gh-pages',
			cloneDirectory: '<%= cloneDirectory %>'
		}
	}
};

export const tslint = {
	options: {
		configuration: 'tslint.json'
	},
	support: 'support/**/*.ts',
	tasks: 'tasks/**/*.ts',
	tests: 'tests/**/*.ts'
};