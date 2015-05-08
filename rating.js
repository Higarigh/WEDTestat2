module.exports = function Rating() {

    this.value = 0;
    var upVoters = [];
    var downVoters = [];
    var self = this;

    this._up = function(userId) {
        console.log("blub1");
        if(downVoters[userId]){
            console.log("blub2");
            self.value++;
            downVoters[userId] = false;
        }else if (!upVoters[userId]) {
            console.log("blub3");
            self.value++;
            upVoters[userId] = true;
        }
        return self.value;

    };

    this._down = function (userId) {
        console.log("blub4");
        if(upVoters[userId]){
            console.log("blub5");
            self.value--;
            upVoters[userId] = false;
        }else if(!downVoters[userId]) {
            console.log("blub6");
            self.value--;
            downVoters[userId] = true;
        }
        return self.value;

    };

};