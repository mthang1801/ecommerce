import React from "react"
import { AiFillSetting, AiOutlineHistory, AiOutlineHome , AiOutlineShareAlt, AiOutlineAudit, AiOutlineUnorderedList} from "react-icons/ai";
import { FiLogOut, FiDatabase } from "react-icons/fi";
import { FcBusinessman } from "react-icons/fc";
import { BiLayer, BiLayerPlus } from "react-icons/bi";
import {FcManager} from "react-icons/fc"
import {RiPlayListAddFill} from "react-icons/ri"
export const en = {
  translation: {
    authenticate:{
      requestAuth : "You need to login or signup to continue",
      login : "login",
      signup : "signup",
      forgotPassword : "Forgot password",      
    },
    seller : {
      regsiterAsSeller : "Register",
      registerPayment: "Payment",
      termsAndPolicies : "Terms And Policies"      
    },
    header:{
      userOptions :{
        becomeAsSeller: {
          name : "Become As Seller",
          icon : <FcBusinessman/>
        },
        postProduct:{
          name : "Post product", 
          icon : <BiLayerPlus/>
        },
        admin : {
          name : "Administration",
          icon : <FcManager/>
        },
        settingAccount : {
          name : "Setting account",
          icon : <AiFillSetting/>
        },
        orderedHistory : {
          name : "Ordered History",
          icon : <AiOutlineHistory/>
        },
        logout : {
          name : "Logout", 
          icon : <FiLogOut/>
        }
      }
    },
    adminNavigations : {
      home : {
        name : "home", 
        icon : <AiOutlineHome/>,
        path : "/admin"
      },
      productManagers : {
        name : "products-manager",
        icon : <FiDatabase/>,
        children : [
          {
            name : "Porfolio",
            icon : <AiOutlineUnorderedList/>,
            path : "/admin/portfolio"
          },
          {
            name : "category",
            icon : <AiOutlineShareAlt/>,
            path : "/admin/category"
          },
          {
            name : "Product Groups",
            icon : <BiLayer/>,
            path : "/admin/product-groups"
          },
          {
            name : "sellers",
            icon : <AiOutlineAudit/>,
            path : "/admin/sellers"
          }
        ]
      },      
      portfolioNavigations : [
        {
          name: "home",
          icon : <AiOutlineHome/>,
          path : "home"
        },
        {
          name: "add portfolio",
          icon : <RiPlayListAddFill/>,
          path : "add-portfolio"
        },
      ],
      categoryNavigations : [
        {
          name: "home",
          icon : <AiOutlineHome/>,
          path : "home"
        },
        {
          name: "add category",
          icon : <RiPlayListAddFill/>,
          path : "add-category"
        },
      ],
      productGroupsNavigations : [
        {
          name: "home",
          icon : <AiOutlineHome/>,
          path : "home"
        },
        {
          name: "add product group",
          icon : <RiPlayListAddFill/>,
          path : "add-product-group"
        },
      ]
    },
    admin: {      
      porfolio : {
        addTitle: "Add Porfolio",
        name : "Porfolio Name",
        slug : "Slug",
        image : "Image",
        submit : "Complete",       
      },
      category : {
        addTitle: "Add Category",
        name : "Category Name",
        portfolioLabel : "Portfolio Name",
        slug : "Slug",
        image : "Image",
        submit : "Complete",       
      },
      productGroups : {
        addTitle: "Add Product Groups",
        name : "Product Groups Name",
        portfolioLabel : "Portfolio Name",
        categoryLabel : "Category Name",
        slug : "Slug",
        image : "Image",
        submit : "Complete",       
      }
    },
    navigations : {
      home : "Home", 
      productsOnSale : "Products On Sale",
      sellingProducts : "Selling Products",
      favoriteProducts : "Favorite Products",
      contact : "Contact"
    },
    cart :{
      name : "Cart",
      emptyCart : "Empty Cart"
    },
    bannerImages : [
      {
        id : "banner-1", 
        linkUrl : "/",
        image : require("../../assets/img/banner/carousel/7d5cc303db6aa5ec06a12268f6a8c322.jpg"),
      },
      {
        id : "banner-2", 
        linkUrl : "/",
        image : require("../../assets/img/banner/carousel/8de94dd0168a88e68526d500473231ed.png"),
      },
      {
        id : "banner-3", 
        linkUrl : "/",
        image : require("../../assets/img/banner/carousel/9a5c559c1f7f26d436d75b895c0f776e.jpg"),
      },
      {
        id : "banner-4", 
        linkUrl : "/",
        image : require("../../assets/img/banner/carousel/55f29c79b9215010ddb21f29f0e71999.png"),
      },
      {
        id : "banner-5", 
        linkUrl : "/",
        image : require("../../assets/img/banner/carousel/318f5ddd9e57c4774768d83f9881b66e.jpg"),
      },
      {
        id : "banner-6", 
        linkUrl : "/",
        image : require("../../assets/img/banner/carousel/714d3eaab084429248b3dfa461dcd1a6.png"),
      },
      {
        id : "banner-7", 
        linkUrl : "/",
        image : require("../../assets/img/banner/carousel/1354a373bef673367b7ebc53c4deb45f.png"),
      },
      {
        id : "banner-8", 
        linkUrl : "/",
        image : require("../../assets/img/banner/carousel/ac3a90eeb99f9687a45f3463cc883a77.png"),
      },
      
    ],
    singleImage : {
      id : "single-image",
      linkUrl : "/",
      image:  require("../../assets/img/banner/single-image.jpg")
    },
    homePage: {
      productPorfolio : "Products Porfolio",
      bestSellerProducts : "Best Seller Products",
      favoriteProducts : "Favorite Products",
      latestProducts : "Latest Products",
      topRatedProducts : "Top Rated Products"
    },
    notification: {
      upadteSuccess : "Update Successully",
      upadteFailed : "Update Failed"
    }
  },
}
