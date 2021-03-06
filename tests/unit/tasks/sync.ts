import Test from 'intern/lib/Test';
import * as grunt from 'grunt';
import { stub, spy, SinonStub } from 'sinon';
import loadModule, { cleanupModuleMocks } from '../../_support/loadModule';
import { setupWrappedAsyncStub } from '../../_support/tasks';

const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

let sync: any;
let registerMultiTaskStub: SinonStub;

const getGithubSlugStub = stub();
const syncStub = stub();
const getConfigStub = stub();
const wrapAsyncTaskStub = stub();
const optionsStub = stub();

const Git = class {
	constructor() {}
	getConfig: SinonStub = getConfigStub;
};
const GitHub = class {
	constructor() {
		return this;
	}
	url: 'github.url';
};

const GitSpy = spy(Git);
const GitHubSpy = spy(GitHub);

registerSuite('tasks/sync', {
	after() {
		cleanupModuleMocks();
	},

	beforeEach() {
		registerMultiTaskStub = stub(grunt, 'registerMultiTask');
		optionsStub.returns({});
		sync = loadModule(require, '../../../tasks/sync', {
			'../src/commands/sync': { default: syncStub },
			'./util/wrapAsyncTask': { default: wrapAsyncTaskStub },
			'./util/getGithubSlug': { default: getGithubSlugStub },
			'../src/util/GitHub': { default: GitHubSpy },
			'../src/util/Git': { default: GitSpy }
		});
	},

	afterEach() {
		syncStub.reset();
		getGithubSlugStub.reset();
		GitSpy.reset();
		GitHubSpy.reset();
		getConfigStub.reset();
		wrapAsyncTaskStub.reset();
		optionsStub.reset();

		registerMultiTaskStub.restore();
	},

	tests: {
	'syncTask uses GitHub repo info, calls sync; eventually resolves'(this: Test) {
		getGithubSlugStub.returns({ name: 'name', owner: 'owner' });
		syncStub.returns(Promise.resolve());

		setupWrappedAsyncStub.call({
			options: optionsStub
		}, wrapAsyncTaskStub, this.async(), () => {
			assert.isTrue(registerMultiTaskStub.calledOnce);

			assert.isTrue(getGithubSlugStub.calledOnce);
			assert.isTrue(GitHubSpy.calledOnce);

			assert.isTrue(syncStub.calledOnce);
		});

		sync(grunt);

		assert.isTrue(wrapAsyncTaskStub.calledOnce);
	},

	'syncTask uses git repo url; eventually resolves'(this: any) {
		getConfigStub.returns(Promise.resolve('repo.url'));
		getGithubSlugStub.returns({});
		syncStub.returns(Promise.resolve());

		setupWrappedAsyncStub.call({
			options: optionsStub
		}, wrapAsyncTaskStub, this.async(), () => {
			assert.isTrue(registerMultiTaskStub.calledOnce);
			assert.isTrue(wrapAsyncTaskStub.calledOnce);

			assert.isTrue(GitSpy.calledOnce);
			assert.isTrue(getConfigStub.calledOnce);

			assert.isTrue(syncStub.calledOnce);
		});

		sync(grunt);

		assert.isTrue(wrapAsyncTaskStub.calledOnce);
	},

	'syncTask has url in options; eventually resolves'(this: any) {
		optionsStub.returns({ url: 'options.url' });
		syncStub.returns(Promise.resolve());

		setupWrappedAsyncStub.call({
			options: optionsStub
		}, wrapAsyncTaskStub, this.async(), () => {
			assert.isTrue(registerMultiTaskStub.calledOnce);
			assert.isTrue(wrapAsyncTaskStub.calledOnce);

			assert.isTrue(getGithubSlugStub.notCalled);

			assert.isTrue(syncStub.calledOnce);
		});

		sync(grunt);

		assert.isTrue(wrapAsyncTaskStub.calledOnce);
	}
	}
});
