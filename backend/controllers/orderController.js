import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc create new order
//@route Post /api/orders
//@access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    // console.log("gujhygjkhgjhg", createdOrder)
    res.status(201).json(createdOrder);
  }
});

// @desc Get oder by id
//@route Post /api/orders/:id
//@access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to delivered
//@route Post /api/orders/:id/deliver
//@access Private/admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    

    const updateOrder = await order.save();

    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});



// @desc Update order to pay
//@route Post /api/orders/:id/pay
//@access Private/user


const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updateOrder = await order.save();

    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc get logged in user order
//@route  GET /api/orders/myorders
//@access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc get all order
//@route  GET /api/orders
//@access Private/admin

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered
};
