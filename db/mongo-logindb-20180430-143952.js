
/** users indexes **/
db.getCollection("users").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** system.indexes records **/
db.getCollection("system.indexes").insert({
  "v": NumberInt(2),
  "key": {
    "_id": NumberInt(1)
  },
  "name": "_id_",
  "ns": "logindb.users"
});

/** users records **/
db.getCollection("users").insert({
  "_id": ObjectId("5ae6b3bf16e78612349e0bd8"),
  "local": {
    "email": "fernando_balta@hotmail.com",
    "password": "$2a$10$UTHYpipkFTGdRyXqCRB81OQ8wCVD5fr0kayFZGH.cmb0zV3dNtLV6"
  },
  "__v": NumberInt(0)
});
