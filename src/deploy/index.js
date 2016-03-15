/**
 * Load the modules.
 */

import { Base } from 'yeoman-generator';
import intro from './modules/intro';
import prompts from './modules/prompts';
import files from './modules/files';
import end from './modules/end';

export default class Generator extends Base {}

Generator.prototype.intro = intro;
Generator.prototype.prompts = prompts;
Generator.prototype.files = files;
Generator.prototype.end = end;
