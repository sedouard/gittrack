import Ember from 'ember';

export default Ember.Service.extend({
  getLanguageForFile: function (fileName) {
    var extension = this._getFileExtension(fileName);
    switch(extension) {
      case 'js':
        return 'javascript';
      case 'cs':
        return 'c#';
      case 'rb':
        return 'ruby';
      case 'sh':
        return 'shell';
      case 'go':
        return 'golang';
      case 'htm':
      case 'html':
        return 'HTML';
      case 'py':
        return 'python';
      case 'pl':
        return 'pearl';
      case 'php':
        return 'PHP';
      case 'aspx':
        return 'ASP.NET';
      case 'json':
        return 'JSON';
      case 'c':
        return 'C';
      case 'cpp':
        return 'C++';
      case 'yml':
        return 'YAML';
      case 'xml':
        return 'XML';
      default:
        return null;
    }
  },
  _getFileExtension: function (fileName) {
    var a = fileName.split(".");
    if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
        return "";
    }
    return a.pop().toLowerCase();
  },
});
