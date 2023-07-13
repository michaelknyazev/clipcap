/*
  MongoDB initial setup

  Needed only in Dev mode
*/
print('Start #################################################################');

db = db.getSiblingDB('test');
db.createUser(
  {
    user: 'test',
    pwd: 'test',
    roles: [{ role: 'readWrite', db: 'test' }],
  },
);  

print('END #################################################################');