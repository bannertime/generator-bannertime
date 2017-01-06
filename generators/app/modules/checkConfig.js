/**
 * Check for predefined generator settings.
 */

module.exports = function checkConfig() {
  const done = this.async();
  const existingFilters = this.config.get('filters');

  if (existingFilters) {
    this.prompt([{
      default: true,
      message: 'Existing .yo-rc configuration found, would you like to use it?',
      name: 'skipConfig',
      type: 'confirm',
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
      done();
    });
  } else {
    done();
  }
};
