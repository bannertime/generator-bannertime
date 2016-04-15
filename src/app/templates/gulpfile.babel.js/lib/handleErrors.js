import Notify from 'gulp-notify';
import GulpUtil from 'gulp-util';

export default function (error) {
  Notify.onError(error.toString()).apply(this, arguments);
  GulpUtil.log(error.stack);
  this.emit('end');
};
