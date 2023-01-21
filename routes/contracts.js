const router = require("express").Router();
import {
  newContract,
  deleteContract,
  getContracts,
  getContractWithID,
  updateContract,
  getClientBooked,
  myContracts,
} from "../controllers/contracts";
import { isAuth } from "../middleware/auth";

// router.post("/contract", getContracts);
// router.post("post-contract", newContract);
// router.get("/contract/:contractID", getContractWithID);
// router.put("/contract-update/:contractID", updateContract);
// router.delete("/delete-contract/:contractID", deleteContract);
// module.exports = router;

const routes = (app) => {
  // Protected routes
  app
    .route("/contract")
    .get(
      (req, res, next) => {
        //middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
      },
      isAuth,
      getContracts
    )
    .post(isAuth, newContract);

  app.route("api/v1/bookedcontracts").get(isAuth, getClientBooked);
  app.route("api/v1/mycontracts").post(isAuth, myContracts);

  app
    .route("api/v1/contract/:contractID")
    .get(isAuth, getContractWithID)
    .put(isAuth, updateContract)
    .delete(isAuth, deleteContract);
};

export default routes;
