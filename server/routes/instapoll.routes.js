const InstaPollController = require("../controllers/instapoll.controller");

module.exports = app => {
    app.get("/api/InstaPoll/all", InstaPollController.findAllInstaPolls)
    app.post("/api/InstaPoll/create", InstaPollController.createInstaPoll)
    app.get("/api/InstaPoll/single/:_id", InstaPollController.findSingleInstaPoll)
    app.delete("/api/InstaPoll/delete/:_id", InstaPollController.deleteInstaPoll)
    app.patch("/api/InstaPoll/update/:_id", InstaPollController.updateInstaPoll)
}
