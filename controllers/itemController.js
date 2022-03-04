const CustomErrorHandler = require("../middlewares/customErrorHandler");
const itemModel = require("../Models/Item");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");
exports.createItem = async (req, res, next) => {
  try {
    const { itemName, itemCategory, itemStartingBid, price } = req.body;

    const data = await itemModel.create({
      itemName: itemName,
      itemCategory: itemCategory,
      price: price,
      itemStartingBid: itemStartingBid,
    });

    res.json({
      status: "Success",
      data: data,
    });
  } catch (err) {
    return next(err);
  }
};

exports.showallItem = async (req, res, next) => {
  try {
    const data = await itemModel.find({});
    res.json({
      status: "Success",
      data: data,
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteAllItem = async (req, res, next) => {
  try {
    const data = await itemModel.deleteMany({});
    res.json({
      status: "Success",
      data: data,
    });
  } catch (err) {
    return next(err);
  }
};
exports.bidOnItem = async (req, res, next) => {
  try {
    const bidingItemId = req.params.id;
    const CurrentBid = req.body.bid;
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const { username, id } = jwt.verify(token, process.env.SECRET_KEY);
    const data = await itemModel.findByIdAndUpdate(
      { _id: bidingItemId },
      { $push: { CurrentBid: { userid: username, bid: CurrentBid } } },
      { new: true }
    );
    res.json({
      success: true,
      data: data,
    });
  } catch (err) {
    return next(err);
  }
};
