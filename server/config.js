module.exports = {
  server_port: 3000,
  db_url: 'mongodb://localhost:27017/freeboard',
  db_schemas: [
    {
      file: './board',
      collection: 'board',
      schemaName: 'BoardSchema',
      modelName: 'BoardModel'
    },
  ],
  route_info: [
    {file: './board', path: '/api/write', method: 'write', type: 'post'},
    {file: './board', path: '/api/read/:id/:type', method: 'read', type: 'get'},
    {file: './board', path: '/api/auth', method: 'auth', type: 'post'}, // 수정, 삭제 등 권한 있는지 확인
    {file: './board', path: '/api/list', method: 'list', type: 'post'},
    {file: './board', path: '/api/list/:page/:perPage', method: 'list', type: 'get'},
    {file: './board', path: '/api/modify/:id', method: 'modify', type: 'put'},
    {file: './board', path: '/api/delete/:id', method: 'delete', type: 'delete'},
  ]
};
