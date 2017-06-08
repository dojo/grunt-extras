import { PublishMode } from '../commands/publish';
import { Auth } from 'github';
export declare const githubAuthName = "GITHUB_AUTH";
export declare const decryptIvName = "publish_deploy_iv";
export declare const decryptKeyName = "publish_deploy_key";
export declare const privateKeyName = "PRIVATE_KEY";
export declare function commitMessage(): string;
export declare function currentBranch(): string;
export declare function encryptedKeyFile(file?: string): any;
export declare function gitCommit(): string;
export declare function githubAuth(authStr?: string): Auth;
export declare function hasGitCredentials(keyFile?: string): boolean;
export declare function hexoRootOverride(): any;
export declare function hasKeyFile(file?: string): boolean;
export declare function isCronJob(): boolean;
export declare function isRunningOnTravis(): boolean;
export declare function keyFile(): string;
export declare function publishMode(defaultValue?: PublishMode): PublishMode;
export declare function repositorySource(): string;