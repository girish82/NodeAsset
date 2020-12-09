const express = require('express');

const auth = async(req,res,next) => {
     next();
}

module.exports = auth;