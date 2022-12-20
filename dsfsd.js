"_id" : ObjectId("6392aebf6e025f10137757ed")


db.statuseipinfos.update({ "_id" : ObjectId("6392aebf6e025f10137757ed")}, { $set : {"Meta" : [ "1", "eip-6049" ] } })


db.statuseipinfos.update({"_id" : ObjectId("638c16b0a88172321a18d8e3")}, {  "Year" : "2022", "Month" : "December", "Status" : "Review", "Networking" : [ "0" ], "ERC" : [ "1", "eip-5773" ], "Core" : [ "3", "eip-4750", "eip-5450", "eip-663" ], "Interface" : [ "0" 
], "Meta" : [ "1", "eip-6049" ], "Informational" : [ "0" ], "__v" : 0, "Undefined" : [ "1", "eip-6049" ]})