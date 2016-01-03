import Ember from 'ember';

export default Ember.Service.extend({
  getLanguageForFile: function (fileName) {
    var extension = this._getFileExtension(fileName);
    switch(extension) {
      case 'js':
        return 'javascript';
      case 'java':
        return 'java';
      case 'cs':
        return 'c#';
      case 'vb':
        return 'Visual Basic';
      case 'bat':
        return 'Batch script';
      case 'ps':
      case 'ps1':
        return 'Powershell';
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
      case 'ascx':
      case 'aspx':
      case 'asax':
      case 'cshtml':
      case 'vbhtml':
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
      case 'md':
        return 'Markdown';
      case 'ts':
        return 'TypeScript';
      case 'coffee':
        return 'CoffeeScript';
      case 'jsx':
      case 'tsx':
        return 'React';
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
