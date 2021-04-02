import React from "react"
import { AiFillSetting, AiOutlineHistory, AiOutlineHome , AiOutlineShareAlt, AiOutlineAudit, AiOutlineUnorderedList} from "react-icons/ai";
import { FiLogOut, FiDatabase } from "react-icons/fi";
import { FcBusinessman } from "react-icons/fc";
import { BiLayer, BiLayerPlus } from "react-icons/bi";
import {FcManager} from "react-icons/fc"
import {RiPlayListAddFill} from "react-icons/ri"
export const vi = {
  translation: {
    authenticate: {
      requestAuth: "Bạn cần đăng nhập vào tài khoản để tiếp tục",
      login: "Đăng Nhập",
      signup: "Đăng ký",
      forgotPassword: "Quên mật khẩu",
    },
    seller: {
      regsiterAsSeller: "Thông tin nhà bán hàng",
      registerPayment: "Tài khoản thanh toán",
      termsAndPolicies: "Điều khoản và chính sách",
    },
    header: {
      userOptions: {
        becomeAsSeller: {
          name: "Trở thành nhà bán hàng",
          icon: <FcBusinessman />,
        },
        postProduct:{
          name : "Đăng bán SP", 
          icon : <BiLayerPlus/>
        },
        admin: {
          name: "Quản trị trang",
          icon: <FcManager />,
        },
        settingAccount: {
          name: "Thiết lập TK",
          icon: <AiFillSetting />,
        },
        orderedHistory: {
          name: "Lịch sử mua hàng",
          icon: <AiOutlineHistory />,
        },
        logout: {
          name: "Đăng xuất",
          icon: <FiLogOut />,
        },
      },
    },
    adminNavigations: {
      home: {
        name: "Trang chủ",
        icon: <AiOutlineHome />,
        path: "/admin",
      },
      productManagers: {
        name: "Quản lý sản phẩm",
        icon: <FiDatabase />,
        children: [
          {
            name: "Danh mục SP",
            icon: <AiOutlineUnorderedList />,
            path: "/admin/portfolio",
          },
          {
            name: "Loại SP",
            icon: <AiOutlineShareAlt />,
            path: "/admin/category",
          },
          {
            name : "Nhóm SP",
            icon : <BiLayer/>,
            path : "/admin/product-groups"
          },
          {
            name: "Nhà bán hàng",
            icon: <AiOutlineAudit />,
            path: "/admin/sellers",
          },
        ],
      },
      portfolioNavigations: [
        {
          name: "Trang chủ",
          icon: <AiOutlineHome />,
          path : "home"
        },
        {
          name: "Thêm loại sản phẩm",
          icon: <RiPlayListAddFill />,
          path : "add-portfolio"
        },
      ],
      categoryNavigations : [
        {
          name: "Trang chủ",
          icon : <AiOutlineHome/>,
          path : "home"
        },
        {
          name: "Thêm Loại SP",
          icon : <RiPlayListAddFill/>,
          path : "add-category"
        },
      ],
      productGroupsNavigations : [
        {
          name: "Trang chủ",
          icon : <AiOutlineHome/>,
          path : "home"
        },
        {
          name: "Thêm Nhóm SP",
          icon : <RiPlayListAddFill/>,
          path : "add-product-group"
        },
      ]
    },
    admin: {
      portfolio : {
        addTitle: "Thêm Danh Mục Sản Phẩm",
        name : "Tên danh mục",
        slug : "đường dẫn liên kết",
        image : "file ảnh",
        submit : "Tạo Danh Mục",        
      },
      category : {
        addTitle: "Thêm loại SP",
        name : "Tên loại SP",
        portfolioLabel : "SP thuộc danh mục",
        slug : "Đường dẫn liên kết",
        image : "file ảnh",
        submit : "Tạo Loại SP",        
      },
      productGroups : {
        addTitle: "Thêm Nhóm SP",
        name : "Tên nhóm SP",
        portfolioLabel : "SP thuộc danh mục",
        categoryLabel : "SP thuộc loại",
        slug : "Đường dẫn liên kết",
        image : "file Ảnh",
        submit : "Tạo nhóm SP",       
      }
    },
    navigations: {
      home: "Trang chủ",
      productsOnSale: "Sản phẩm Giảm giá",
      sellingProducts: "Sản phẩm bán chạy",
      favoriteProducts: "Sản phẩm bạn yêu thích",
      contact: "Liên hệ",
    },
    cart: {
      name: "Giỏ hàng",
      emptyCart: "Không có sản phẩm nào trong giỏ hàng",
    },
    bannerImages: [
      {
        id: "banner-1",
        linkUrl: "/",
        image: require("../../assets/img/banner/carousel/7d5cc303db6aa5ec06a12268f6a8c322.jpg"),
      },
      {
        id: "banner-2",
        linkUrl: "/",
        image: require("../../assets/img/banner/carousel/8de94dd0168a88e68526d500473231ed.png"),
      },
      {
        id: "banner-3",
        linkUrl: "/",
        image: require("../../assets/img/banner/carousel/9a5c559c1f7f26d436d75b895c0f776e.jpg"),
      },
      {
        id: "banner-4",
        linkUrl: "/",
        image: require("../../assets/img/banner/carousel/55f29c79b9215010ddb21f29f0e71999.png"),
      },
      {
        id: "banner-5",
        linkUrl: "/",
        image: require("../../assets/img/banner/carousel/318f5ddd9e57c4774768d83f9881b66e.jpg"),
      },
      {
        id: "banner-6",
        linkUrl: "/",
        image: require("../../assets/img/banner/carousel/714d3eaab084429248b3dfa461dcd1a6.png"),
      },
      {
        id: "banner-7",
        linkUrl: "/",
        image: require("../../assets/img/banner/carousel/1354a373bef673367b7ebc53c4deb45f.png"),
      },
      {
        id: "banner-8",
        linkUrl: "/",
        image: require("../../assets/img/banner/carousel/ac3a90eeb99f9687a45f3463cc883a77.png"),
      },
    ],
    singleImage: {
      id: "single-image",
      linkUrl: "/",
      image: require("../../assets/img/banner/single-image.jpg"),
    },
    homePage: {
      productPorfolio: "Danh mục sản phẩm",
      bestSellerProducts: "Sản phẩm bán nhiều nhất",
      favoriteProducts: "Sản phẩm Được yêu thích",
      latestProducts: "Sản phẩm mới",
      topRatedProducts: "Sản phẩm được bình chọn",
    },
    notification: {
      updateSuccess : "Cập nhật thành công",
      updateFailed : "Cập nhật thất bại, có lỗi xảy ra."
    },
    postProduct : {
      title : "Đăng sản phẩm",
      portfolio : "Danh mục SP",
      portfolioPlaceholder : "Lựa chọn danh mục SP",
      category : "Loại SP",
      categoryPlaceholder : "Lựa chọn loại SP",
      noCategory : "Không có Loại SP",
      productGroup : "Nhóm SP (nếu có)",
      productGroupPlaceholder : "Lựa chọn nhóm SP" ,
      noProductGroup : "Không có nhóm SP",
      productName : "Tên SP (bắt buộc)", 
      manufactor : "Nhà sản xuất (bắt buộc)", 
      origin : "Nguồn gốc (bắt buộc)" , 
      addImage : "Thêm ảnh",
      price : "Đơn giá (bắt buộc)", 
      quantity : "Số lượng bán (bắt buộc)",
      weight : "Khối lượng(g)", 
      shippingFee : "Phí vận chuyển", 
      discount : "Giảm giá",
      discountPercentage : "Phần trăm giảm giá", 
      discountExpiration : "Ngày hết hạn giảm giá", 
      priceAfterDiscount : "Giá SP Sau khi giảm",
      productInformation : "Thông tin SP", 
      productDescription : "Mô tả SP", 
      submit : "Đăng SP"
    }
  },
};
