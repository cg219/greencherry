function FlatDatabase(){
	this.databases = Object.create(null);
}

FlatDatabase.prototype.insert = function(database, entry, callback) {
	var self = this;
	var db = self.databases[database] || self.databases[database] = Object.create(null);

	db[entry.id] = entry;
	callback && callback(null, entry);
};

FlatDatabase.prototype.find = function(database, id, callback) {
	var self = this;
	var db = self.databases[database];

	callback && callback(null, db[id]);
};

FlatDatabase.prototype.remove = function(database, id, callback) {
	var self = this;
	var db = self.databases[database];

	delete db[id];
	callback && callback(null, db);
};

FlatDatabase.prototype.all = function(database, callback) {
	var self = this;

	callback && callback(null, self.databases[database]);
};

module.exports = exports = new FlatDatabase;