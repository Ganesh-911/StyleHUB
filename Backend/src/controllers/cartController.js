import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const existingCartItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;

      await existingCartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cartItem: existingCartItem,
      });
    }

    const cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cartItem,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    res.status(200).json({
      success: true,
      count: cartItems.length,
      cartItems,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateCartQuantity = async(req,res)=>{
  try{
    const {quantity} = req.body;
    const cartItem=await Cart.findById(req.params.id);
    if(!cartItem){
      return res.status(404).json({
        success:false,
        message:"Cart item not found"
      });
    }
    cartItem.quantity=quantity;
    await cartItem.save();
    res.status(200).json({
      success:true,
      message:"Cart updated successfully",
      cartItem,
    });

  }catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    }); 
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    await cartItem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};