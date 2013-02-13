 var couchapp = require('couchapp')
  , path = require('path')
  ;

ddoc = { _id:'_design/app'};

ddoc.rewrites = [ 
    {from:'/nodesoundtoi/_design/one/*',to:'*'},
    {from:'/nodesoundtoi/*',to:'../../*'},
    {from:'',to:'index.html'}, 
    {from:'*',to:'*'} ];

ddoc.views = {};

ddoc.validate_doc_update = function (newDoc, oldDoc, userCtx) {   
  if (newDoc._deleted === true && userCtx.roles.indexOf('_admin') === -1) {
    throw "Only admin can delete documents on this database.";
  } 
}

couchapp.loadAttachments(ddoc, path.join(__dirname, 'attachments'));

module.exports = ddoc;
