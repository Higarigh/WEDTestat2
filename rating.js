module.exports = function Rating() {

    this.value = 0;
    var upVoters = [];
    var downVoters = [];
    var self = this;

    this._up = function(userId) {
        if(downVoters[userId]){
            self.value++;
            downVoters[userId] = false;
        }else if (!upVoters[userId]) {
            self.value++;
            upVoters[userId] = true;
        }
        return self.value;
    };

    this._down = function (userId) {
        if(upVoters[userId]){
            self.value--;
            upVoters[userId] = false;
        }else if(!downVoters[userId]) {
            self.value--;
            downVoters[userId] = true;
        }
        return self.value;
    };

};