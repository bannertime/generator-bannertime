/**
 * Check for predefined generator settings.
 */

export default function () {
  const cb = this.async();
  const existingFilters = this.config.get('filters');

  if (existingFilters) {
    this.prompt([{
      type: 'confirm',
      name: 'skipConfig',
      message: 'Existing .yo-rc configuration found, would you like to use it?',
      default: true,
    }], (answers) => {
      this.skipConfig = answers.skipConfig;
      if (this.skipConfig) {
        this.filters = existingFilters;
      } else {
        this.filters = {};
        this.forceConfig = true;
        this.config.set('filters', this.filters);
        this.config.forceSave();
      }
      cb();
    });
  } else {
    cb();
  }
}
