const fs = require("fs-extra");
const path = require("path");
const fetch = require("node-fetch");
//REST API https://thongtindoanhnghiep.co/rest-api
const ROOT_URL = "https://thongtindoanhnghiep.co/";
exports.getListCity = async (req, res, next) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/city`);  
    const data = await response.json();    
    res.status(200).json(data.LtsItem);
  } catch (error) {
    next(error);
  }
};
exports.getListDistricts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await fetch(`${ROOT_URL}/api/city/${id}/district`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
exports.getListWards = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await fetch(`${ROOT_URL}/api/district/${id}/ward`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
